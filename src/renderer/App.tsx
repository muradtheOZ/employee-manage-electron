import React, { useState, useEffect } from 'react';
import EmployeeForm from './components/EmployeeForm';
import EmployeeList from './components/EmployeeList';
import './index.css';

interface ExtraField {
  key: string;
  value: string;
}

interface Employee {
  uuid?: string; // Use `uuid` instead of `id`
  name: string;
  age: number;
  position: string;
  extraFields?: ExtraField[];
}

const App: React.FC = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [newEmployee, setNewEmployee] = useState<Employee>({ name: '', age: 0, position: '', extraFields: [] });
  const [extraFields, setExtraFields] = useState<ExtraField[]>([]);

  useEffect(() => {
    fetchEmployees();
  }, []);

  // Fetches all employees from the backend
  const fetchEmployees = async () => {
    const employees = await window.electron.invoke('getAllEmployees');
    setEmployees(employees);
  };

  // Handles adding a new employee
  const handleAddEmployee = async (event: React.FormEvent) => {
    event.preventDefault();
    const employeeWithExtras = { ...newEmployee, extraFields };

    await window.electron.invoke('addEmployee',employeeWithExtras)

    // Clear form and refresh employee list, which should include UUIDs
    setNewEmployee({ name: '', age: 0, position: '', extraFields: [] });
    setExtraFields([]);
    fetchEmployees();  // This should fetch employees with UUIDs
  };



  // Handles canceling the employee form
  const handleCancel = () => {
    // Clear form fields
    setNewEmployee({ name: '', age: 0, position: '' });
    setExtraFields([]);
  };

  // Updates the extra fields array when modified
  const handleExtraFieldChange = (index: number, field: 'key' | 'value', value: string) => {
    const updatedFields = [...extraFields];
    updatedFields[index][field] = value;
    setExtraFields(updatedFields);
  };

  // Adds a new blank extra field
  const addExtraField = () => {
    setExtraFields([...extraFields, { key: '', value: '' }]);
  };

  // Deletes an employee by UUID
  const handleDelete = async (uuid?: string) => {
    console.log("Deleting employee with UUID:", uuid);
    if (!uuid) return;
    try {
      // Delete the employee in the backend
      await window.electron.invoke('deleteEmployeeById', uuid);
      console.log("Deleted employee with UUID:", uuid);

      // Update state to remove the deleted employee
      const updatedEmployees = employees.filter(employee => employee.uuid !== uuid);
      setEmployees(updatedEmployees);
    } catch (e) {
      console.error('Error deleting employee:', e);
    }
  };

  return (
    <div>
      <h1>Employee Management</h1>
      <EmployeeForm
        newEmployee={newEmployee}
        setNewEmployee={setNewEmployee}
        extraFields={extraFields}
        handleExtraFieldChange={handleExtraFieldChange}
        addExtraField={addExtraField}
        handleAddEmployee={handleAddEmployee}
        handleCancel={handleCancel}
      />
      <EmployeeList employees={employees} handleDelete={handleDelete} />
    </div>
  );
};

export default App;
