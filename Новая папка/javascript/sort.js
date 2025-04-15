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
    return headerText === 'Год выхода' || headerText === 'Количество проданных копий';
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
    
    //сортируем данные по всем уровням сортировки
    rowData.sort((first, second) => {
        for(let i in sortArr) {
            let key = sortArr[i].column;
            // Получаем значения ячеек
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

const ClearSortBut = document.getElementById("Reset");
sortBut.addEventListener('click', function(){
	sortTable('idTable', document.getElementById('sort'));
});
function resetSorting(tableId, originalData, sortForm) {
    createTable(originalData, tableId);
    let selects = sortForm.getElementsByTagName('select');
    let checkboxes = sortForm.querySelectorAll('input[type="checkbox"]');
    
    // Сбрасываем все select'ы
    selects[0].selectedIndex = 0; // Устанавливаем "Нет" в первом
    selects[1].selectedIndex = 0; // Устанавливаем "Нет" во втором
    selects[1].disabled = true;   // Отключаем второй
    selects[2].selectedIndex = 0; // Устанавливаем "Нет" в третьем
    selects[2].disabled = true;   // Отключаем третий
    
    // Сбрасываем чекбоксы
    checkboxes[0].checked = false;
    checkboxes[1].checked = false;
    checkboxes[2].checked = false;
    
    // Очищаем options во втором и третьем select'ах, оставляя только "Нет"
    const secondSelect = selects[1];
    while (secondSelect.options.length > 1) {
        secondSelect.remove(1);
    }
    
    const thirdSelect = selects[2];
    while (thirdSelect.options.length > 1) {
        thirdSelect.remove(1);
    }
}
ClearSortBut.addEventListener('click', function(){
	resetSorting('idTable', gameData, document.getElementById('sort'));
    filterTable(gameData, 'idTable', document.getElementById('filter'));
});