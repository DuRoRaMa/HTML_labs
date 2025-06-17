// javascript/filter.js
let correspond = {
    "name": "Название",
    "genre": "Жанр",
    "Publisher": "Издатель",
    "developer": "Разработчик",
    "yearFrom": "Год релиза",
    "yearTo": "Год релиза",
    "SalesFrom": "Количество проданных копий",
    "SalesTo": "Количество проданных копий"
};

let dataFilter = (dataForm, data) => {
    if (!Array.isArray(data)) {
        console.error("dataFilter: data is not an array", data);
        return [];
    }

    let dictFilter = {};
    for (let j = 0; j < dataForm.elements.length; j++) {
        let item = dataForm.elements[j];
        let valInput = item.value;

        if (item.type === "text") {
            valInput = valInput.toLowerCase().trim();
        } else if (item.type === "number") {
            if (valInput !== "") {
                valInput = Number(valInput);
            } else {
                if (item.id.includes("From")) {
                    valInput = -Infinity;
                } else if (item.id.includes("To")) {
                    valInput = Infinity;
                }
            }
        }
        if (valInput !== "") {
            dictFilter[item.id] = valInput;
        }
    }

    let tableFilter = data.filter(item => {
        let result = true;
        for (let key in item) {
            let val = item[key];
            let filterKey = Object.keys(correspond).find(id => correspond[id] === key);
            let filterValue = filterKey ? dictFilter[filterKey] : undefined;

            if (typeof val === 'string' && filterValue) {
                val = val.toLowerCase();
                result = result && val.includes(filterValue);
            } else if (typeof val === 'number') {
                if (key === 'Год релиза') {
                    let min = dictFilter.yearFrom || -Infinity;
                    let max = dictFilter.yearTo || Infinity;
                    result = result && (val >= min && val <= max);
                } else if (key === 'Количество проданных копий') {
                    let min = dictFilter.SalesFrom || -Infinity;
                    let max = dictFilter.SalesTo || Infinity;
                    result = result && (val >= min && val <= max);
                }
            }
        }
        return result;
    });

    return tableFilter;
};

let filterTable = (data, idTable, dataForm) => {
    const filteredData = dataFilter(dataForm, data);
    createTable(filteredData, idTable);
    
    // Обновляем график с отфильтрованными данными
    const xAxis = document.querySelector('input[name="xAxis"]:checked')?.value || "Жанр";
    const yAxisCheckboxes = document.querySelectorAll('input[name="yAxis"]:checked');
    const metrics = Array.from(yAxisCheckboxes).map(cb => cb.value) || ["max"];
    const chartType = document.getElementById('chartType').value;

    d3.select("#scatter").selectAll("*").remove();
    d3.select("#histogram").selectAll("*").remove();
    d3.select("#line").selectAll("*").remove();
    d3.select("#scatter").style("display", chartType === "scatter" ? "block" : "none");
    d3.select("#histogram").style("display", chartType === "histogram" ? "block" : "none");
    d3.select("#line").style("display", chartType === "line" ? "block" : "none");
    drawGraph(filteredData, xAxis, metrics, chartType);
};

const findBut = document.getElementById('findBut');
findBut.addEventListener('click', function() {
    resetSorting('idTable', gameData, document.getElementById('sort'));
    filterTable(gameData, 'idTable', document.getElementById('filter'));
});

function clearFilter(tableId, originalTable, form) {
    const inputs = form.elements;
    for (let i = 0; i < inputs.length; i++) {
        if (inputs[i].type === 'text' || inputs[i].type === 'number') {
            inputs[i].value = '';
        }
    }
    createTable(originalTable, tableId);
    
    // Обновляем график с исходными данными
    const xAxis = document.querySelector('input[name="xAxis"]:checked')?.value || "Жанр";
    const yAxisCheckboxes = document.querySelectorAll('input[name="yAxis"]:checked');
    const metrics = Array.from(yAxisCheckboxes).map(cb => cb.value) || ["max"];
    const chartType = document.getElementById('chartType').value;

    d3.select("#scatter").selectAll("*").remove();
    d3.select("#histogram").selectAll("*").remove();
    d3.select("#line").selectAll("*").remove();
    d3.select("#scatter").style("display", chartType === "scatter" ? "block" : "none");
    d3.select("#histogram").style("display", chartType === "histogram" ? "block" : "none");
    d3.select("#line").style("display", chartType === "line" ? "block" : "none");
    drawGraph(originalTable, xAxis, metrics, chartType);
}

const ClearFil = document.getElementById('ClearFilterBut');
ClearFil.addEventListener('click', function() {
    clearFilter('idTable', gameData, document.getElementById('filter'));
    resetSorting('idTable', gameData, document.getElementById('sort'));
});