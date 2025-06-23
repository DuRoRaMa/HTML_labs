const Table = (props) => {
    ...
    const [dataTable, setDataTable] = useState(props.data);
    const updateDataTable = (value) => setDataTable(value);
    ...
    return( 
      <>
        <h4>Фильтры</h4>
        <Filter filtering={ updateDataTable } data={ dataTable } fullData={ props.data }/>
	   
        <table>
            <TableHead head={ Object.keys(props.data[0]) } />
            <TableBody body={ dataTable } amountRows={props.amountRows} numPage={activePage} />
        </table>
       ...
      </>  
    )   
}