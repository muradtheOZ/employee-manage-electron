import React from 'react';

interface ExtraField {
  key: string;
  value: string;
}

interface Employee {
  name: string;
  age: number;
  position: string;
}

interface EmployeeFormProps {
  newEmployee: Employee;
  setNewEmployee: React.Dispatch<React.SetStateAction<Employee>>;
  extraFields: ExtraField[];
  handleExtraFieldChange: (index: number, field: 'key' | 'value', value: string) => void;
  addExtraField: () => void;
  handleAddEmployee: (event: React.FormEvent) => void;
}

const EmployeeForm: React.FC<EmployeeFormProps> = ({
  newEmployee,
  setNewEmployee,
  extraFields,
  handleExtraFieldChange,
  addExtraField,
  handleAddEmployee,
}) => {
  return (
    <form onSubmit={handleAddEmployee}>
      <h2>Add New Employee</h2>
      <input
        type="text"
        placeholder="Name"
        value={newEmployee.name}
        onChange={(e) => setNewEmployee({ ...newEmployee, name: e.target.value })}
        required
      />
      <input
        type="number"
        placeholder="Age"
        value={newEmployee.age}
        onChange={(e) => setNewEmployee({ ...newEmployee, age: parseInt(e.target.value) })}
        required
      />
      <input
        type="text"
        placeholder="Position"
        value={newEmployee.position}
        onChange={(e) => setNewEmployee({ ...newEmployee, position: e.target.value })}
        required
      />

      {extraFields.map((field, index) => (
        <div key={index}>
          <input
            type="text"
            placeholder="Field Name"
            value={field.key}
            onChange={(e) => handleExtraFieldChange(index, 'key', e.target.value)}
          />
          <input
            type="text"
            placeholder="Value"
            value={field.value}
            onChange={(e) => handleExtraFieldChange(index, 'value', e.target.value)}
          />
        </div>
      ))}

      <button type="button" onClick={addExtraField}>+ Add Extra Field</button>
      <button type="submit">Add Employee</button>
    </form>
  );
};

export default EmployeeForm;
