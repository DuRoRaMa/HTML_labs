// main.js
document.addEventListener("DOMContentLoaded", function() {
    // Проверяем, что gameData определена и является массивом
    if (typeof gameData === 'undefined' || !Array.isArray(gameData)) {
        console.error("gameData is not defined or not an array");
        return;
    }

    // Определяем функции setSortSelect и setSortSelects
    let createOption = (str, val) => {
        let item = document.createElement('option');
        item.text = str;
        item.value = val;
        return item;
    };

    let setSortSelect = (arr, sortSelect) => {
        sortSelect.append(createOption('Нет', 0));
        arr.forEach((header, index) => {
            sortSelect.append(createOption(header, index + 1));
        });
    };

    let setSortSelects = (data, dataForm) => {
        if (!data) {
            console.error("setSortSelects: data is undefined");
            return;
        }
        let head = Object.keys(data); // Получаем заголовки столбцов
        let allSelect = dataForm.getElementsByTagName('select');
        
        for (let j = 0; j < allSelect.length; j++) {
            setSortSelect(head, allSelect[j]);
            if (j > 0) {
                allSelect[j].disabled = true;
            }
        }
    };

    // Инициализация таблицы и сортировки
    createTable(gameData, 'idTable');
    setSortSelects(gameData[0], document.getElementById('sort'));

    // Начальная отрисовка точечной диаграммы
    drawGraph(gameData, "Жанр", ["max"], "scatter");
    d3.select("#histogram").style("display", "none");
    d3.select("#line").style("display", "none");

    // Выбираем чекбоксы и их метки
    const yAxisCheckboxes = document.querySelectorAll('input[name="yAxis"]');
    const yAxisLabels = document.querySelectorAll('input[name="yAxis"] + label');
    const buildChartButton = document.getElementById('buildChart');

    // Добавляем обработчик клика для чекбоксов оси Y
    yAxisCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('click', () => {
            // Сбрасываем стили для чекбоксов и меток
            yAxisCheckboxes.forEach(cb => cb.style.outline = "none");
            yAxisLabels.forEach(label => label.style.color = "black");
        });
    });

    // Обработчик кнопки построения графика
    // Обработчик кнопки построения графика
buildChartButton.addEventListener('click', () => {
    const xAxis = document.querySelector('input[name="xAxis"]:checked')?.value || "Жанр";
    const yAxis = [...document.querySelectorAll('input[name="yAxis"]:checked')].map(c => c.value);
    
    yAxisCheckboxes.forEach(checkbox => checkbox.style.outline = "none");
    yAxisLabels.forEach(label => label.style.color = "black");

    if (yAxis.length === 0) {
        yAxisCheckboxes.forEach(checkbox => checkbox.style.outline = "2px solid red");
        yAxisLabels.forEach(label => label.style.color = "red");
        return;
    }

    const filteredData = dataFilter(document.getElementById('filter'), gameData);

    d3.select("#scatter").selectAll("*").remove();
    d3.select("#histogram").selectAll("*").remove();
    d3.select("#line").selectAll("*").remove();

    const chartType = document.getElementById('chartType').value;
    console.log("Building chart type:", chartType);
    d3.select("#scatter").style("display", chartType === "scatter" ? "block" : "none");
    d3.select("#histogram").style("display", chartType === "histogram" ? "block" : "none");
    d3.select("#line").style("display", chartType === "line" ? "block" : "none");
    drawGraph(filteredData, xAxis, yAxis, chartType);
});

    // Обработчик для сортировки
    document.getElementById('fieldsFirst').addEventListener('change', function() {
        changeNextSelect('fieldsSecond', this);
    });
    document.getElementById('fieldsSecond').addEventListener('change', function() {
        changeNextSelect('fieldsThird', this);
    });

    let changeNextSelect = (nextSelectId, curSelect) => {
        let nextSelect = document.getElementById(nextSelectId);
        
        if (curSelect.value == 0) {
            nextSelect.disabled = true;
            nextSelect.value = 0;
            if (curSelect.id === 'fieldsFirst') {
                document.getElementById('fieldsSecond').disabled = true;
                document.getElementById('fieldsSecond').value = 0;
                document.getElementById('fieldsThird').disabled = true;
                document.getElementById('fieldsThird').value = 0;
            } else if (curSelect.id === 'fieldsSecond') {
                document.getElementById('fieldsThird').disabled = true;
                document.getElementById('fieldsThird').value = 0;
            }
            return;
        }
        
        nextSelect.disabled = false;
        const firstSelect = document.getElementById('fieldsFirst');
        nextSelect.innerHTML = firstSelect.innerHTML;
        
        const allSelects = document.querySelectorAll('#sort select');
        const usedValues = [];
        
        allSelects.forEach(select => {
            if (select !== nextSelect && select.value != 0) {
                usedValues.push(select.value);
            }
        });
        
        usedValues.forEach(value => {
            const option = nextSelect.querySelector(`option[value="${value}"]`);
            if (option) {
                option.remove();
            }
        });
        
        if (nextSelect.options.length <= 1) {
            nextSelect.disabled = true;
            nextSelect.value = 0;
            if (curSelect.id === 'fieldsFirst') {
                document.getElementById('fieldsThird').disabled = true;
                document.getElementById('fieldsThird').value = 0;
            }
        }
    };
});