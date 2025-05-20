function createPathG() {
    const svg = d3.selectAll("svg")
    const width = svg.attr("width")
    const height = svg.attr("height")

    let data = [];
    const padding = 100;
    let posX = padding;
    let posY = height - padding;
    const h = 5;
    
    while (posY > padding) {
        data.push( {x: posX, y: posY});
        posY -= h;
    }
    
    while (posX < width - padding) {
        data.push( {x: posX, y: posY});
        posX += h;
    }
    return data
}

function createPathCircle() {
    const svg = d3.selectAll("svg")
    const width = svg.attr("width")
    const height = svg.attr("height")
    let data = [];
    
    for (let t = Math.PI ; t <= Math.PI * 3; t += 0.1) {
        data.push(
            {x: width / 2 + width / 3 * Math.sin(t),
             y: height / 2 + height / 3 * Math.cos(t)}
        );
    }
    return data
}

let drawPath = (typePath) => {
    const dataPoints = (typePath == 0)? createPathG() : createPathCircle();

    const line = d3.line()
        .x((d) => d.x)
        .y((d) => d.y);
        
    const svg = d3.selectAll("svg")
    // Удаляем старый путь, если он есть
    svg.selectAll("path.path-animation").remove();
    
    const path = svg.append('path')
        .attr('d', line(dataPoints))
        .attr('fill', 'none');
        
    return path;    
}