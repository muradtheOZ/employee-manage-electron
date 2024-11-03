"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const EmployeeForm = ({ newEmployee, setNewEmployee, extraFields, handleExtraFieldChange, addExtraField, handleAddEmployee, }) => {
    return (react_1.default.createElement("form", { onSubmit: handleAddEmployee },
        react_1.default.createElement("h2", null, "Add New Employee"),
        react_1.default.createElement("input", { type: "text", placeholder: "Name", value: newEmployee.name, onChange: (e) => setNewEmployee(Object.assign(Object.assign({}, newEmployee), { name: e.target.value })), required: true }),
        react_1.default.createElement("input", { type: "number", placeholder: "Age", value: newEmployee.age, onChange: (e) => setNewEmployee(Object.assign(Object.assign({}, newEmployee), { age: parseInt(e.target.value) })), required: true }),
        react_1.default.createElement("input", { type: "text", placeholder: "Position", value: newEmployee.position, onChange: (e) => setNewEmployee(Object.assign(Object.assign({}, newEmployee), { position: e.target.value })), required: true }),
        extraFields.map((field, index) => (react_1.default.createElement("div", { key: index },
            react_1.default.createElement("input", { type: "text", placeholder: "Field Name", value: field.key, onChange: (e) => handleExtraFieldChange(index, 'key', e.target.value) }),
            react_1.default.createElement("input", { type: "text", placeholder: "Value", value: field.value, onChange: (e) => handleExtraFieldChange(index, 'value', e.target.value) })))),
        react_1.default.createElement("button", { type: "button", onClick: addExtraField }, "+ Add Extra Field"),
        react_1.default.createElement("button", { type: "submit" }, "Add Employee")));
};
exports.default = EmployeeForm;
