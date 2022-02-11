// document.addEventListener('DOMContentLoaded', () => {

    class Calculator{
        constructor(previousInputTextElement, currentInputTextElement){
            this.previousInputTextElement = previousInputTextElement;
            this.currentInputTextElement = currentInputTextElement;
            this.clear()
        }

        clear(){
            this.currentOperation = '';
            this.previousOperation = '';
            this.operation = undefined;
        }

        delete(){
            this.currentOperation = this.currentOperation.toString().slice(0, -1);
        }

        //Make - work to show negative sign before inputting text
        negative(){
                this.currentOperation = this.currentOperation * -1;
        }

        appendNumber(number){
            if (number === '.' && this.currentOperation.includes('.')) return
            this.currentOperation = this.currentOperation.toString() + number.toString();

        }

        chooseOperator(operation){
            if (this.currentOperation === '') return;
            if (this.previousOperation !== '') {
                this.compute();
            }
            this.operation = operation;
            this.previousOperation = this.currentOperation;
            this.currentOperation = '';
        }

        compute(){
            let computation;
            const prev = parseFloat(this.previousOperation);
            const current = parseFloat(this.currentOperation);
            if (isNaN(prev) || isNaN(current)) return;
            switch (this.operation) {
                case '+': 
                    computation = prev + current;
                    break;
                case '-':
                    computation = prev - current;
                    break;
                case 'x': 
                    computation = prev * current;
                    break;
                case '÷':
                    computation = prev / current;
                    break;
                default:
                    return;
            }
            this.currentOperation = computation;
            this.operation = undefined;
            this.previousOperation = '';
        }

        getDisplayNumber(number) {
            const stringNumber = number.toString();
            const integerDigits = parseFloat(stringNumber.split('.')[0]);
            const decimalDigits = stringNumber.split('.')[1];
            let integerDisplay
            if (isNaN(integerDigits)) {
                integerDisplay = '';
            } else {
                integerDisplay = integerDigits.toLocaleString('en', {
                maximumFractionDigits: 0 })
            }
            if (decimalDigits != null){
                return `${integerDisplay}.${decimalDigits}`
            } else {
                return integerDisplay;
            }
        }

        updateDisplay(){
            this.currentInputTextElement.innerText = 
                this.getDisplayNumber(this.currentOperation);
            if (this.operation != null) {
                this.previousInputTextElement.innerText = 
                `${this.getDisplayNumber(this.previousOperation)} ${this.operation} ${this.getDisplayNumber(this.currentOperation)}`
            } else {
                this.previousInputTextElement.innerText = '';
            }
        }
    }

    const numberButton = document.querySelectorAll('[data-number'); const operatorButton = document.querySelectorAll('[data-operation]');
    const acButton = document.querySelector('[data-allclear]');
    const delButton = document.querySelector('[data-delete]');
    const negativeButton = document.querySelector('[data-negative]');
    const equalsButton = document.querySelector('[data-equals]');
    const previousInputTextElement = document.querySelector('[data-previous]');
    const currentInputTextElement = document.querySelector('[data-current]');

    const calculator = new Calculator(previousInputTextElement, currentInputTextElement);
    
    numberButton.forEach(button => {
        button.addEventListener('click', () =>{
            calculator.appendNumber(button.innerText);
            calculator.updateDisplay();
        })
    })

    operatorButton.forEach(button => {
        button.addEventListener('click', () => {
            calculator.chooseOperator(button.innerText);
            calculator.updateDisplay();
        })
    })

    equalsButton.addEventListener('click', button => {
        calculator.compute();
        calculator.updateDisplay();
    })

    acButton.addEventListener('click', button => {
        calculator.clear();
        calculator.updateDisplay();
    })
    delButton.addEventListener('click', button => {
        calculator.delete();
        calculator.updateDisplay();
    })
    negativeButton.addEventListener('click', button => {
        calculator.negative();
        calculator.updateDisplay();
    })

// })
