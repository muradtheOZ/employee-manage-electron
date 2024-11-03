import { v4 as uuidv4 } from 'uuid';
const Database = require('better-sqlite3');
import { app } from 'electron';
import * as path from 'path';
import { existsSync, copyFileSync, mkdirSync } from 'fs';



const isDevelopment = process.env.NODE_ENV === 'development';
const dbPath = isDevelopment
    ? path.join(__dirname, '..', 'data', 'employee_data.db') // Development path
    : path.join(app.getPath('userData'), 'employee_data.db'); // Production path

if (!isDevelopment) {
    const userDataPath = app.getPath('userData');
    if (!existsSync(userDataPath)) {
        mkdirSync(userDataPath, { recursive: true });
    }

    // Copy template database if it doesn't exist
    if (!existsSync(dbPath)) {
        const devDbPath = path.join(__dirname, '..', 'data', 'employee_data.db');
        if (existsSync(devDbPath)) {
            copyFileSync(devDbPath, dbPath);
        } else {
            console.error("Development database template not found.");
        }
    }
}

const db = new Database(dbPath);

interface ExtraField {
    key: string;
    value: string;
}

interface Employee {
    uuid?: string; // UUID as the unique identifier
    name: string;
    age: number;
    position: string;
    extraFields?: ExtraField[]; // Optional, assuming additional fields are dynamic
}

// Drop and recreate the table if necessary for debugging
db.prepare('DROP TABLE IF EXISTS employees').run();
db.prepare('DROP TABLE IF EXISTS employee_fields').run();

// Create tables with UUID as the primary key
db.prepare(`
  CREATE TABLE IF NOT EXISTS employees (
    uuid TEXT PRIMARY KEY,    -- Use UUID as primary key
    name TEXT,
    age INTEGER,
    position TEXT
  )
`).run();

db.prepare(`
  CREATE TABLE IF NOT EXISTS employee_fields (
    employee_uuid TEXT,
    field_name TEXT,
    field_value TEXT,
    FOREIGN KEY(employee_uuid) REFERENCES employees(uuid) ON DELETE CASCADE
  )
`).run();

// CRUD functions

// Fetches all employees with their extra fields
export function getAllEmployees(): Employee[] {
    const employees = db.prepare(`SELECT * FROM employees`).all() as Employee[];

    if (!employees) {
        return [];
    }
    for (const employee of employees) {
        // Fetch and assign extra fields for each employee
        const extraFields = db.prepare(`SELECT field_name as key, field_value as value FROM employee_fields WHERE employee_uuid = ?`).all(employee.uuid) as ExtraField[];
        employee.extraFields = extraFields;
    }

    return employees;
}

// Adds a new employee to the database with a generated UUID
export function addEmployee(employee: Employee): Employee {
    const uuid = uuidv4(); // Generate a new UUID
    console.log("Generated UUID:", uuid, "for new employee:", employee); // Debug log to confirm UUID

    db.prepare(`INSERT INTO employees (uuid, name, age, position) VALUES (?, ?, ?, ?)`)
        .run(uuid, employee.name, employee.age, employee.position);

    // Verify that the UUID is being inserted
    const insertedEmployee = db.prepare(`SELECT * FROM employees WHERE uuid = ?`).get(uuid);
    console.log("Inserted Employee:", insertedEmployee); // Log to verify insertion

    if (employee.extraFields) {
        for (const field of employee.extraFields) {
            db.prepare(`INSERT INTO employee_fields (employee_uuid, field_name, field_value) VALUES (?, ?, ?)`)
                .run(uuid, field.key, field.value);
        }
    }

    // Return the full employee object with UUID
    return { ...employee, uuid };
}

// Deletes an employee by UUID
export function deleteEmployeeById(uuid: string) {
    db.prepare(`DELETE FROM employees WHERE uuid = ?`).run(uuid);
    db.prepare(`DELETE FROM employee_fields WHERE employee_uuid = ?`).run(uuid);
}

// Updates an employee's information by UUID
export function updateEmployee(employee: Employee) {
    if (!employee.uuid) {
        throw new Error("Employee UUID is required to update.");
    }

    db.prepare(`UPDATE employees SET name = ?, age = ?, position = ? WHERE uuid = ?`)
        .run(employee.name, employee.age, employee.position, employee.uuid);

    // Delete and re-insert extra fields to handle updates
    db.prepare(`DELETE FROM employee_fields WHERE employee_uuid = ?`).run(employee.uuid);

    if (employee.extraFields) {
        for (const field of employee.extraFields) {
            db.prepare(`INSERT INTO employee_fields (employee_uuid, field_name, field_value) VALUES (?, ?, ?)`)
                .run(employee.uuid, field.key, field.value);
        }
    }
}

export default db;
