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

// function calculate(string) {
//     if (string.includes("Error")) {
//         return "Error";
//     }
//     let operators = ["+", "-", "x", "/", "="]
//     let array = string.split("");
//     let leftNum = "";
//     let rightNum = "";
//     let operator = "";
//     for (let i = 0; i < array.length; i++) {
//         if (operators.includes(array[i])) {
//             if (operators.includes(array[i-1]) || i === 0) {
//                 if (array[i] === "-" || array[i] === "+") {
//                     if (!leftNum) {
//                         leftNum += array[i];
//                         continue;
//                     }
//                     rightNum += array[i];
//                     continue;
//                 } else {
//                     return "Error";
//                 }
//             }
//             if (operator) {
//                 if (rightNum) {
//                     rightNum = parseFloat(rightNum);
//                     leftNum = operate(operator, leftNum, rightNum);
//                     if (array[i] === "=") { return leftNum; }
//                     rightNum = "";
//                 }
//                 operator = array[i];
//             } else {
//                 leftNum = parseFloat(leftNum);
//                 operator = array[i];
//             }
//         } else if (operator) {
//             rightNum += array[i];
//         } else {
//             leftNum += array[i];
//         }
//     }
// }


function calculate() {
    let button = this
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
            }

        }
    } else if (button.className.includes("num")) {
        if (!cache) { display.textContent = "" };
        if (cache !== "-" && operators.includes(cache.slice(-1)) && display.textContent !== "-") {
            display.textContent = "";
        }
        cache += button.textContent;
        display.textContent += button.textContent;
    }
}

let display = document.querySelector(".display");
display.textContent = "0";
let firstNumber = "";
let secondNumber = "";
let cache = "";
let currentOperator = "";
const operators = ["+", "-", "x", "/", "="];

const numButtons = document.querySelectorAll(".num");
numButtons.forEach(button => button.addEventListener("click", calculate));

const opeButtons = document.querySelectorAll(".ope");
opeButtons.forEach(button => button.addEventListener("click", calculate));

const clearBtn = document.querySelector(".clear");
clearBtn.addEventListener("click", () => {
    display.textContent = "0";
    firstNumber = "";
    secondNumber = "";
    currentOperator = "";
    cache = "";
});

const deleteBtn = document.querySelector(".delete");
deleteBtn.addEventListener("click", () => {
    display.textContent = display.textContent.slice(0, -1);
    cache = cache.slice(0, -1);
});
