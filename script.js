function add(a, b) {
    return a + b;
}
function subtract(a, b) {
    return a - b;
}
function multiply(a, b) {
    return a * b;
}
function divide(a, b) {
    return a / b;
}

function operate(operator, a, b) {
    let result = 0;
    switch (operator) {
        case "+":
            result = add(a, b);
            break;
        case "-":
            result = subtract(a, b);
            break;
        case "x":
            result = multiply(a, b);
            break;
        case "/":
            result = divide(a, b);
            break;
        default:

    }

    return Math.round(result * 100) / 100;
}

function calculate() {
    let button = this;
    if (button.className.includes("ope")) {
        if (!firstNumber) {
            if (display.textContent === "0") {
                if (button.textContent === "-") {
                    display.textContent = button.textContent;
                    cache = "-";
                } else {
                    display.textContent = "0";
                    cache = "";
                }
            } else {
                firstNumber = parseFloat(display.textContent);
                currentOperator = button.textContent;
                cache += button.textContent;
            }
        } else {
            if (operators.includes(cache.slice(-1))) {
                if (button.textContent === "-") {
                    display.textContent = "-";
                    return;
                } else {
                    cache = cache.slice(0, -1);
                    cache += button.textContent;
                    currentOperator = button.textContent;
                    return;
                }
            }

            if (currentOperator) {
                firstNumber = parseFloat(firstNumber);
                secondNumber = parseFloat(display.textContent);
                display.textContent = operate(currentOperator, firstNumber, secondNumber);

                firstNumber = display.textContent;
                secondNumber = "";
                if (button.textContent === "=") {
                    cache = firstNumber;
                    currentOperator = "";
                } else {
                    currentOperator = button.textContent;
                    cache = firstNumber + currentOperator;
                }
            } else {
                currentOperator = button.textContent;
                cache += button.textContent;
            }

        }
    } else if (button.className.includes("num")) {
        if (!cache) { display.textContent = "" };
        if (cache !== "-" && operators.includes(cache.slice(-1)) && display.textContent !== "-") {
            display.textContent = "";
        }
        cache += button.textContent;
        display.textContent += button.textContent;
    } else if (button.className.includes("clear")) {
        display.textContent = "0";
        firstNumber = "";
        secondNumber = "";
        currentOperator = "";
        cache = "";
    } else if (button.className.includes("delete")) {
        if (operators.includes(cache.slice(-1))) return;
        display.textContent = display.textContent.slice(0, -1);
        cache = cache.slice(0, -1);
    }
}


let display = document.querySelector(".display");
display.textContent = "0";
let firstNumber = "";
let secondNumber = "";
let cache = "";
let currentOperator = "";
const operators = ["+", "-", "x", "/", "="];

const allButtons = document.querySelectorAll("button");
allButtons.forEach(button => button.addEventListener("click", calculate));


window.addEventListener("keydown", e => {
    console.log(e.key);
    const button = document.querySelector(`button[data-key="${e.key}"]`);
    console.log(button);
    if (!button) {
        return;
    }
    calculate.call(button);
});