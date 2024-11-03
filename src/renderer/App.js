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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const EmployeeForm_1 = __importDefault(require("./components/EmployeeForm"));
const EmployeeList_1 = __importDefault(require("./components/EmployeeList"));
const App = () => {
    const [employees, setEmployees] = (0, react_1.useState)([]);
    const [newEmployee, setNewEmployee] = (0, react_1.useState)({ name: '', age: 0, position: '', extraFields: [] });
    const [extraFields, setExtraFields] = (0, react_1.useState)([]);
    (0, react_1.useEffect)(() => {
        fetchEmployees();
    }, []);
    const fetchEmployees = () => __awaiter(void 0, void 0, void 0, function* () {
        const employees = yield window.electron.invoke('getAllEmployees');
        setEmployees(employees);
    });
    const handleAddEmployee = (event) => __awaiter(void 0, void 0, void 0, function* () {
        event.preventDefault();
        const employeeWithExtras = Object.assign(Object.assign({}, newEmployee), { extraFields });
        yield window.electron.invoke('addEmployee', employeeWithExtras);
        setNewEmployee({ name: '', age: 0, position: '', extraFields: [] });
        setExtraFields([]);
        fetchEmployees(); // Refresh employee list after adding
    });
    const handleExtraFieldChange = (index, field, value) => {
        const updatedFields = [...extraFields];
        updatedFields[index][field] = value;
        setExtraFields(updatedFields);
    };
    const addExtraField = () => {
        setExtraFields([...extraFields, { key: '', value: '' }]);
    };
    return (react_1.default.createElement("div", null,
        react_1.default.createElement("h1", null, "Employee Management"),
        react_1.default.createElement(EmployeeForm_1.default, { newEmployee: newEmployee, setNewEmployee: setNewEmployee, extraFields: extraFields, handleExtraFieldChange: handleExtraFieldChange, addExtraField: addExtraField, handleAddEmployee: handleAddEmployee }),
        react_1.default.createElement(EmployeeList_1.default, { employees: employees })));
};
exports.default = App;
