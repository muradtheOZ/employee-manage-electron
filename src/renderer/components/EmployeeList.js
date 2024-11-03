"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const EmployeeList = ({ employees }) => {
    return (react_1.default.createElement("div", null,
        react_1.default.createElement("h2", null, "Employee List"),
        employees.map((employee) => (react_1.default.createElement("div", { key: employee.id, style: { border: '1px solid #ccc', padding: '10px', marginBottom: '10px' } },
            react_1.default.createElement("p", null,
                react_1.default.createElement("strong", null, "Name:"),
                " ",
                employee.name),
            react_1.default.createElement("p", null,
                react_1.default.createElement("strong", null, "Age:"),
                " ",
                employee.age),
            react_1.default.createElement("p", null,
                react_1.default.createElement("strong", null, "Position:"),
                " ",
                employee.position),
            employee.extraFields && employee.extraFields.map((field, index) => (react_1.default.createElement("p", { key: index },
                react_1.default.createElement("strong", null,
                    field.key,
                    ":"),
                " ",
                field.value))))))));
};
exports.default = EmployeeList;
