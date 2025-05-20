// создаем изображение лица свинки из 6 примитивов
// рисуем его относительно точки (0, 0)
function drawSmile(svg) {  // Добавлен параметр svg
    let pig = svg.append("g")
        .style("stroke", "brown")
        .style("stroke-width", 2)
        .style("fill", "brown");

    // голова
    pig.append("circle")
        .attr("cx", 0)
        .attr("cy", 0)
        .attr("r", 50)
        .style("fill", "yellow");

    // пятачок
    pig.append("circle")
        .attr("cx", 0)
        .attr("cy", 10)
        .attr("r", 15)
        .style("fill", "pink");

    // левый глаз
    pig.append("circle")
        .attr("cx", -20)
        .attr("cy", -10)
        .attr("r", 5)
        .style("fill", "black");

    // правый глаз
    pig.append("circle")
        .attr("cx", 20)
        .attr("cy", -10)
        .attr("r", 5)
        .style("fill", "black");

    // левое ухо
    pig.append("ellipse")
        .attr("cx", -30)
        .attr("cy", -30)
        .attr("rx", 15)
        .attr("ry", 25)
        .style("fill", "pink");

    // правое ухо
    pig.append("ellipse")
        .attr("cx", 30)
        .attr("cy", -30)
        .attr("rx", 15)
        .attr("ry", 25)
        .style("fill", "pink");

    return pig;
}