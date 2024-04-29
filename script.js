let display = document.getElementById("display");
let buttons = document.querySelectorAll(".button");
let currentOperation = "";
let previousOperation = "";
let result = "";
let historyLogList = document.getElementById("history-log-list");

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    let buttonText = button.textContent;
    switch (buttonText) {
      case "C":
        display.value = "";
        currentOperation = "";
        previousOperation = "";
        result = "";
        break;
      case "←":
        display.value = display.value.slice(0, -1);
        break;
      case "=":
        try {
          result = eval(currentOperation);
          display.value = result;
          currentOperation = "";
          previousOperation = "";
          let historyItem = document.createElement("li");
          historyItem.textContent = `${previousOperation} = ${result}`;
          historyLogList.appendChild(historyItem);
        } catch (error) {
          display.value = "Error";
        }
        break;
      default:
        if (button.classList.contains("operator")) {
          if (currentOperation !== "") {
            currentOperation += buttonText;
            display.value = currentOperation;
          } else {
            currentOperation = display.value + buttonText;
            display.value = currentOperation;
          }
        } else {
          if (currentOperation !== "") {
            currentOperation += buttonText;
            display.value = currentOperation;
          } else {
            currentOperation = buttonText;
            display.value = currentOperation;
          }
        }
    }
  });
});

let themeSwitcher = document.querySelector(".theme-switcher");
let lightTheme = document.querySelector("#light-theme");
let darkTheme = document.querySelector("#dark-theme");

themeSwitcher.addEventListener("click", () => {
  if (darkTheme.checked) {
    document.body.style.backgroundColor = "#333";
    document.querySelector(".calculator").style.backgroundColor = "#444";
    document.querySelector(".display").style.backgroundColor = "#555";
    document.querySelectorAll(".button").forEach((button) => {
      button.style.backgroundColor = "#666";
    });
    document.querySelectorAll(".operator").forEach((operator) => {
      operator.style.backgroundColor = "#777";
    });
  } else {
    document.body.style.backgroundColor = "#f0f0f0";
    document.querySelector(".calculator").style.backgroundColor = "#fff";
    document.querySelector(".display").style.backgroundColor = "#f0f0f0";
    document.querySelectorAll(".button").forEach((button) => {
      button.style.backgroundColor = "#4CAF50";
    });
    document.querySelectorAll(".operator").forEach((operator) => {
      operator.style.backgroundColor = "#ff9800";
    });
  }
});
