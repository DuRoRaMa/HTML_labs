document.addEventListener("DOMContentLoaded", function() {
    let isTableVisible = true;
    const toggleButton = document.getElementById('toggleTable');
    const buildChartButton = document.getElementById('buildChart');
    const yAxisCheckboxes = document.querySelectorAll('input[name="yAxis"]');
    const yAxisLabels = document.querySelectorAll('input[name="yAxis"] + label');

    // Инициализация
    d3.select("#histogram").style("display", "none"); 
    showTable('build', buildings);

    toggleButton.addEventListener('click', function() {
        if (isTableVisible) {
            d3.select("#build").selectAll("*").remove();
            toggleButton.textContent = "Показать таблицу";
        } else {
            showTable('build', buildings);
            toggleButton.textContent = "Скрыть таблицу";
        }
        isTableVisible = !isTableVisible;
    });

    // Добавляем обработчик клика для чекбоксов оси OY
    yAxisCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('click', () => {
            // Сбрасываем стили для чекбоксов и меток
            yAxisCheckboxes.forEach(cb => cb.style.outline = "none");
            yAxisLabels.forEach(label => label.style.color = "black");
            // Удаляем сообщение об ошибке, если оно есть
            const existingError = document.getElementById('yAxisError');
            if (existingError) existingError.remove();
        });
    });

    buildChartButton.addEventListener('click', () => {
        const xAxis = document.querySelector('input[name="xAxis"]:checked').value;
        const yAxis = [...document.querySelectorAll('input[name="yAxis"]:checked')].map(c => c.value);
        
        // Сбрасываем стили перед проверкой
        yAxisCheckboxes.forEach(checkbox => checkbox.style.outline = "none");
        yAxisLabels.forEach(label => label.style.color = "black");
        const existingError = document.getElementById('yAxisError');
        if (existingError) existingError.remove();

        if (yAxis.length === 0) {
            // Подсвечиваем чекбоксы и их метки красным
            yAxisCheckboxes.forEach(checkbox => checkbox.style.outline = "2px solid red");
            yAxisLabels.forEach(label => label.style.color = "red");
            
            
            const yAxisContainer = document.querySelector('input[name="yAxis"]:last-of-type').parentNode;
            yAxisContainer.appendChild(errorMessage);
            return;
        }

        // Очистка обоих SVG перед отрисовкой
        d3.select("#scatter").selectAll("*").remove();
        d3.select("#histogram").selectAll("*").remove();

        // Управление видимостью SVG
        const chartType = document.getElementById('chartType').value;
        if (chartType === "scatter") {
            d3.select("#scatter").style("display", "block");
            d3.select("#histogram").style("display", "none");
            drawGraph(buildings, xAxis, yAxis);
        } else if (chartType === "histogram") {
            d3.select("#scatter").style("display", "none");
            d3.select("#histogram").style("display", "block");
            const uniqueCount = new Set(buildings.map(d => d[xAxis])).size;
            drawHistogram(buildings, xAxis, yAxis, uniqueCount);
        }
    });
});