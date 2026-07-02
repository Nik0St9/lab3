let calc = document.getElementById('calculator');
let outputCell = document.getElementById('calcOutput');

let calculatorState = {
    firstNumber: null,
    operator: null,
    waitingForSecond: false,
    shouldReset: false
};

let memory = 0;

calc.addEventListener('click', (event) => {
    const targetCell = event.target.closest('td');
    if (!targetCell) return;

    const value = targetCell.textContent.trim();
    if (!value) return;

    ClickHandle(value);
});

function ClickHandle(value) {
    if (value.includes('1') && (value.includes('x'))) {
        handleDiv();
        return;
    }

    if (value >= '0' && value <= '9') {
        handleDigit(value);
        return;
    }

    if (value === ',') {
        handleComma();
        return;
    }

    if (['+', '-', '*', '/'].includes(value)) {
        handleOperation(value);
        return;
    }

    switch (value) {
        case '=':
            handleEquals();
            break;
        case 'Backspace':
            handleBackspace();
            break;
        case 'CE':
            handleCE();
            break;
        case 'C':
            handleC();
            break;
        case '+/-':
            handleNegate();
            break;
        case '%':
            handlePercent();
            break;
        case 'sqrt':
            handleSqrt();
            break;
        case 'MC':
        case 'MR':
        case 'MS':
        case 'M+':
            handleMemory(value);
            break;
        default:
            outputCell.textContent += value;
    }
}

function handleDigit(value) {
    if (calculatorState.shouldReset) {
        outputCell.textContent = value;
        calculatorState.shouldReset = false;
        return;
    }

    if (outputCell.textContent === '0') {
        outputCell.textContent = value;
        return;
    }

    outputCell.textContent += value;
}

function handleComma() {
    if (calculatorState.shouldReset) {
        outputCell.textContent = '0,';
        calculatorState.shouldReset = false;
        return;
    }

    if (outputCell.textContent.includes(',')) {
        return;
    }

    outputCell.textContent += ',';
}

function handleOperation(operator) {
    const currentNumber = parseFloat(outputCell.textContent.replace(',', '.'));

    if (calculatorState.operator && !calculatorState.waitingForSecond) {
        const result = calculate(calculatorState.firstNumber, currentNumber, calculatorState.operator);

        if (result === 'Error') {
            outputCell.textContent = 'Error';
            resetState();
            return;
        }

        outputCell.textContent = String(result).replace('.', ',');
        calculatorState.firstNumber = result;
    } else {
        calculatorState.firstNumber = currentNumber;
    }

    calculatorState.operator = operator;
    calculatorState.waitingForSecond = true;
    calculatorState.shouldReset = true;
}

function calculate(a, b, operator) {
    switch (operator) {
        case '+': return plus(a, b);
        case '-': return minus(a, b);
        case '*': return multiply(a, b);
        case '/': return divide(a, b);
        default: return b;
    }
}

function plus(a, b) {
    return formatResult(a + b);
}

function minus(a, b) {
    return formatResult(a - b);
}

function multiply(a, b) {
    return formatResult(a * b);
}

function divide(a, b) {
    if (b === 0) {
        return 'Error';
    }
    return formatResult(a / b);
}

function handleEquals() {
    const currentNumber = parseFloat(outputCell.textContent.replace(',', '.'));

    if (calculatorState.operator && calculatorState.firstNumber !== null) {
        const result = calculate(calculatorState.firstNumber, currentNumber, calculatorState.operator);

        if (result === 'Error') {
            outputCell.textContent = 'Error';
            resetState();
            return;
        }

        outputCell.textContent = String(result).replace('.', ',');
        calculatorState.firstNumber = result;
        calculatorState.waitingForSecond = true;
        calculatorState.shouldReset = true;
    }
}

function handleBackspace() {
    const current = outputCell.textContent;
    if (current === 'Error') {
        handleC();
        return;
    }
    if (current.length > 1) {
        outputCell.textContent = current.slice(0, -1);
        return;
    }
    outputCell.textContent = '0';
}

function handleCE() {
    outputCell.textContent = '0';
    calculatorState.shouldReset = false;
}

function handleC() {
    outputCell.textContent = '0';
    resetState();
}

function resetState() {
    calculatorState.firstNumber = null;
    calculatorState.operator = null;
    calculatorState.waitingForSecond = false;
    calculatorState.shouldReset = false;
}

function handleNegate() {
    const current = outputCell.textContent;
    if (current === '0' || current === 'Error') return;

    if (current.startsWith('-')) {
        outputCell.textContent = current.slice(1);
        return;
    }
    outputCell.textContent = '-' + current;
}

function handlePercent() {
    const current = parseFloat(outputCell.textContent.replace(',', '.'));
    const result = percent(current);

    if (result === 'Error') {
        outputCell.textContent = 'Error';
        return;
    }
    outputCell.textContent = String(result).replace('.', ',');
}

function percent(value) {
    return formatResult(value / 100);
}

function handleSqrt() {
    const current = parseFloat(outputCell.textContent.replace(',', '.'));
    const result = sqrt(current);

    if (result === 'Error') {
        outputCell.textContent = 'Error';
        return;
    }
    outputCell.textContent = String(result).replace('.', ',');
}

function sqrt(value) {
    if (value < 0) {
        return 'Error';
    }
    return formatResult(Math.sqrt(value));
}

function handleDiv() {
    const current = parseFloat(outputCell.textContent.replace(',', '.'));
    const result = div(current);

    if (result === 'Error') {
        outputCell.textContent = 'Error';
        return;
    }
    outputCell.textContent = String(result).replace('.', ',');
}

function div(value) {
    if (value === 0) {
        return 'Error';
    }
    return formatResult(1 / value);
}

function handleMemory(action) {
    const current = parseFloat(outputCell.textContent.replace(',', '.'));

    switch (action) {
        case 'MC':
            memoryClear();
            break;
        case 'MR':
            memoryRecall();
            break;
        case 'MS':
            memoryStore(current);
            break;
        case 'M+':
            memoryAdd(current);
            break;
    }
}

function memoryClear() {
    memory = 0;
}

function memoryRecall() {
    outputCell.textContent = String(memory).replace('.', ',');
    calculatorState.shouldReset = true;
}

function memoryStore(value) {
    memory = value;
}

function memoryAdd(value) {
    memory = memoryAddCalculate(memory, value);
}

function memoryAddCalculate(currentMemory, value) {
    return formatResult(currentMemory + value);
}

function formatResult(num) {
    return parseFloat(num.toFixed(10));
}