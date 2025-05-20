document.addEventListener("DOMContentLoaded", function() {
    const width = 600;
    const height = 600;      
    const svg = d3.select("svg")
        .attr("width", width)
        .attr("height", height);
    const visiblePathCheckbox = document.getElementById('IsCheckPathVisible');
    
    function calculateRotation(start, end) {
        const diff = end - start;
        return diff > 180 ? start + 180 : end;
    }

    function adjustRotation(angle) {
        angle = parseFloat(angle) || 0;
        return ((angle % 360) + 360) % 360;
    }

    let draw = (dataForm) => {
        const svg = d3.select("svg");
        svg.selectAll('*').remove();
        let pict = drawSmile(svg);
        pict.attr("transform", `translate(${dataForm.cx.value}, ${dataForm.cy.value}) rotate(${adjustRotation(dataForm.rotate.value)}) scale(${dataForm.cxs.value}, ${dataForm.cys.value})`);
    };

    const DrawBut = document.getElementById('IsDraw');
    DrawBut.addEventListener('click', () => draw(document.getElementById('setting')));

    const DeleteBut = document.getElementById('IsDelete');
    DeleteBut.addEventListener('click', () => svg.selectAll('*').remove());

    document.getElementById('animateBtn').addEventListener('click', function() {
        const form = document.getElementById('setting');
        const svg = d3.select("svg");
        svg.selectAll('*').remove();
        let pict = drawSmile(svg);
        pict.attr("transform", `translate(${form.cx.value}, ${form.cy.value}) rotate(${adjustRotation(form.rotate.value)}) scale(${form.cxs.value}, ${form.cys.value})`);

        const easeType = document.getElementById('animationType').value;
        let easeFunc = d3.easeLinear;
        switch(easeType) {
            case 'ease': easeFunc = d3.easeQuadInOut; break;
            case 'ease-in': easeFunc = d3.easeQuadIn; break;
            case 'ease-out': easeFunc = d3.easeQuadOut; break;
            case 'ease-in-out': easeFunc = d3.easeQuadInOut; break;
        }

        if (!visiblePathCheckbox.checked) {
            const startRotate = adjustRotation(parseFloat(form.rotate.value));
            let endRotate = adjustRotation(parseFloat(form.rotateToValue.value));
            const duration = parseFloat(form.speed.value);

            const midRotate = calculateRotation(startRotate, endRotate);
            const isTwoPhases = (endRotate - startRotate) > 180;

            pict.transition()
                .duration(isTwoPhases ? duration / 2 : duration)
                .ease(easeFunc)
                .attrTween("transform", function() {
                    return (t) => {
                        const currentRotate = isTwoPhases ? startRotate + (midRotate - startRotate) * t : startRotate + (endRotate - startRotate) * t;
                        const currentX = parseFloat(form.cx.value) + (parseFloat(form.cxToValue.value) - parseFloat(form.cx.value)) * t;
                        const currentY = parseFloat(form.cy.value) + (parseFloat(form.cyToValue.value) - parseFloat(form.cy.value)) * t;
                        const currentScaleX = parseFloat(form.cxs.value) + (parseFloat(form.cxsToValue.value) - parseFloat(form.cxs.value)) * t;
                        const currentScaleY = parseFloat(form.cys.value) + (parseFloat(form.cysToValue.value) - parseFloat(form.cys.value)) * t;
                        return `translate(${currentX}, ${currentY}) rotate(${currentRotate}) scale(${currentScaleX}, ${currentScaleY})`;
                    };
                })
                .end()
                .then(() => {
                    if (isTwoPhases) {
                        pict.transition()
                            .duration(duration / 2)
                            .ease(easeFunc)
                            .attrTween("transform", function() {
                                return (t) => {
                                    const currentRotate = midRotate + (endRotate - midRotate) * t;
                                    const currentX = parseFloat(form.cxToValue.value);
                                    const currentY = parseFloat(form.cyToValue.value);
                                    const currentScaleX = parseFloat(form.cxsToValue.value);
                                    const currentScaleY = parseFloat(form.cysToValue.value);
                                    return `translate(${currentX}, ${currentY}) rotate(${currentRotate}) scale(${currentScaleX}, ${currentScaleY})`;
                                };
                            });
                    }
                });
        } else {
            const path = createPathPentagram();
            path//.attr('stroke', 'gray')
                //.attr('stroke-dasharray', '5,5')
                .attr('class', 'path-animation');

            const startRotate = adjustRotation(parseFloat(form.rotate.value));
            let endRotate = adjustRotation(parseFloat(form.rotateToValue.value));
            if (endRotate < startRotate) endRotate += 360;

            const startScaleX = parseFloat(form.cxs.value);
            const endScaleX = parseFloat(form.cxsToValue.value);
            const startScaleY = parseFloat(form.cys.value);
            const endScaleY = parseFloat(form.cysToValue.value);

            pict.transition()
                .duration(parseFloat(form.speed.value))
                .ease(easeFunc)
                .attrTween("transform", function() {
                    const length = path.node().getTotalLength();
                    return (t) => {
                        const {x, y} = path.node().getPointAtLength(t * length);
                        const currentRotate = startRotate + (endRotate - startRotate) * t;
                        const currentScaleX = startScaleX + (endScaleX - startScaleX) * t;
                        const currentScaleY = startScaleY + (endScaleY - startScaleY) * t;
                        return `translate(${x}, ${y}) rotate(${currentRotate % 360}) scale(${currentScaleX}, ${currentScaleY})`;
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
            toFields.forEach(field => document.getElementById(`${field}_finish`).style.display = 'inline');
        } else {
            animationControls.style.display = 'none';
            toFields.forEach(field => document.getElementById(`${field}_finish`).style.display = 'none');
        }
    });
});