document.addEventListener('DOMContentLoaded', function() {

    const inputTypeSide = document.getElementById('input-type-side');
    const inputTypeHeight = document.getElementById('input-type-height');
    const showBtn = document.getElementById('show-btn');
    const figureImg = document.getElementById('figure-img');
    const baseAInput = document.getElementById('base-a');
    const baseBInput = document.getElementById('base-b');
    const sideCInput = document.getElementById('side-c');
    const heightInput = document.getElementById('height');
    const sideCGroup = document.getElementById('side-c-group');
    const heightGroup = document.getElementById('height-group');
    const calcHeight = document.getElementById('calc-height');
    const calcAngles = document.getElementById('calc-angles');
    const calcDiagonals = document.getElementById('calc-diagonals');
    const calculateBtn = document.getElementById('calculate-btn');
    const clearBtn = document.getElementById('clear-btn');
    const resultsDiv = document.getElementById('results');
    const images = {
        side: 'трапеция1.png',
        height: 'трапеция2.png'
    };
    showBtn.addEventListener('click', updateUI);
    updateUI();
    function updateUI() {
        if (inputTypeSide.checked) {
            figureImg.src = images.side;
            sideCGroup.classList.remove('hidden');
            heightGroup.classList.add('hidden');
        } else {
            figureImg.src = images.height;
            sideCGroup.classList.add('hidden');
            heightGroup.classList.remove('hidden');
            }
        }
		
    clearBtn.addEventListener('click', clearInputs);        
    function clearInputs() {
        baseAInput.value = '';
        baseBInput.value = '';
        sideCInput.value = '';
        heightInput.value = '';
        clearErrors();
        resultsDiv.innerHTML = '';
    }
            
    function clearErrors() {
        document.querySelectorAll('input').forEach(el => el.classList.remove('error-input'));
        }
            
    function validateInputs() {
        let isValid = true;
        clearErrors();
        if (!baseAInput.value || isNaN(baseAInput.value) || parseFloat(baseAInput.value) <= 0) {
            baseAInput.classList.add('error-input');
            isValid = false;
        }
                
        if (!baseBInput.value || isNaN(baseBInput.value) || parseFloat(baseBInput.value) <= 0) {
            baseBInput.classList.add('error-input');
            isValid = false;
        }

        if (inputTypeSide.checked) {
            if (!sideCInput.value || isNaN(sideCInput.value) || parseFloat(sideCInput.value) <= 0) {
                sideCInput.classList.add('error-input');
                isValid = false;
            }
        } else if (!heightInput.value || isNaN(heightInput.value)||parseFloat(heightInput.value) <= 0) {
                heightInput.classList.add('error-input');
                isValid = false;
            }
    return isValid;
    }
	baseAInput.addEventListener	('mouseover',validateInputs);
	baseBInput.addEventListener('mouseover',validateInputs);
	sideCInput.addEventListener('mouseover',validateInputs);
	heightInput.addEventListener('mouseover',validateInputs);
	baseAInput.addEventListener	('mouseout',validateInputs);
	baseBInput.addEventListener('mouseout',validateInputs);
	sideCInput.addEventListener('mouseout',validateInputs);
	heightInput.addEventListener('mouseout',validateInputs);
	
	function erorr(){
		if (!(calcHeight.checked) && !(calcAngles.checked) && !(calcDiagonals.checked)){
			calcHeight.parentElement.classList.add('result-err');
			calcAngles.parentElement.classList.add('result-err');
			calcDiagonals.parentElement.classList.add('result-err');
		}else{
			calcHeight.parentElement.classList.remove('result-err');
			calcAngles.parentElement.classList.remove('result-err');
			calcDiagonals.parentElement.classList.remove('result-err');
		}
	}
	calcDiagonals.addEventListener('click',erorr);
	calcAngles.addEventListener('click',erorr);
	calcHeight.addEventListener('click',erorr);
	
    calculateBtn.addEventListener('click', calculate);      
    function calculate() {
        if (!validateInputs()) return;
        let a = parseFloat(baseAInput.value);
        let b = parseFloat(baseBInput.value);
        let c, h;
        if (inputTypeSide.checked) {
            c = parseFloat(sideCInput.value);
            let leg = Math.abs(a - b) / 2;
            h = Math.sqrt(c * c - leg * leg);
            if (isNaN(h)) {
                showError("некоректные данные трапеции");
                    return;
                }
            } else {
                    h = parseFloat(heightInput.value);
                    const leg = Math.abs(a - b) / 2;
                    c = Math.sqrt(h * h + leg * leg);
                }
                let leg = Math.abs(a - b) / 2;
                let angleRad = Math.atan2(h, leg);
                let angleDeg = angleRad * 180 / Math.PI;
                let angles = {
                    lower: angleDeg.toFixed(2),
                    upper: (180 - angleDeg).toFixed(2)
                };
                let diagonal = Math.sqrt(a * a + b * b - 2 * a * b * Math.cos(angleRad));
				if (!(calcHeight.checked) && !(calcAngles.checked) && !(calcDiagonals.checked)){
					
				}
				else{
                let resultsHTML = '<div class="results-title">Результаты:</div>';
                if (calcHeight.checked) {
                    resultsHTML += `
                        <div class="result-item">
                            <strong>Высота:</strong> ${h.toFixed(4)}
                        </div>
                    `;
                }
                if (calcAngles.checked) {
                    resultsHTML += `
                        <div class="result-item">
                            <strong>Углы:</strong>
                            <ul>
                                <li>Нижний угол: ${angles.lower}°</li>
                                <li>Верхний угол: ${angles.upper}°</li>
                            </ul>
                        </div>
                    `;
                }
                if (calcDiagonals.checked) {
                    resultsHTML += `
                        <div class="result-item">
                            <strong>Диагональ:</strong> ${diagonal.toFixed(4)}
                        </div>
                    `;
                }
                if (inputTypeSide.checked && calcHeight.checked) {
                    resultsHTML += `
                        <div class="result-item">
                            <strong>Вычисленная высота:</strong> ${h.toFixed(4)}
                        </div>
                    `;
                } else if (inputTypeHeight.checked && calcHeight.checked) {
                    resultsHTML += `
                        <div class="result-item">
                            <strong>Боковая сторона:</strong> ${c.toFixed(4)}
                        </div>
                    `;
                }
                
                resultsDiv.innerHTML = resultsHTML;
	}}
            
            function showError(message) {
                resultsDiv.innerHTML = `
                    <div class="result-item error">
                        ${message}
                    </div>
                `;
            }
        });