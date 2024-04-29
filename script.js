const display = document.getElementById("display");
const buttons = document.querySelectorAll(".button");
let currentOperation = "";
let previousOperation = "";
let result = "";
const historyLogList = document.getElementById("history-log-list");
const history = [];

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    const buttonText = button.textContent;
    switch (buttonText) {
      case "C":
        clearDisplay();
        break;
      case "←":
        removeLastCharacter();
        break;
      case "=":
        calculateResult();
        break;
      case "±":
        toggleSign();
        break;
      case "(":
      case ")":
        appendToCurrentOperation(buttonText);
        break;
      default:
        if (button.classList.contains("operator")) {
          handleOperatorButton(buttonText);
        } else {
          handleNumberButton(buttonText);
        }
    }
  });
});

const themeSwitcher = document.querySelector(".theme-switcher");
const lightTheme = document.querySelector("#light-theme");
const darkTheme = document.querySelector("#dark-theme");

themeSwitcher.addEventListener("click", () => {
  if (darkTheme.checked) {
    setDarkTheme();
  } else {
    setLightTheme();
  }
});

function clearDisplay() {
  display.value = "";
  currentOperation = "";
  previousOperation = "";
  result = "";
  history.length = 0;
  historyLogList.innerHTML = "";
}

function removeLastCharacter() {
  display.value = display.value.slice(0, -1);
}

function calculateResult() {
  try {
    const operationFunction = new Function("return " + currentOperation);
    result = operationFunction();
    display.value = result;
    previousOperation = display.value;
    history.push(`${previousOperation} = ${result}`);
    if (history.length > 10) {
      history.shift();
    }
    updateHistoryLog();
  } catch (error) {
    display.value = "Error";
  }
}

function toggleSign() {
  currentOperation = currentOperation.replace(/-/g, "+").replace(/\+/g, "-");
  display.value = currentOperation;
}

function appendToCurrentOperation(text) {
  currentOperation += text;
  display.value = currentOperation;
}

function handleOperatorButton(text) {
  if (currentOperation === "") {
    appendToCurrentOperation(text);
  } else {
    const lastCharacter = currentOperation[currentOperation.length - 1];
    if (
      lastCharacter !== "+" &&
      lastCharacter !== "-" &&
      lastCharacter !== "*" &&
      lastCharacter !== "/"
    ) {
      appendToCurrentOperation(text);
    }
  }
}

function handleNumberButton(text) {
  if (text === "-" && (currentOperation === "" || isLastCharacterOperator())) {
    appendToCurrentOperation(text);
  } else {
    appendToCurrentOperation(text);
  }
}

function isLastCharacterOperator() {
  const lastCharacter = currentOperation[currentOperation.length - 1];
  return (
    lastCharacter === "+" ||
    lastCharacter === "-" ||
    lastCharacter === "*" ||
    lastCharacter === "/"
  );
}

function updateHistoryLog() {
  historyLogList.innerHTML = "";
  history.forEach((item) => {
    const historyItem = document.createElement("li");
    historyItem.textContent = item;
    historyLogList.appendChild(historyItem);
  });
}

function setDarkTheme() {
  document.body.style.backgroundColor = "#333";
  document.querySelector(".calculator").style.backgroundColor = "#444";
  document.querySelector(".calculator .display").style.backgroundColor = "#555";
  document.querySelectorAll(".button").forEach((button) => {
    button.style.backgroundColor = "#666";
  });
  document.querySelectorAll(".operator").forEach((operator) => {
    operator.style.backgroundColor = "#777";
  });
  document.querySelector(".history-log").style.backgroundColor = "#444";
  document.querySelector(".history-log ul").style.backgroundColor = "#555";
}

function setLightTheme() {
  document.body.style.backgroundColor = "#f0f0f0";
  document.querySelector(".calculator").style.backgroundColor = "#fff";
  document.querySelector(".calculator .display").style.backgroundColor =
    "#f0f0f0";
  document.querySelectorAll(".button").forEach((button) => {
    button.style.backgroundColor = "#4CAF50";
  });
  document.querySelectorAll(".operator").forEach((operator) => {
    operator.style.backgroundColor = "#ff9800";
  });
  document.querySelector(".history-log").style.backgroundColor = "#fff";
  document.querySelector(".history-log ul").style.backgroundColor = "#f0f0f0";
}
