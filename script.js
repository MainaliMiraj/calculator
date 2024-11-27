let screenValue = '0'; // Value displayed on the screen
let runningTotal = 0;  // Tracks the result of operations
let previousOperator = null; // Stores the last operator used
const screen = document.querySelector('.screen'); // Reference to the screen element

function buttonClick(value) {
    // Determine if the input is a number or symbol
    if (isNaN(parseInt(value))) handleSymbol(value);
    else handleNumber(value);

    reRender(); // Update the screen display
}

function handleNumber(number) {
    // Update screenValue: replace '0' or append digits
    if (screenValue === '0') screenValue = number;
    else screenValue += number;
}

function handleMath(operator) {
    // Skip if screenValue is '0'
    if (screenValue === '0') return;

    const intScreenValue = parseInt(screenValue); // Parse screenValue as integer

    // If runningTotal is 0, initialize it
    if (runningTotal === 0) {
        runningTotal = intScreenValue;
    } else {
        // Perform the previous operation
        flushOperation(intScreenValue);
    }

    previousOperator = operator; // Store the current operator
    screenValue = '0'; // Reset screenValue for the next number
}

function flushOperation(intScreenValue) {
    // Perform the calculation based on the operator
    if (previousOperator === '+') runningTotal += intScreenValue;
    else if (previousOperator === '-') runningTotal -= intScreenValue;
    else if (previousOperator === 'x') runningTotal *= intScreenValue;
    else if (previousOperator === '/') runningTotal /= intScreenValue;
}

function handleSymbol(symbol) {
    switch (symbol) {
        case 'C': // Clear all values
            screenValue = '0';
            runningTotal = 0;
            previousOperator = null;
            break;

        case '=': // Calculate the result
            if (previousOperator === null) return; // No operation to perform
            flushOperation(parseInt(screenValue)); // Perform the last operation
            previousOperator = null; // Reset operator
            screenValue = `${runningTotal}`; // Display the result
            break;

        case '\u2190': // Backspace: Remove the last digit
            if (screenValue.length === 1) screenValue = '0'; // Reset to '0' if only one digit left
            else screenValue = screenValue.substring(0, screenValue.length - 1); // Remove last digit
            break;

        case '/': // Operators
        case 'x':
        case '+':
        case '-':
            handleMath(symbol); // Handle math operation
            break;

        default:
            break;
    }
}

function reRender() {
    // Update the calculator screen display
    screen.innerText = screenValue;
}

function init() {
    // Add event listener to buttons
    document.querySelector('.calc-buttons').addEventListener('click', function (event) {
        buttonClick(event.target.innerText); // Pass button text to buttonClick
    });
}

init(); // Initialize the calculator
