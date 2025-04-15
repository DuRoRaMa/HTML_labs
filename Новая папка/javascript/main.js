document.addEventListener("DOMContentLoaded", function() {
    createTable(gameData, 'idTable');
    setSortSelects(gameData[0], document.getElementById('sort'));
})
// Связываем событие change первого select с функцией changeNextSelect
document.getElementById('fieldsFirst').addEventListener('change', function() {
    changeNextSelect('fieldsSecond', this);
});
document.getElementById('fieldsSecond').addEventListener('change', function() {
    changeNextSelect('fieldsThird', this);
});
// формирование поля со списком 
// параметры – массив со значениями элементов списка и элемент select
// формирование полей элемента списка с заданным текстом и значением

let createOption = (str, val) => {
    let item = document.createElement('option');
    item.text = str;
    item.value = val;
    return item;
}

let setSortSelect = (arr, sortSelect) => {
    
    // создаем OPTION Нет и добавляем ее в SELECT
    sortSelect.append(createOption('Нет', 0));
    
    // перебираем все ключи переданного элемента массива данных
    for (let i in arr) {
       // создаем OPTION из очередного ключа и добавляем в SELECT
       // значение атрибута VAL увеличиваем на 1, так как значение 0 имеет опция Нет
        sortSelect.append(createOption(arr[i], Number(i) + 1));
    }
}
// формируем поля со списком для многоуровневой сортировки
let setSortSelects = (data, dataForm) => { 
    // выделяем ключи словаря в массив
    let head = Object.keys(data);

    // находим все SELECT в форме
    let allSelect = dataForm.getElementsByTagName('select');
    
    for(let j = 0; j < allSelect.length; j++) {
        // формируем очередной SELECT
        setSortSelect(head, allSelect[j]);
        
        // все SELECT, кроме первого, сделать неизменяемым
        if (j > 0) {
            allSelect[j].disabled = true;
        }
    }
}
// настраиваем поле для следующего уровня сортировки
// Измененная функция changeNextSelect
let changeNextSelect = (nextSelectId, curSelect) => {
    let nextSelect = document.getElementById(nextSelectId);
    
    // Если выбрано "Нет" в текущем списке, отключаем следующий и все последующие
    if (curSelect.value == 0) {
        // Отключаем следующий select
        nextSelect.disabled = true;
        nextSelect.value = 0;
        
        // Если это первый select, отключаем и второй, и третий
        if (curSelect.id === 'fieldsFirst') {
            document.getElementById('fieldsSecond').disabled = true;
            document.getElementById('fieldsSecond').value = 0;
            document.getElementById('fieldsThird').disabled = true;
            document.getElementById('fieldsThird').value = 0;
        }
        // Если это второй select, отключаем третий
        else if (curSelect.id === 'fieldsSecond') {
            document.getElementById('fieldsThird').disabled = true;
            document.getElementById('fieldsThird').value = 0;
        }
        return;
    }
    
    nextSelect.disabled = false;
    
    // Сохраняем выбранное значение в текущем списке
    const selectedValue = curSelect.value;
    
    // Копируем все options из первого списка
    const firstSelect = document.getElementById('fieldsFirst');
    nextSelect.innerHTML = firstSelect.innerHTML;
    
    // Удаляем уже выбранные options во всех предыдущих списках
    const allSelects = document.querySelectorAll('#sort select');
    const usedValues = [];
    
    allSelects.forEach(select => {
        if (select !== nextSelect && select.value != 0) {
            usedValues.push(select.value);
        }
    });
    
    // Удаляем использованные значения из следующего списка
    usedValues.forEach(value => {
        const option = nextSelect.querySelector(`option[value="${value}"]`);
        if (option) {
            option.remove();
        }
    });
    
    // Если остался только вариант "Нет", отключаем список
    if (nextSelect.options.length <= 1) {
        nextSelect.disabled = true;
        nextSelect.value = 0;
        
        // Если это первый select, отключаем и третий
        if (curSelect.id === 'fieldsFirst') {
            document.getElementById('fieldsThird').disabled = true;
            document.getElementById('fieldsThird').value = 0;
        }
    }
}