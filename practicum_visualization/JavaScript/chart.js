function createArrGraph(data, key, metrics) {
    const groupObj = d3.group(data, d => d[key]);
    const arrGraph = [];
    const isYear = key === "Год";

    for (const [k, values] of groupObj) {
        const heights = values.map(d => d['Высота']);
        const label = isYear ? parseInt(k) : k;
        if (!isNaN(label) || !isYear) { 
            arrGraph.push({
                labelX: label,
                max: d3.max(heights),
                min: d3.min(heights)
            });
        }
    }

    if (isYear) {
        arrGraph.sort((a, b) => a.labelX - b.labelX);
    } else {
        arrGraph.sort((a, b) => a.labelX); 
    }

    return arrGraph;
}

function drawGraph(data, key = "Страна", metrics = ["max"]) {
    const arrGraph = createArrGraph(data, key, metrics);
    
    let svg = d3.select("#scatter");
    svg.selectAll('*').remove();
    const width = 1200;
    const height = 500;
    const margin = { top: 40, right: 30, bottom: 100, left: 60 };

    svg.attr("width", width)
       .attr("height", height);

    const [scX, scY] = createAxis(svg, arrGraph, { width, height, marginX: margin.left, marginY: margin.top }, key);
    
    createChart(svg, arrGraph, scX, scY, { width, height, marginX: margin.left, marginY: margin.top }, metrics);
}

function createAxis(svg, data, attr_area, key) {
    const isYear = key === "Год";
    const xDomain = data.map(d => d.labelX);
    const yExtent = [0, d3.max(data, d => d.max) * 1.1];

    // Используем scaleBand для всех случаев, чтобы года отображались как на гистограмме
    const scaleX = d3.scaleBand()
        .domain(xDomain.filter(d => !isNaN(d) || !isYear))
        .range([0, attr_area.width - 2 * attr_area.marginX])
        .padding(0.1);

    const scaleY = d3.scaleLinear()
        .domain(yExtent)
        .range([attr_area.height - 2 * attr_area.marginY, 0]);

    const axisX = d3.axisBottom(scaleX)
        .tickFormat(isYear ? d3.format("d") : d => d);

    const axisY = d3.axisLeft(scaleY);

    const gX = svg.append("g")
        .attr("transform", `translate(${attr_area.marginX}, ${attr_area.height - attr_area.marginY})`)
        .call(axisX);
    
    gX.selectAll("text")
        .style("text-anchor", "end")
        .attr("dx", "-.8em")
        .attr("dy", ".15em")
        .attr("transform", "rotate(-45)");

    svg.append("g")
        .attr("transform", `translate(${attr_area.marginX}, ${attr_area.marginY})`)
        .call(axisY);

    return [scaleX, scaleY];
}

function createChart(svg, data, scaleX, scaleY, attr_area, metrics) {
    const r = 4;
    const offset = 5; // Смещение точек при наложении

    data.forEach(d => {
        const x = scaleX(d.labelX) + scaleX.bandwidth() / 2;
        
        if (metrics.includes("max") && metrics.includes("min") && d.max === d.min) {
            // Если значения максимума и минимума совпадают, раздвигаем точки
            if (metrics.includes("max")) {
                svg.append("circle")
                    .attr("cx", x + attr_area.marginX - offset)
                    .attr("cy", scaleY(d.max) + attr_area.marginY)
                    .attr("r", r)
                    .style("fill", "#FF6384");
            }
            if (metrics.includes("min")) {
                svg.append("circle")
                    .attr("cx", x + attr_area.marginX + offset)
                    .attr("cy", scaleY(d.min) + attr_area.marginY)
                    .attr("r", r)
                    .style("fill", "#36A2EB");
            }
        } else {
            // Обычный случай без смещения
            if (metrics.includes("max")) {
                svg.append("circle")
                    .attr("cx", x + attr_area.marginX)
                    .attr("cy", scaleY(d.max) + attr_area.marginY)
                    .attr("r", r)
                    .style("fill", "#FF6384");
            }
            if (metrics.includes("min")) {
                svg.append("circle")
                    .attr("cx", x + attr_area.marginX)
                    .attr("cy", scaleY(d.min) + attr_area.marginY)
                    .attr("r", r)
                    .style("fill", "#36A2EB");
            }
        }
    });
}

function prepareHistogramData(data, groupBy, metrics, barCount) {
    const groupObj = d3.group(data, d => d[groupBy]);
    const preparedData = [];
    const isYear = groupBy === "Год";

    for (const [key, values] of groupObj) {
        const heights = values.map(d => d['Высота']);
        const label = isYear ? parseInt(key) : key;
        preparedData.push({
            category: label,
            max: d3.max(heights),
            min: d3.min(heights)
        });
    }

    if (isYear) {
        preparedData.sort((a, b) => a.category - b.category);
    } else {
        preparedData.sort((a, b) => a.category); 
    }

    return preparedData;
}

function drawHistogram(data, groupBy, metrics, barCount) {
    const svg = d3.select("#histogram");
    svg.selectAll("*").remove();
    
    const margin = { top: 40, right: 30, bottom: 100, left: 60 };
    const width = 1200;
    const height = 500;

    svg.attr("width", width)
       .attr("height", height);

    const preparedData = prepareHistogramData(data, groupBy, metrics, barCount);
    
    const x = d3.scaleBand()
        .domain(preparedData.map(d => d.category))
        .range([0, width - margin.left - margin.right])
        .padding(0.2);

    const y = d3.scaleLinear()
        .domain([0, d3.max(preparedData, d => metrics.includes("max") ? d.max : d.min) * 1.1])
        .range([height - margin.bottom, 0]);

    const g = svg.append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

    const isYear = groupBy === "Год";
    const axisX = isYear 
        ? d3.axisBottom(x).tickFormat(d3.format("d"))
        : d3.axisBottom(x);

    g.append("g")
        .attr("transform", `translate(0,${height - margin.bottom})`)
        .call(axisX)
        .selectAll("text")
        .style("text-anchor", "end")
        .attr("dx", "-.8em")
        .attr("dy", ".15em")
        .attr("transform", "rotate(-45)");

    g.append("g")
        .call(d3.axisLeft(y));

    svg.append("text")
        .attr("transform", `translate(${width/2},${height - margin.bottom + 60})`)
        .style("text-anchor", "middle")
        .text(groupBy);

    svg.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", margin.left / 2 - 10)
        .attr("x", -(height - margin.bottom) / 2)
        .style("text-anchor", "middle");

    if (metrics.includes("max")) {
        g.selectAll(".bar-max")
            .data(preparedData)
            .enter().append("rect")
            .attr("class", "bar-max")
            .attr("x", d => x(d.category))
            .attr("y", d => y(d.max))
            .attr("width", x.bandwidth() / 2)
            .attr("height", d => height - margin.bottom - y(d.max))
            .attr("fill", "#FF6384");
    }

    if (metrics.includes("min")) {
        g.selectAll(".bar-min")
            .data(preparedData)
            .enter().append("rect")
            .attr("class", "bar-min")
            .attr("x", d => x(d.category) + x.bandwidth() / 2)
            .attr("width", x.bandwidth() / 2)
            .attr("y", d => y(d.min))
            .attr("height", d => height - margin.bottom - y(d.min))
            .attr("fill", "#36A2EB");
    }
}