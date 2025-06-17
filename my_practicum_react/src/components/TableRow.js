// src/components/TableRow.js
const TableRow = ({ row, isHead }) => {
  const cells = isHead === '1'
    ? row.map((item, index) => <th key={index}>{item}</th>)
    : row.map((item, index) => <td key={index}>{item}</td>);

  return <>{cells}</>;
};

export default TableRow;