import TableRow from './TableRow.js';

const TableBody = (props) => {
    if (props.body.length === 0) {
        return (
            <tbody>
                <tr>
                    <td colSpan="100%" style={{ textAlign: 'center' }}>
                        Нет данных для отображения
                    </td>
                </tr>
            </tbody>
        );
    }

    const begRange = (props.numPage - 1) * props.amountRows;
    const endRange = begRange + Number(props.amountRows);

    const tbody = props.body.map((item, index) => {
        const values = Object.values(item);
        return (
            <tr 
                key={index} 
                className={index >= begRange && index < endRange ? "show" : "hide"}
            > 
                <TableRow row={values} isHead="0"/>
            </tr>
        );
    }); 
 
    return <tbody>{tbody}</tbody>;
}

export default TableBody;