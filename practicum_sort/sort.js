/*формируем массив для сортировки по уровням вида 
  (в нашем случае в форме два уровня сортировки):
   [
    {column: номер столбца, по которому осуществляется сортировка, 
     order: порядок сортировки (true по убыванию, false по возрастанию)
    },
    {column: номер столбца, 
     order: порядок сортировки
    }
   ]
*/
let createSortArr = (data) => {
    let sortArr = [];
    
    let sortSelects = data.getElementsByTagName('select');
    
    for (let i = 0; i < sortSelects.length; i++) {   
       // получаем номер выбранной опции
        let keySort = sortSelects[i].value;
        // в случае, если выбрана опция Нет, заканчиваем формировать массив
        if (keySort == 0) {
            break;
        }
        // получаем номер значение флажка для порядка сортировки
        // имя флажка сформировано как имя поля SELECT и слова Desc
        let desc = document.getElementById(sortSelects[i].id + 'Desc').checked;
        sortArr.push(
          {column: keySort - 1, 
           order: desc}
        ); 
    }
    return sortArr; 
};


let isNumericColumn = (columnIndex, table) => {
    let headers = table.rows[0].cells;
    let headerText = headers[columnIndex].innerHTML;
    return headerText === 'Год' || headerText === 'Высота';
};

let sortTable = (idTable, data) => {
    // формируем управляющий массив для сортировки
    let sortArr = createSortArr(data);
    
    // сортировать таблицу не нужно, во всех полях выбрана опция Нет
    if (sortArr.length === 0) {
        return false;
    }
    //находим нужную таблицу
    let table = document.getElementById(idTable);

    // преобразуем строки таблицы в массив 
    let rowData = Array.from(table.rows);
    
    // удаляем элемент с заголовками таблицы
    let header = rowData.shift();
    
    
    rowData.sort((first, second) => {
        for(let i in sortArr) {
            let key = sortArr[i].column;
            let firstValue = first.cells[key].innerHTML;
            let secondValue = second.cells[key].innerHTML;
            
            // Проверяем, является ли столбец числовым
            if (isNumericColumn(key, table)) {
                
                let firstNum = parseFloat(firstValue);
                let secondNum = parseFloat(secondValue);
                if (firstNum > secondNum) {
                    return sortArr[i].order ? -1 : 1;
                } else if (firstNum < secondNum) {
                   return sortArr[i].order ? 1 : -1;
                }
                
            } 
            // Иначе сравниваем как строки
            else {
                if (firstValue > secondValue) {
                    return sortArr[i].order ? -1 : 1;
                } else if (firstValue < secondValue) {
                    return sortArr[i].order ? 1 : -1;
                }
            }
        }
        return 0;
    });
    
    // обновить таблицу на странице
    let tbody = table.querySelector('tbody');
    if (!tbody) {
        tbody = document.createElement('tbody');
        table.appendChild(tbody);
    } else {
        tbody.innerHTML = '';
    }
    
    // Восстанавливаем заголовок
    table.insertBefore(header, tbody);
    
    // Добавляем отсортированные строки
    rowData.forEach(row => {
        tbody.appendChild(row);
    });
}

const sortBut = document.getElementById("Sort");
sortBut.addEventListener('click', function(){
    sortTable('list', document.getElementById('sort'));
});