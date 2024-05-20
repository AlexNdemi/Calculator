const calculatorDiv = document.querySelector('.calculator');
const keysDiv = calculatorDiv.querySelector('.calculator__keys');
const calculatorDisplay = calculatorDiv.querySelector('.calculator__display');

keysDiv.addEventListener("click", function(event) {
    if (!event.target.closest('button')) return;
    const key = event.target;

    const type = key.dataset.type;
    let previousKeyType = calculatorDiv.dataset.previousKeyType;
    
    console.log(key, type, previousKeyType);
    renderOnCalculatorDisplay(key, previousKeyType, type);
});

function renderOnCalculatorDisplay(pressedButton, previousKeyType, currentKeyType) {
    const content = pressedButton.textContent;

    if (currentKeyType === 'number') {
        if (previousKeyType === 'operator' || calculatorDisplay.textContent === '0') {
            calculatorDisplay.textContent = content;
        } else {
            calculatorDisplay.textContent += content;
        }

        if (calculatorDiv.dataset.operator) {
            calculatorDiv.dataset.secondNumber = calculatorDisplay.textContent;
        } else {
            calculatorDiv.dataset.firstNumber = calculatorDisplay.textContent;
        }
    }

    if (currentKeyType === 'operator') {
        deselectAllOperatorButton();
        pressedButton.dataset.state='selected';

        if (calculatorDiv.dataset.firstNumber && calculatorDiv.dataset.secondNumber && calculatorDiv.dataset.operator) {
            const result = performCalculation(
                calculatorDiv.dataset.firstNumber,
                calculatorDiv.dataset.operator,
                calculatorDiv.dataset.secondNumber
            );
            calculatorDisplay.textContent = result;
            calculatorDiv.dataset.firstNumber = result;
            calculatorDiv.dataset.secondNumber = '';
        }

        calculatorDiv.dataset.operator = pressedButton.dataset.operatorType;
    }

    if (currentKeyType === 'equal') {
        const operator = calculatorDiv.dataset.operator;
        const firstNumber = calculatorDiv.dataset.firstNumber;
        const secondNumber = calculatorDisplay.textContent;

        if (firstNumber && operator) {
            const result = performCalculation(firstNumber, operator, secondNumber);
            calculatorDisplay.textContent = result;
            calculatorDiv.dataset.firstNumber = result;
            calculatorDiv.dataset.secondNumber = '';
            calculatorDiv.dataset.operator = '';

            deselectAllOperatorButton();
        }
    }
    if(currentKeyType === 'clear'){
        deselectAllOperatorButton();
        calculatorDiv.dataset.firstNumber = '';
        calculatorDiv.dataset.secondNumber = '';
        calculatorDiv.dataset.operator = '';
        calculatorDiv.dataset.previousKeyType = '';
        calculatorDisplay.textContent = '0';
    }

    calculatorDiv.dataset.previousKeyType = currentKeyType;
}

function performCalculation(firstNumber, operator, secondNumber) {
    const first_Num = convertStringToNumber(firstNumber);
    const second_Num = convertStringToNumber(secondNumber);

    if (operator === '-') return first_Num - second_Num;
    if (operator === '+') return first_Num + second_Num;
    if (operator === '*') return first_Num * second_Num;
    if (operator === '/') return first_Num / second_Num;
}

function convertStringToNumber(number) {
    return number.includes('.') ? parseFloat(number) : parseInt(number);
}
function deselectAllOperatorButton(){
    const allOperatorKeys = keysDiv.querySelectorAll('[data-type="operator"]');
    allOperatorKeys.forEach(element => {
        element.dataset.state="";
    });
}
