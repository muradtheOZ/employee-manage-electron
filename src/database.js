"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllEmployees = getAllEmployees;
exports.addEmployee = addEmployee;
exports.deleteEmployee = deleteEmployee;
exports.updateEmployee = updateEmployee;
const Database = require('better-sqlite3');
const path = __importStar(require("path"));
const dbPath = path.join(__dirname, 'employee_data.db');
const db = new Database(dbPath);
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
function getAllEmployees() {
    // Type cast the result of the query to Employee[]
    const employees = db.prepare(`SELECT * FROM employees`).all();
    for (const employee of employees) {
        // Fetch and assign extra fields for each employee
        const extraFields = db.prepare(`SELECT field_name as key, field_value as value FROM employee_fields WHERE employee_id = ?`).all(employee.id);
        employee.extraFields = extraFields;
    }
    return employees;
}
function addEmployee(employee) {
    const result = db.prepare(`INSERT INTO employees (name, age, position) VALUES (?, ?, ?)`)
        .run(employee.name, employee.age, employee.position);
    const employeeId = result.lastInsertRowid;
    if (employee.extraFields) {
        for (const field of employee.extraFields) {
            db.prepare(`INSERT INTO employee_fields (employee_id, field_name, field_value) VALUES (?, ?, ?)`)
                .run(employeeId, field.key, field.value);
        }
    }
    return employeeId;
}
// Deletes an employee by ID
function deleteEmployee(id) {
    db.prepare(`DELETE FROM employees WHERE id = ?`).run(id);
    db.prepare(`DELETE FROM employee_fields WHERE employee_id = ?`).run(id);
}
// Updates an employee's information
function updateEmployee(employee) {
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
