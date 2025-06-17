// javascript/chart.js
function createArrGraph(data, key, metrics) {
    if (!Array.isArray(data)) {
        console.warn("createArrGraph: data is not an array", data);
        return [];
    }

    const groupObj = d3.group(data, d => d[key]);
    let arrGraph = [];
    const isYear = key === "Год релиза";
    
    const existingYears = isYear ? [...new Set(data.map(d => d['Год релиза']))] : [];

    for (const [k, values] of groupObj) {
        const sales = values.map(d => d['Количество проданных копий']);
        const label = isYear ? parseInt(k) : k;
        
        if (isYear && (isNaN(label) || !existingYears.includes(label))) {
            continue;
        }

        const entry = { labelX: label };
        if (metrics.includes("max")) {
            entry.max = d3.max(sales);
        }
        if (metrics.includes("min")) {
            entry.min = d3.min(sales);
        }
        arrGraph.push(entry);
    }

    if (isYear) {
        arrGraph.sort((a, b) => a.labelX - b.labelX);
    } else {
        arrGraph.sort((a, b) => a.labelX);
    }

    return arrGraph;
}

function drawGraph(data, key = "Жанр", metrics = ["max"], chartType = "scatter") {
    if (!Array.isArray(data)) {
        console.warn("drawGraph: data is not an array", data);
        d3.select("#scatter").selectAll("*").remove();
        d3.select("#histogram").selectAll("*").remove();
        d3.select("#line").selectAll("*").remove();
        return;
    }

    const arrGraph = createArrGraph(data, key, metrics);
    
    let svg = d3.select(chartType === "scatter" ? "#scatter" : chartType === "histogram" ? "#histogram" : "#line");
    svg.selectAll('*').remove();

    if (arrGraph.length === 0) {
        console.warn("drawGraph: no data to render");
        return;
    }

    const width = 1000;
    const height = 300;
    const margin = { top: 40, right: 30, bottom: 100, left: 60 };

    svg.attr("width", width)
       .attr("height", height);

    if (chartType === "scatter") {
        drawScatter(svg, arrGraph, key, metrics, { width, height, marginX: margin.left, marginY: margin.top });
    } else if (chartType === "histogram") {
        drawHistogram(svg, arrGraph, key, metrics, { width, height, marginX: margin.left, marginY: margin.top });
    } else if (chartType === "line") {
        drawLine(svg, arrGraph, key, metrics, { width, height, marginX: margin.left, marginY: margin.top });
    }
}

function createAxis(svg, data, attr_area, key) {
    const isYear = key === "Год релиза";
    const xDomain = data.map(d => d.labelX);

    const values = [];
    data.forEach(d => {
        if (d.max !== undefined) values.push(d.max);
        if (d.min !== undefined) values.push(d.min);
    });
    const yExtent = [0, d3.max(values) * 1.1];

    const scaleX = isYear 
        ? d3.scaleBand().domain(xDomain).range([0, attr_area.width - 2 * attr_area.marginX]).padding(0.1)
        : d3.scaleBand().domain(xDomain).range([0, attr_area.width - 2 * attr_area.marginX]).padding(0.1);

    const axisX = d3.axisBottom(scaleX);

    const gX = svg.append("g")
        .attr("transform", `translate(${attr_area.marginX}, ${attr_area.height - attr_area.marginY})`)
        .call(axisX);
    
    gX.selectAll("text")
        .style("text-anchor", "end")
        .attr("dx", "-.8em")
        .attr("dy", ".15em")
        .attr("transform", "rotate(-45)");

    const scaleY = d3.scaleLinear()
        .domain(yExtent)
        .range([attr_area.height - 2 * attr_area.marginY, 0]);

    svg.append("g")
        .attr("transform", `translate(${attr_area.marginX}, ${attr_area.marginY})`)
        .call(d3.axisLeft(scaleY));

    svg.append("text")
        .attr("transform", `translate(${attr_area.width / 2}, ${attr_area.height - 10})`)
        .style("text-anchor", "middle");

    svg.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 10)
        .attr("x", -(attr_area.height - attr_area.marginY) / 2)
        .style("text-anchor", "middle");

    return [scaleX, scaleY];
}

function drawScatter(svg, data, key, metrics, attr_area) {
    const [scaleX, scaleY] = createAxis(svg, data, attr_area, key);
    const isYear = key === "Год релиза";

    data.forEach(d => {
        const baseX = scaleX(d.labelX) + (scaleX.bandwidth ? scaleX.bandwidth() / 2 : 0);
        const offset = 5;

        if (metrics.includes("max") && d.max !== undefined) {
            svg.append("circle")
                .attr("cx", baseX + attr_area.marginX - offset)
                .attr("cy", scaleY(d.max) + attr_area.marginY)
                .attr("r", 4)
                .style("fill", "#FF6384");
        }
        if (metrics.includes("min") && d.min !== undefined) {
            svg.append("circle")
                .attr("cx", baseX + attr_area.marginX + offset)
                .attr("cy", scaleY(d.min) + attr_area.marginY)
                .attr("r", 4)
                .style("fill", "#36A2EB");
        }
    });
}

function drawHistogram(svg, data, key, metrics, attr_area) {
    const [scaleX, scaleY] = createAxis(svg, data, attr_area, key);
    const isYear = key === "Год релиза";

    const g = svg.append("g")
        .attr("transform", `translate(${attr_area.marginX}, ${attr_area.marginY})`);

    const barWidth = scaleX.bandwidth ? scaleX.bandwidth() / metrics.length : (attr_area.width - 2 * attr_area.marginX) / (data.length * metrics.length);

    data.forEach((d, i) => {
        metrics.forEach((metric, j) => {
            if (d[metric] !== undefined) {
                g.append("rect")
                    .attr("class", "bar")
                    .attr("x", scaleX(d.labelX) + j * barWidth)
                    .attr("y", scaleY(d[metric]))
                    .attr("width", barWidth - 2)
                    .attr("height", attr_area.height - 2 * attr_area.marginY - scaleY(d[metric]))
                    .attr("fill", metric === "max" ? "#FF6384" : "#36A2EB");
            }
        });
    });
}

function drawLine(svg, data, key, metrics, attr_area) {
    console.log("Drawing line chart with data:", data, "metrics:", metrics);
    const [scaleX, scaleY] = createAxis(svg, data, attr_area, key);
    const isYear = key === "Год релиза";

    const g = svg.append("g")
        .attr("transform", `translate(${attr_area.marginX}, ${attr_area.marginY})`);

    metrics.forEach(metric => {
        if (data.some(d => d[metric] !== undefined)) {
            const validData = data.filter(d => d[metric] !== undefined);

            const line = d3.line()
                .x(d => scaleX(d.labelX) + scaleX.bandwidth() / 2)
                .y(d => scaleY(d[metric]));

            g.append("path")
                .datum(validData)
                .attr("fill", "none")
                .attr("stroke", metric === "max" ? "#FF6384" : "#36A2EB")
                .attr("stroke-width", 2)
                .attr("d", line);

            g.selectAll(`.dot-${metric}`)
                .data(validData)
                .enter()
                .append("circle")
                .attr("class", `dot-${metric}`)
                .attr("cx", d => scaleX(d.labelX) + scaleX.bandwidth() / 2)
                .attr("cy", d => scaleY(d[metric]))
                .attr("r", 4)
                .attr("fill", metric === "max" ? "#FF6384" : "#36A2EB");
        }
    });
}