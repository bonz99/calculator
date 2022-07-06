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
    if (b === 0 && a !== 0) {
        return NaN;
    }
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
    if (!result) return "Division by zero error";
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
                    cache += "-";
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
                if (display.textContent === "Division by zero error") {
                    return;
                }
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
        if (display.textContent === "Division by zero error") return;
        if (!currentOperator && !secondNumber && cache === firstNumber) return;
        if (display.textContent === "-") {
            display.textContent = "";
            cache = cache.slice(0, -1);
            if (!firstNumber) {
                display.textContent = "0"; return;
            }
        }
        if (currentOperator === (cache.slice(-1))) return;
        display.textContent = display.textContent.slice(0, -1);
        cache = cache.slice(0, -1);
        if (!firstNumber && !display.textContent) {
            display.textContent = "0";
            return;
        }
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
    const operatorBtns = document.querySelectorAll(".ope");
    const button = document.querySelector(`button[data-key="${e.key}"]`);
    console.log(button);
    if (!button) return;
    calculate.call(button);
    if (e.key === "Backspace") {
        operatorBtns.forEach(operator =>  operator.classList.remove("currentOperator-kb"));
        button.classList.add("clear-delete-kb");
        setTimeout(() => {
            button.classList.remove("clear-delete-kb");
        }, parseFloat(window.getComputedStyle(button).getPropertyValue("transition-duration")) * 1000);
    } else if (e.key === "Delete") {
        button.classList.add("clear-delete-kb");
        setTimeout(() => {
            button.classList.remove("clear-delete-kb");
        }, parseFloat(window.getComputedStyle(button).getPropertyValue("transition-duration")) * 1000);
    } else if (button.classList.contains("ope")) {
        operatorBtns.forEach(operator =>  operator.classList.remove("currentOperator-kb"));
        if (currentOperator === button.textContent) {
            button.classList.add("currentOperator-kb");
        } else if (button.textContent === "=") {
            button.classList.add("equals-kb");
            setTimeout(() => {
                button.classList.remove("equals-kb");
            }, parseFloat(window.getComputedStyle(button).getPropertyValue("transition-duration")) * 1500);
        }
    } else {
        button.classList.add("button-hit-kb");
        setTimeout(() => {
            button.classList.remove("button-hit-kb");
        }, parseFloat(window.getComputedStyle(button).getPropertyValue("transition-duration")) * 1000);

    }
});