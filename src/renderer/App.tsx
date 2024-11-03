import React, { useState, useEffect } from 'react';
import EmployeeForm from './components/EmployeeForm';
import EmployeeList from './components/EmployeeList';
import './index.css';


interface ExtraField {
  key: string;
  value: string;
}

interface Employee {
  id?: number;
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

  const fetchEmployees = async () => {
    const employees = await window.electron.invoke('getAllEmployees');
    setEmployees(employees);
  };

  const handleAddEmployee = async (event: React.FormEvent) => {
    event.preventDefault();
    const employeeWithExtras = { ...newEmployee, extraFields };
    console.log("Adding new employee:", employeeWithExtras);  // Debug log

    await window.electron.invoke('addEmployee', employeeWithExtras);
    setNewEmployee({ name: '', age: 0, position: '', extraFields: [] });
    setExtraFields([]);

    fetchEmployees();  // Refresh employee list after adding
  };


  const handleExtraFieldChange = (index: number, field: 'key' | 'value', value: string) => {
    const updatedFields = [...extraFields];
    updatedFields[index][field] = value;
    setExtraFields(updatedFields);
  };

  const addExtraField = () => {
    console.log("Adding extra field value");  // Debug log
    setExtraFields([...extraFields, { key: '', value: '' }]);
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
      />
      <EmployeeList employees={employees} />
    </div>
  );
};

export default App;
