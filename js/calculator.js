document.addEventListener('DOMContentLoaded', function () {
    const display = document.querySelector('.display');
    const buttons = document.querySelectorAll('button');
    let currentInput = '';
    let operator = '';
    let firstValue = '';

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const buttonValue = button.textContent;

            if (button.classList.contains('reset')) {
                currentInput = '';
                operator = '';
                firstValue = '';
                display.textContent = '0';
            } else if (button.classList.contains('del')) {
                currentInput = currentInput.slice(0, -1);
                display.textContent = currentInput || '0';
            } else if (button.classList.contains('result')) {
                if (firstValue && operator && currentInput) {
                    const result = calculate(firstValue, operator, currentInput);
                    display.textContent = result;
                    currentInput = result;
                    operator = '';
                    firstValue = '';
                }
            } else if (['+', '-', 'x', '/'].includes(buttonValue)) {
                if (currentInput) {
                    if (firstValue && operator) {
                        firstValue = calculate(firstValue, operator, currentInput);
                        display.textContent = firstValue;
                    } else {
                        firstValue = currentInput;
                    }
                    operator = buttonValue;
                    currentInput = '';
                }
            } else {
                currentInput += buttonValue;
                display.textContent = currentInput;
            }
        });
    });

    function calculate(a, operator, b) {
        a = parseFloat(a);
        b = parseFloat(b);
        switch (operator) {
            case '+':
                return a + b;
            case '-':
                return a - b;
            case 'x':
                return a * b;
            case '/':
                return a / b;
            default:
                return 0;
        }
    }
});
