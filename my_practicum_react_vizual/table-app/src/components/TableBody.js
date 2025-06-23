import React from 'react';

const TableBody = ({ data, columns, currentPage, rowsPerPage }) => {
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const currentData = data.slice(startIndex, endIndex);

  return (
    <tbody>
      {currentData.map((row) => (
        <tr key={row.id}>
          {columns.map((column) => (
            <td key={`${row.id}-${column}`}>
              {row[column]}
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  );
};

export default TableBody;