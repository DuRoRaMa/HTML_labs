import React from 'react';
import TableHead from './TableHead';
import TableBody from './TableBody';

const Table = ({ data, columns, currentPage, rowsPerPage, onPageChange }) => {
  const totalPages = Math.ceil(data.length / rowsPerPage);
  
  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  return (
    <div className="table-container">
      <table border="1" cellSpacing="0">
        <TableHead columns={columns} />
        <TableBody 
          data={data} 
          columns={columns}
          currentPage={currentPage} 
          rowsPerPage={rowsPerPage} 
        />
      </table>
      
      {totalPages > 1 && (
        <div className="pagination">
          <button 
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            &lt;
          </button>
          
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
            <button
              key={page}
              className={currentPage === page ? 'active' : ''}
              onClick={() => handlePageChange(page)}
            >
              {page}
            </button>
          ))}
          
          <button 
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            &gt;
          </button>
        </div>
      )}
    </div>
  );
};

export default Table;