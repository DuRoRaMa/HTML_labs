// устанавливаем соответствие между полями формы и столбцами таблицы
let correspond = {
    "Название": "name",
    "Жанр": "genre",
    "Издатель": "Publisher",
    "Разработчик": "developer",
    "Год релиза": ["yearFrom", "yearTo"],
    "Количество проданных копий": ["SalesFrom", "SalesTo"]
}
const findBut = document.getElementById('findBut');
let dataFilter = (dataForm) => {
    
    let dictFilter = {};
    // перебираем все элементы формы с фильтрами
    
    for(let j = 0; j < dataForm.elements.length; j++) {

        // выделяем очередной элемент формы
        let item = dataForm.elements[j];
        
        // получаем значение элемента
        let valInput = item.value;

        // если поле типа text - приводим его значение к нижнему регистру
        if (item.type == "text") {
            valInput = valInput.toLowerCase();
        } else if (item.type == "number"){
			if (valInput !== ""){
				valInput = Number(valInput);
			} else {
				if (item.type.includes("From")){
					valInput = -Infinity;
				} else if (item.type.includes("To")){
					valInput = +Infinity;
				}
			}
			
		}
        /* САМОСТОЯТЕЛЬНО обработать значения числовых полей:
        - если в поле занесено значение - преобразовать valInput к числу;
        - если поле пусто и его id включает From  - занести в valInput 
           -бесконечность
        - если поле пусто и его id включает To  - занести в valInput 
           +бесконечность
        */

         // формируем очередной элемент ассоциативного массива
        dictFilter[item.id] = valInput;
    }       
    return dictFilter;
}
// фильтрация таблицы

let filterTable = (data, idTable, dataForm) =>{
    
    // получаем данные из полей формы
    let datafilter = dataFilter(dataForm);
    
    // выбираем данные соответствующие фильтру и формируем таблицу из них
    let tableFilter = data.filter(item => {

        /* в этой переменной будут "накапливаться" результаты сравнения данных
           с параметрами фильтра */
        let result = true;
        
        // строка соответствует фильтру, если сравнение всех значения из input 
        // со значением ячейки очередной строки - истина
        for(let key in item) {
            
            let val = item[key];
            
            // текстовые поля проверяем на вхождение
            if (typeof val == 'string') {
                val = item[key].toLowerCase() 
                result &&= val.indexOf(datafilter[correspond[key]]) !== -1 
            }  else if (typeof val == 'number') {
				if (key == 'Год релиза') {
					let min = datafilter.yearFrom || -Infinity;
					let max = datafilter.yearTo || Infinity;
					result = result && (val >= min && val <= max);
				} 
				else if (key == 'Количество проданных копий') {
					let min = datafilter.heightFrom || -Infinity;
					let max = datafilter.heightTo || Infinity;
					result = result && (val >= min && val <= max);
				}
			}
            // САМОСТОЯТЕЛЬНО проверить числовые поля на принадлежность интервалу

         }
         return result;
    });     
	

    // показать на странице таблицу с отфильтрованными строками
    createTable(tableFilter, idTable);  
}

findBut.addEventListener('click', function() {
    resetSorting('idTable', gameData, document.getElementById('sort'));
    filterTable(gameData, 'idTable', document.getElementById('filter'));
    
});
// Функция очистки фильтров
function clearFilter(tableId, originalTable, form) {
    const inputs = form.elements;
    for (let i = 0; i < inputs.length; i++) {
        if (inputs[i].type === 'text' || inputs[i].type === 'number') {
            inputs[i].value = '';
        }
    }
    createTable(originalTable, tableId);
}

const ClearFil = document.getElementById('ClearFilterBut')
ClearFil.addEventListener('click', function() {
    
    clearFilter('idTable',gameData,document.getElementById('filter'));
    resetSorting('idTable', gameData, document.getElementById('sort'));
});