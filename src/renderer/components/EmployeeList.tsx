// EmployeeList.tsx
import React, { useMemo, useState } from 'react';
import { useTable, Column, HeaderGroup, ColumnInstance, Cell } from 'react-table';
import ReactPaginate from 'react-paginate';

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

interface EmployeeListProps {
  employees: Employee[];
  handleDelete: (uuid?: string) => void; // Updated to accept `uuid`
}

const EmployeeList: React.FC<EmployeeListProps> = ({ employees, handleDelete }) => {
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 5;

  // Filtered employees based on search query
  const filteredEmployees = employees.filter(employee =>
    (employee.name && employee.name.toLowerCase().includes(search.toLowerCase())) ||
    (employee.position && employee.position.toLowerCase().includes(search.toLowerCase()))
  );

  // Pagination logic
  const pageCount = Math.ceil(filteredEmployees.length / itemsPerPage);
  const handlePageClick = (data: { selected: number }) => {
    setCurrentPage(data.selected);
  };
  const paginatedEmployees = filteredEmployees.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  // Columns for the table (excluding the row number column)
  const columns = useMemo<Column<Employee>[]>(() => [
    { Header: 'Name', accessor: 'name' as keyof Employee },
    { Header: 'Age', accessor: 'age' as keyof Employee },
    { Header: 'Position', accessor: 'position' as keyof Employee },
    {
      Header: 'Extra Fields',
      accessor: 'extraFields' as keyof Employee,
      Cell: ({ cell }: { cell: { value: ExtraField[] } }) =>
        cell.value ? cell.value.map((field, index) => (
          <div key={index}>
            <strong>{field.key}:</strong> {field.value}
          </div>
        )) : null,
    },
    {
      Header: 'Actions',
      accessor: 'actions' as keyof Employee, // Dummy accessor to satisfy Column type
      Cell: ({ row }: { row: { original: Employee } }) => (
        <button
          onClick={() => handleDelete(row.original.uuid)} // Use `uuid` here
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded transition duration-200 ease-in-out"
        >
          Delete
        </button>
      ),
    }
  ], [handleDelete]);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({
    columns,
    data: paginatedEmployees,
  });

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4">Employee List</h2>
      {/* Search input */}
      <input
        type="text"
        placeholder="Search by name or position..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded mb-4"
      />

      {/* Table */}
      <table {...getTableProps()} className="w-full border-collapse mb-4">
        <thead>
          {headerGroups.map((headerGroup: HeaderGroup<Employee>) => (
            <tr {...headerGroup.getHeaderGroupProps()} className="bg-gray-100">
              <th className="border border-gray-300 p-2 text-left font-semibold">No.</th>
              {headerGroup.headers.map((column: ColumnInstance<Employee>) => (
                <th
                  {...column.getHeaderProps()}
                  className="border border-gray-300 p-2 text-left font-semibold"
                >
                  {column.render('Header')}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row, rowIndex) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()} className="hover:bg-gray-50">
                {/* Row number */}
                <td className="border border-gray-300 p-2">
                  {currentPage * itemsPerPage + rowIndex + 1}
                </td>
                {row.cells.map((cell: Cell<Employee>) => (
                  <td {...cell.getCellProps()} className="border border-gray-300 p-2">
                    {cell.render('Cell')}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>

      {/* Pagination */}
      <ReactPaginate
        previousLabel={'← Prev'}
        nextLabel={'Next →'}
        breakLabel={'...'}
        pageCount={pageCount}
        marginPagesDisplayed={2}
        pageRangeDisplayed={3}
        onPageChange={handlePageClick}
        containerClassName="flex justify-center items-center space-x-2 mt-4"
        activeClassName="font-bold"
        pageClassName="group"
        pageLinkClassName="px-3 py-1 rounded-full transition duration-200 ease-in-out transform bg-gray-200 text-gray-800 group-hover:bg-blue-500 group-hover:text-white group-hover:scale-110"
        previousClassName="group"
        previousLinkClassName="px-3 py-1 rounded-full transition duration-200 ease-in-out transform bg-gray-200 text-gray-800 group-hover:bg-blue-500 group-hover:text-white group-hover:scale-110"
        nextClassName="group"
        nextLinkClassName="px-3 py-1 rounded-full transition duration-200 ease-in-out transform bg-gray-200 text-gray-800 group-hover:bg-blue-500 group-hover:text-white group-hover:scale-110"
        breakClassName="group"
        breakLinkClassName="px-3 py-1 rounded-full bg-gray-200 text-gray-800"
        disabledClassName="opacity-50 cursor-not-allowed"
        activeLinkClassName="bg-blue-600 text-white px-3 py-1 rounded-full scale-110"
      />
    </div>
  );
};

export default EmployeeList;
