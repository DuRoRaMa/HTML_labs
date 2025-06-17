import { useState, useEffect } from 'react';
import TableHead from './TableHead.js';
import TableBody from './TableBody.js';
import Filter from './filter.js';

const Table = (props) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [dataTable, setDataTable] = useState(props.data);
    
    // Синхронизация при изменении props.data
    useEffect(() => {
        setDataTable(props.data);
    }, [props.data]);

    // Сброс страницы при изменении данных
    useEffect(() => {
        setCurrentPage(1);
    }, [dataTable]); 

    const updateDataTable = (value) => setDataTable(value);
    
    // Защита от пустых данных
    const headers = props.data.length > 0 
        ? Object.keys(props.data[0]) 
        : [];

    // Количество страниц
    const n = Math.ceil(dataTable.length / props.amountRows); 
    const arr = Array.from({ length: n }, (v, i) => i + 1);
    
    const PageChange = (page) => {
        setCurrentPage(page);
    }
    
    const pages = arr.map((item, index) =>  
        <span
            key={index} 
            className={`CoolSpan ${currentPage === item ? 'active':''}`} 
            onClick={() => PageChange(item)}
        > 
            {item} 
        </span>
    );
    
    return( 
      <>
        <h4>Фильтры</h4>
        <Filter filtering={updateDataTable} data={dataTable} fullData={props.data}/>

        {props.data.length > 0 ? (
          <>
            <table className='table'>
                <TableHead head={headers} />
                <TableBody 
                    body={dataTable} 
                    amountRows={props.plagination ? props.amountRows : dataTable.length} 
                    numPage={props.plagination ? currentPage : 1}
                />
            </table>

            {props.plagination && n > 1 && (
              <div>{pages}</div>
            )}
          </>
        ) : (
          <p>Нет данных для отображения</p>
        )}
      </>   
    )   
}

export default Table;