const calculatorDiv=document.querySelector('.calculator');
const keysDiv=calculatorDiv.querySelector('.calculator__keys');
const calculatorDisplay=calculatorDiv.querySelector('.calculator__display');
keysDiv.addEventListener("click",function(event){
    if(!event.target.closest('button'))return;
    const key=event.target;

    const type = key.dataset.type;
    let previousKeyType=calculatorDiv.dataset.previousKeyType;
    /*
     # alternatively
        const Type = key.getAttribute("data-type");
        let PreviousKeyType=calculatorDiv.getAttribute("data-previous-key-type");

        console.log(Type,PreviousKeyType);
    */
   console.log(key,type,previousKeyType);
    renderOnCalculatorDisplay(key,previousKeyType,type);
})
function renderOnCalculatorDisplay(pressedButton,previousKeyType,currentKeyType){
    if(currentKeyType === 'number'){
        if(calculatorDiv.dataset.firstNumber && calculatorDiv.dataset.operator && !calculatorDiv.dataset.secondNumber){
            calculatorDiv.dataset.secondNumber=pressedButton.textContent;
        }
        if(calculatorDiv.dataset.firstNumber && calculatorDiv.dataset.operator && calculatorDiv.dataset.secondNumber && previousKeyType === 'number'){
            console.log('from tested block');
            calculatorDisplay.textContent += pressedButton.textContent;
            calculatorDiv.dataset.secondNumber = calculatorDisplay.textContent;
            return
        }
        if(calculatorDiv.dataset.firstNumber && calculatorDiv.dataset.operator && calculatorDiv.dataset.secondNumber){
            calculatorDiv.dataset.secondNumber=pressedButton.textContent;
        }
        if(calculatorDisplay.textContent === '0' || previousKeyType === 'operator'){
            calculatorDisplay.textContent = pressedButton.textContent;
        } else{
            calculatorDisplay.textContent += pressedButton.textContent;
        }
    }
    if(currentKeyType === 'operator'){
        const allOperatorKeys = keysDiv.querySelectorAll('[data-type="operator"]');
        allOperatorKeys.forEach(element => {
            element.dataset.state="";
        });
        pressedButton.dataset.state='selected';
        if(calculatorDiv.dataset.firstNumber && calculatorDiv.dataset.secondNumber && calculatorDiv.dataset.operator){
           let preliminaryCalculation = performCalculation(calculatorDiv.dataset.firstNumber, calculatorDiv.dataset.operator,calculatorDiv.dataset.secondNumber);

           calculatorDisplay.textContent = preliminaryCalculation;

           calculatorDiv.dataset.firstNumber = preliminaryCalculation;
           calculatorDiv.dataset.secondNumber = '';
           calculatorDiv.dataset.operator = pressedButton.dataset.operatorType;
           calculatorDiv.dataset.previousKeyType=currentKeyType;
           return;

        }
        calculatorDiv.dataset.operator = pressedButton.dataset.operatorType;
        calculatorDiv.dataset.firstNumber = calculatorDisplay.textContent;

    }
    if(currentKeyType === 'equal'){
        //perform a calculation
        const operator = calculatorDiv.dataset.operator;
        const firstNumber = calculatorDiv.dataset.firstNumber;
        const secondNumber = calculatorDisplay.textContent;

        if (firstNumber && operator) {
            const result = performCalculation(firstNumber, operator, secondNumber);
            calculatorDisplay.textContent = result;
            calculatorDiv.dataset.firstNumber = result; // Save result as first number
            calculatorDiv.dataset.secondNumber = '';
            calculatorDiv.dataset.operator = '';
        }

    }
    if(currentKeyType === 'clear'){
        calculatorDiv.dataset.firstNumber = '';
        calculatorDiv.dataset.secondNumber = '';
        calculatorDiv.dataset.operator = '';
        calculatorDiv.dataset.previousKeyType = '';
        calculatorDisplay.textContent = '0';
    }
    calculatorDiv.dataset.previousKeyType=currentKeyType;
}
function performCalculation(firstNumber,operator,secondNumber){
    let first_Number = convertStringToNumber(firstNumber);
    let second_Number = convertStringToNumber(secondNumber);
    
    if(operator === '-') return first_Number - second_Number;
    if(operator === '+') return first_Number + second_Number;
    if(operator === '*') return first_Number * second_Number;
    if(operator === '/') return first_Number / second_Number;
 }
function convertStringToNumber(number){
    if(number.includes('.')){
        return parseFloat(number);
    }else{
        return parseInt(number);
    }
}