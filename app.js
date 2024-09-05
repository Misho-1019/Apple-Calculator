const display = document.getElementById('display');
const clearBtn = document.getElementById('clear-btn')
const operatorButtons = document.querySelectorAll('button[data-action="divide"], button[data-action="multiply"], button[data-action="subtract"], button[data-action="add"]')
const numberButtons = document.querySelectorAll('button:not([data-action="divide"]):not([data-action="multiply"]):not([data-action="subtract"]):not([data-action="add"]):not([data-action="equals"]):not([data-action="clear"])')
const equalButton = document.querySelector('button[data-action="equals"]')
const clearButton = document.querySelector('button[data-action="clear"]')
const signButton = document.querySelector('button[data-action="sign"]')
let currentInput = '0';
let operator = null;
let previousInput = null;
let isResultDisplayed = false;



// signButton.addEventListener('click', ()=> {
//     debugger
//     toggleSign();
//     console.log(currentInput);
    
//     debugger
// })

operatorButtons.forEach(button => {
    button.addEventListener('click', () => {
        operatorButtons.forEach(btn => btn.classList.remove('active'))

        button.classList.add('active')
    })
})

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        operatorButtons.forEach(btn => btn.classList.remove('active'))
    })
})

equalButton.addEventListener('click', ()=> {
    operatorButtons.forEach(btn => btn.classList.remove('active'))
})

clearButton.addEventListener('click', ()=> {
    operatorButtons.forEach(btn => btn.classList.remove('active'))
})

document.querySelectorAll('.buttons button').forEach(button => {
    button.addEventListener('click', ()=> {
        const action = button.dataset.action;

        if (!isNaN(action) || action === 'decimal') {
            handleNumberInput(action);
            updateClearButton();
        }
        else if (action === 'clear') {
            handleClear();
        }
        else if (action === 'sign') {
            toggleSign();
        }
        else if (action === 'percent') {
            calculatePercentage();
        }
        else if (action === 'equals') {
            calculateResult()
            isResultDisplayed = true;
        }
        else{
            handleOperator(action)
        }

        updateDisplay();
    })
})

function handleNumberInput(number) {
    if (isResultDisplayed) {
        currentInput = number === 'decimal' ? '0,' : number;
        isResultDisplayed = false;
    }
    else if (operator && currentInput === previousInput) {
        currentInput = number === 'decimal' ? '0,' : number;
    }
    else if (currentInput === '0' && number !== 'decimal') {
        currentInput = number
    }
    else if (number === 'decimal') {
        if (!currentInput.includes(',')) {
            currentInput += ',';
        }
    }else{
        currentInput += number
    }
    updateClearButton();
}

function handleClear() {
    if (currentInput !== '0') {
        currentInput = '0'
        updateClearButton();
    }else{
        clearCalculator()
    }
}

function clearCalculator() {
    currentInput = '0';
    operator = null;
    previousInput = null;
    isResultDisplayed = false;
    updateClearButton();
}

function toggleSign() {
    if (currentInput.startsWith('-')) {
        currentInput = currentInput.substring(1)
    }else{
        currentInput = '-' + currentInput
    }
    display.textContent = currentInput
}

function calculatePercentage() {
    let value = parseFloat(currentInput.replace(',', '.'))

    value = value / 100;

    currentInput = value.toFixed(8).replace('.', ',').replace(/0+$/, '').replace(/,$/, '');
}

function handleOperator(nextOperator) {
    if (operator && previousInput !== null) {
        calculateResult()
    }
    else{
        previousInput = currentInput
    }

    operator = nextOperator
    currentInput = '0';
    isResultDisplayed = false;
}

function calculateResult() {
    let result;
    const prev = parseFloat(previousInput.replace(',', '.'))
    const current = parseFloat(currentInput.replace(',', '.'))
    
    if (operator === 'add') {
        result = prev + current
    }
    else if (operator === 'subtract') {
        result = prev - current
    }
    else if (operator === 'multiply') {
        result = prev * current
    }
    else if (operator === 'divide') {
        result = prev / current
    }

    const formattedResult = (Math.round(result * 1000000000) / 1000000000).toString();

    currentInput = formattedResult.replace('.', ',');

    if (currentInput.indexOf(',') !== -1) {
        currentInput = currentInput.replace(/,?0+$/, '');
    }

    operator = null;
    previousInput = null;
}

function updateDisplay() {
    display.textContent = currentInput;
}

function updateClearButton() {
    if (currentInput === '0') {
        clearBtn.textContent = 'AC'
    }else{
        clearBtn.textContent = 'C'
    }
}
