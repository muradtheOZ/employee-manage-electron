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
  handleCancel: () => void;
}

const EmployeeForm: React.FC<EmployeeFormProps> = ({
  newEmployee,
  setNewEmployee,
  extraFields,
  handleExtraFieldChange,
  addExtraField,
  handleAddEmployee,
  handleCancel,
}) => {
  return (
    <form onSubmit={handleAddEmployee} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 max-w-lg mx-auto">
      <h2 className="text-2xl font-semibold text-center text-blue-600 mb-6">Add New Employee</h2>

      <input
        type="text"
        placeholder="Name"
        value={newEmployee.name}
        onChange={(e) => setNewEmployee({ ...newEmployee, name: e.target.value })}
        required
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-4"
      />

      <input
        type="number"
        placeholder="Age"
        value={newEmployee.age}
        onChange={(e) => setNewEmployee({ ...newEmployee, age: parseInt(e.target.value) })}
        required
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-4"
      />

      <input
        type="text"
        placeholder="Position"
        value={newEmployee.position}
        onChange={(e) => setNewEmployee({ ...newEmployee, position: e.target.value })}
        required
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-4"
      />

      <div className="mb-4">
        <h3 className="text-lg font-semibold text-blue-500 mb-2">Extra Fields</h3>
        {extraFields.map((field, index) => (
          <div key={index} className="flex items-center mb-2">
            <input
              type="text"
              placeholder="Field Name"
              value={field.key}
              onChange={(e) => handleExtraFieldChange(index, 'key', e.target.value)}
              className="shadow appearance-none border rounded w-1/2 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mr-2"
            />
            <input
              type="text"
              placeholder="Value"
              value={field.value}
              onChange={(e) => handleExtraFieldChange(index, 'value', e.target.value)}
              className="shadow appearance-none border rounded w-1/2 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={addExtraField}
        className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4 transition duration-200 ease-in-out"
      >
        + Add Extra Field
      </button>

      <div className="flex space-x-4">
        <button
          type="submit"
          className="w-full bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded transition duration-200 ease-in-out"
        >
          Add Employee
        </button>
        <button
          type="button"
          onClick={handleCancel}
          className="w-full bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition duration-200 ease-in-out"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default EmployeeForm;

