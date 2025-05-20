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
function createPathPentagram() {
    const svg = d3.selectAll("svg");
    const width = +svg.attr("width");
    const height = +svg.attr("height");
    const cx = width / 2; 
    const cy = height / 2;
    const r = Math.min(width, height) / 3;

    const angle_offset = Math.PI / 2; 
    const angles = [0, 2, 4, 1, 3].map(i => angle_offset + 2 * Math.PI * i / 5);
    const points = angles.map(angle => ({
        x: cx + r * Math.cos(angle),
        y: cy + r * Math.sin(angle)
    }));

    let path = `M ${points[0].x} ${points[0].y}`; 

    const controlOffset = r * -0.2; 

    for (let i = 1; i < 5; i++) {
        const p0 = points[i - 1];
        const p1 = points[i];

        const cp1x = p0.x + (p1.x - p0.x) / 3 - controlOffset * Math.sin(angles[i - 1]);
        const cp1y = p0.y + (p1.y - p0.y) / 3 + controlOffset * Math.cos(angles[i - 1]);
        const cp2x = p1.x - (p1.x - p0.x) / 3 + controlOffset * Math.sin(angles[i]);
        const cp2y = p1.y - (p1.y - p0.y) / 3 - controlOffset * Math.cos(angles[i]);

        path += ` C ${cp1x},${cp1y} ${cp2x},${cp2y} ${p1.x},${p1.y}`;
    }
    const p0 = points[4];
    const p1 = points[0];
    const cp1x = p0.x + (p1.x - p0.x) / 3 - controlOffset * Math.sin(angles[4]);
    const cp1y = p0.y + (p1.y - p0.y) / 3 + controlOffset * Math.cos(angles[4]);
    const cp2x = p1.x - (p1.x - p0.x) / 3 + controlOffset * Math.sin(angles[0]);
    const cp2y = p1.y - (p1.y - p0.y) / 3 - controlOffset * Math.cos(angles[0]);
    path += ` C ${cp1x},${cp1y} ${cp2x},${cp2y} ${p1.x},${p1.y}`;
    svg.selectAll("path.path-animation").remove();
    const pathElem = svg.append('path')
        .attr('d', path)
        .attr('fill', 'none')
        .attr('stroke', 'none')
        //.attr('stroke-dasharray', '5,5')
        .attr('class', 'path-animation');

    return pathElem;
}
let drawPath = (typePath) => {
    const dataPoints = (typePath == 0)? createPathG() : createPathCircle();

    const line = d3.line()
        .x((d) => d.x)
        .y((d) => d.y);
        
    const svg = d3.selectAll("svg")

    svg.selectAll("path.path-animation").remove();
    
    const path = svg.append('path')
        .attr('d', line(dataPoints))
        .attr('fill', 'none');
        
    return path;    
}