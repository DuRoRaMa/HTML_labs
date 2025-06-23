import React from 'react';

const TableHead = ({ columns }) => (
  <thead>
    <tr>
      {columns.map((column, index) => (
        <th key={index}>{column}</th>
      ))}
    </tr>
  </thead>
);

export default TableHead;