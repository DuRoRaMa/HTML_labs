document.addEventListener("DOMContentLoaded", function() {
    const width = 600;
    const height = 600;      
    const svg = d3.select("svg")
       .attr("width", width)
       .attr("height", height);
    const visiblePathCheckbox = document.getElementById('IsCheckPathVisible');
    
    

    let draw = (dataForm) => {
        

        const svg = d3.select("svg");
        let pict = drawSmile(svg);
        pict.attr("transform", `translate(${dataForm.cx.value}, ${dataForm.cy.value}) rotate(${dataForm.rotate.value}) scale(${dataForm.cxs.value}, ${dataForm.cys.value})`);
    }

    const DrawBut = document.getElementById('IsDraw');
    DrawBut.addEventListener('click', function() {
        draw(document.getElementById('setting'));
    });

    const DeleteBut = document.getElementById('IsDelete');
    DeleteBut.addEventListener('click', function() {
        svg.selectAll('*').remove();
    });

    document.getElementById('animateBtn').addEventListener('click', function() {
        const form = document.getElementById('setting');
        const svg = d3.select("svg");
        // Создаем новый смайл для анимации
        let pict = drawSmile(svg);
        // Устанавливаем начальное положение и масштаб
        pict.attr("transform", `translate(${form.cx.value}, ${form.cy.value}) rotate(${form.rotate.value}) scale(${form.cxs.value}, ${form.cys.value})`);
        
        const easeType = document.getElementById('animationType').value;
        
        let easeFunc;
        switch(easeType) {
            case 'linear': easeFunc = d3.easeLinear; break;
            case 'ease': easeFunc = d3.easeQuadInOut; break;
            case 'ease-in': easeFunc = d3.easeQuadIn; break;
            case 'ease-out': easeFunc = d3.easeQuadOut; break;
            case 'ease-in-out': easeFunc = d3.easeQuadInOut; break;
            default: easeFunc = d3.easeLinear;
        }
    
        if (!visiblePathCheckbox.checked) {
            pict.transition()
                .duration(2000)
                .ease(easeFunc)
                .attr("transform", `translate(${form.cxToValue.value}, ${form.cyToValue.value}) rotate(${form.rotateToValue.value}) scale(${form.cxsToValue.value}, ${form.cysToValue.value})`);
        } else {
            const pathType = document.getElementById('PathSelect').value;
            const path = drawPath(pathType)
               // .attr('stroke', 'gray')  // Добавляем стиль для визуализации пути
                //.attr('stroke-dasharray', '5,5')
               // .attr('class', 'path-animation');
            
            // Начальные и конечные значения для анимации
            const startRotate = parseFloat(form.rotate.value);
            const endRotate = parseFloat(form.rotateToValue.value);
            const startScaleX = parseFloat(form.cxs.value);
            const endScaleX = parseFloat(form.cxsToValue.value);
            const startScaleY = parseFloat(form.cys.value);
            const endScaleY = parseFloat(form.cysToValue.value);
            
            pict.transition()
                .duration(2000)
                .ease(easeFunc)
                .attrTween("transform", function() {
                    const length = path.node().getTotalLength();
                    return function(t) {
                        const {x, y} = path.node().getPointAtLength(t * length);
                        // Интерполяция параметров
                        const currentRotate = startRotate + (endRotate - startRotate) * t;
                        const currentScaleX = startScaleX + (endScaleX - startScaleX) * t;
                        const currentScaleY = startScaleY + (endScaleY - startScaleY) * t;
                        return `translate(${x}, ${y}) rotate(${form.rotateToValue.value}) scale(${form.cxsToValue.value}, ${form.cysToValue.value})`;
                    };
                });
        }
    });

    

    const visibleCheckbox = document.getElementById('IsCheckVisible');
    const hiddenCheckbox = document.getElementById('IsCheck');
    const hiddenPathCheckbox = document.getElementById('animationPathType');
    const hiddenCoordinates = document.getElementById('Coordinate');
    const hiddenMash = document.getElementById('mash');
    const hiddenRot = document.getElementById('rot');
    visiblePathCheckbox.addEventListener('change', function() {
        if (this.checked) {
            hiddenPathCheckbox.style.display = 'inline';
            hiddenCoordinates.style.display = 'none';
            hiddenMash.style.display = 'none';
            hiddenRot.style.display = 'none';
        } else {
            hiddenPathCheckbox.style.display = 'none';
            hiddenCoordinates.style.display = 'inline';
            hiddenMash.style.display = 'inline';
            hiddenRot.style.display = 'inline';
        }
    });

    visibleCheckbox.addEventListener('change', function() {
        hiddenCheckbox.checked = this.checked;
        const animationControls = document.getElementById('animationControls');
        const toFields = ['cx', 'cy', 'cxs', 'cys', 'rotate'];
        
        if (this.checked) {
            animationControls.style.display = 'block';
            toFields.forEach(field => {
                document.getElementById(`${field}_finish`).style.display = 'inline';
            });
        } else {
            animationControls.style.display = 'none';
            toFields.forEach(field => {
                document.getElementById(`${field}_finish`).style.display = 'none';
            });
        }
    });
});