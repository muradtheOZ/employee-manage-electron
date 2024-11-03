// EmployeeList.tsx
import React from 'react';

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

interface EmployeeListProps {
  employees: Employee[];
}

const EmployeeList: React.FC<EmployeeListProps> = ({ employees }) => {
  return (
    <div>
      <h2>Employee List</h2>
      {employees.map((employee) => (
        <div key={employee.id} style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '10px' }}>
          <p><strong>Name:</strong> {employee.name}</p>
          <p><strong>Age:</strong> {employee.age}</p>
          <p><strong>Position:</strong> {employee.position}</p>
          {employee.extraFields && employee.extraFields.map((field, index) => (
            <p key={index}><strong>{field.key}:</strong> {field.value}</p>
          ))}
        </div>
      ))}
    </div>
  );
};

export default EmployeeList;
