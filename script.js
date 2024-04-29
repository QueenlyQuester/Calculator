let display = document.getElementById("display");
let buttons = document.querySelectorAll(".button");
let currentOperation = "";
let previousOperation = "";
let result = "";

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
