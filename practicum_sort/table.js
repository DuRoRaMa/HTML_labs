// table.js
// Функция для создания таблицы на странице
let createTable = (data, idTable) => {
    // Находим таблицу по ID
    let table = document.getElementById(idTable);
    
    // Очищаем таблицу перед созданием новой
    table.innerHTML = '';
    
    // Создаём строку заголовков (thead)
    let thead = document.createElement('thead');
    let trHead = document.createElement('tr');

    // Формируем заголовочную строку из ключей первого элемента массива
    for(let key in data[0]) {
        let th = document.createElement('th');
        th.innerHTML = key;
        trHead.append(th);
    }

    thead.append(trHead);
    table.append(thead);
    
    // Создаём тело таблицы (tbody)
    let tbody = document.createElement('tbody');
    
    // Формируем строки таблицы на основе массива data
    data.forEach((item) => {
        let tr = document.createElement('tr');
        
        // Перебираем свойства каждого объекта
        for(let key in item) {
            let td = document.createElement('td');
            td.innerHTML = item[key];
            tr.append(td);
        }
        
        tbody.append(tr);
    });
    
    table.append(tbody);
}

let clearTable = (idTable) => {
	let table = getElementById(idTable);
	if (table.innerHTML !=='') table.innerHTML = "";
}