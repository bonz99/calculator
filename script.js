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

    return result;
}

function calculate(string) {
    if (string.includes("Error")) {
        return "Error";
    }
    let operators = ["+", "-", "x", "/", "="]
    let array = string.split("");
    let leftNum = "";
    let rightNum = "";
    let operator = "";
    for (let i = 0; i < array.length; i++) {
        if (operators.includes(array[i])) {
            if (operators.includes(array[i-1]) || i === 0) {
                if (array[i] === "-" || array[i] === "+") {
                    if (!leftNum) {
                        leftNum += array[i];
                        continue;
                    }
                    rightNum += array[i];
                    continue;
                } else {
                    return "Error";
                }
            }
            if (operator) {
                if (rightNum) {
                    rightNum = parseFloat(rightNum);
                    leftNum = operate(operator, leftNum, rightNum);
                    if (array[i] === "=") { return leftNum; }
                    rightNum = "";
                }
                operator = array[i];
            } else {
                leftNum = parseFloat(leftNum);
                operator = array[i];
            }
        } else if (operator) {
            rightNum += array[i];
        } else {
            leftNum += array[i];
        }
    }
}

let display = document.querySelector(".display");
display.textContent = "";
const numButtons = document.querySelectorAll(".num, .ope");
numButtons.forEach(button => button.addEventListener("click", () => {
    display.textContent += button.textContent;
}));


const clearBtn = document.querySelector(".clear");
clearBtn.addEventListener("click", () => {
    display.textContent = "0";
});

const equalsBtn = document.querySelector(".equals");
equalsBtn.addEventListener("click", () => {
    display.textContent = calculate(display.textContent); 41093
});

const deleteBtn = document.querySelector(".delete");
deleteBtn.addEventListener("click", () => {
    display.textContent = display.textContent.slice(0, -1);
});
