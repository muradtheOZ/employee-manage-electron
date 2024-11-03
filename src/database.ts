const Database = require('better-sqlite3');
import * as path from 'path';

const dbPath = path.join(__dirname, '..', 'data', 'employee_data.db');
const db = new Database(dbPath);

interface ExtraField {
    key: string;
    value: string;
}

interface Employee {
    id?: number; // `id` might be optional if not provided initially
    name: string;
    age: number;
    position: string;
    extraFields?: ExtraField[]; // Optional, assuming additional fields are dynamic
}


// Create tables
db.prepare(`
  CREATE TABLE IF NOT EXISTS employees (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    age INTEGER,
    position TEXT
  )
`).run();

db.prepare(`
  CREATE TABLE IF NOT EXISTS employee_fields (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    employee_id INTEGER,
    field_name TEXT,
    field_value TEXT,
    FOREIGN KEY(employee_id) REFERENCES employees(id)
  )
`).run();

// CRUD functions
// Adds a new employee to the database

export function getAllEmployees(): Employee[] {
    // Type cast the result of the query to Employee[]
    const employees = db.prepare(`SELECT * FROM employees`).all() as Employee[];

    for (const employee of employees) {
        // Fetch and assign extra fields for each employee
        const extraFields = db.prepare(`SELECT field_name as key, field_value as value FROM employee_fields WHERE employee_id = ?`).all(employee.id) as ExtraField[];
        employee.extraFields = extraFields;
    }

    return employees;
}

export default db;


export function addEmployee(employee: Employee): number {
    const result = db.prepare(`INSERT INTO employees (name, age, position) VALUES (?, ?, ?)`)
        .run(employee.name, employee.age, employee.position);

    const employeeId = result.lastInsertRowid as number;

    if (employee.extraFields) {
        for (const field of employee.extraFields) {
            db.prepare(`INSERT INTO employee_fields (employee_id, field_name, field_value) VALUES (?, ?, ?)`)
                .run(employeeId, field.key, field.value);
        }
    }

    return employeeId;
}

// Deletes an employee by ID
export function deleteEmployee(id: number) {
    db.prepare(`DELETE FROM employees WHERE id = ?`).run(id);
    db.prepare(`DELETE FROM employee_fields WHERE employee_id = ?`).run(id);
}

// Updates an employee's information
export function updateEmployee(employee: Employee) {
    if (!employee.id) {
        throw new Error("Employee ID is required to update.");
    }

    db.prepare(`UPDATE employees SET name = ?, age = ?, position = ? WHERE id = ?`)
        .run(employee.name, employee.age, employee.position, employee.id);

    db.prepare(`DELETE FROM employee_fields WHERE employee_id = ?`).run(employee.id);

    if (employee.extraFields) {
        for (const field of employee.extraFields) {
            db.prepare(`INSERT INTO employee_fields (employee_id, field_name, field_value) VALUES (?, ?, ?)`)
                .run(employee.id, field.key, field.value);
        }
    }
}



