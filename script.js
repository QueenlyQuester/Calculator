const display = document.getElementById("display");
const buttons = Array.from(document.getElementsByTagName("button"));
const clear = document.getElementById("clear");
const equals = document.getElementById("equals");
const operations = ["+", "-", "*", "/", "^", "sqrt", "sin", "cos", "tan"];
const constants = ["pi", "e"];

let currentOperand = "";
let previousOperand = "";
let operation = null;

buttons.forEach((button) => {
  button.addEventListener("click", (e) => {
    const buttonText = e.target.innerText;

    if (buttonText === "C") {
      currentOperand = "";
      previousOperand = "";
      operation = null;
      display.value = "";
    } else if (operations.includes(buttonText)) {
      if (currentOperand === "") return;
      if (previousOperand !== "") calculate();
      operation = buttonText;
      previousOperand = currentOperand;
      currentOperand = "";
    } else if (constants.includes(buttonText)) {
      currentOperand = buttonText;
      display.value = currentOperand;
    } else if (buttonText === ".") {
      if (currentOperand.includes(".")) return;
      currentOperand += ".";
    } else if (buttonText === "=") {
      if (currentOperand === "" || previousOperand === "") return;
      calculate();
    } else {
      currentOperand += buttonText;
      display.value = currentOperand;
    }
  });
});

function calculate() {
  let result;
  const prev = parseFloat(previousOperand);
  const current = parseFloat(currentOperand);
  if (isNaN(prev) || isNaN(current)) return;
  switch (operation) {
    case "+":
      result = prev + current;
      break;
    case "-":
      result = prev - current;
      break;
    case "*":
      result = prev * current;
      break;
    case "/":
      if (current === 0) {
        alert("Cannot divide by zero");
        return;
      }
      result = prev / current;
      break;
    case "^":
      result = Math.pow(prev, current);
      break;
    case "sqrt":
      if (current < 0) {
        alert("Cannot take the square root of a negative number");
        return;
      }
      result = Math.sqrt(current);
      break;
    case "sin":
      result = Math.sin(current);
      break;
    case "cos":
      result = Math.cos(current);
      break;
    case "tan":
      result = Math.tan(current);
      break;
    default:
      return;
  }
  currentOperand = result;
  operation = null;
  previousOperand = "";
  display.value = currentOperand;
}

clear.addEventListener("click", () => {
  currentOperand = "";
  previousOperand = "";
  operation = null;
  display.value = "";
});
