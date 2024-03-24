let activeElementBeforeDialog;
const calcHistory = [];

const display = document.getElementById("display");
const historyContent = document.getElementById("historyContent");
const historyDialog = document.getElementById("historyDialog");

function openHistory() {
  historyDialog.showModal();
  activeElementBeforeDialog = document.activeElement;
  historyDialog.querySelector('button[autofocus]').focus();
  updateHistory();
}

function closeHistory() {
  historyDialog.close();
  activeElementBeforeDialog && activeElementBeforeDialog.focus();
}

function updateHistory() {
  historyContent.textContent = calcHistory.join("\n");
}

function trapFocus(element) {
  const focusableElements = element.querySelectorAll(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  );
  const firstFocusableEl = focusableElements[0];
  const lastFocusableEl = focusableElements[focusableElements.length - 1];
  element.addEventListener("keydown", function (e) {
    if (e.key === "Tab" || e.keyCode === 9) {
      if (e.shiftKey) {
        if (document.activeElement === firstFocusableEl) {
          lastFocusableEl.focus();
          e.preventDefault();
        }
      } else {
        if (document.activeElement === lastFocusableEl) {
          firstFocusableEl.focus();
          e.preventDefault();
        }
      }
    }
  });
}

function saveHistory() {
  localStorage.setItem("calcHistory", JSON.stringify(calcHistory));
}

function appendToDisplay(input) {
  // Clear the display if an error message is displayed
  if (display.value === "Error: Incomplete Expression") {
    display.value = "";
  }
  display.value += input;
}

function handleError(_error) {
  // Set a standard error message
  display.value = "Error: Incomplete Expression";
}

function clearDisplay() {
  display.value = "";
}

function calculate() {
  const equation = display.value.trim();
  if (/[+\-*/%]$/.test(equation)) {
    handleError("Incomplete expression - please enter a number after the operator.");
    return;
  }
  try {
    const result = math.evaluate(equation);
    if (Number.isNaN(result) || !isFinite(result)) {
      if (equation.includes("/0")) {
        handleError("Division by zero is not possible - please try again.");
      } else {
        handleError("Invalid calculation - please try again.");
      }
      return;
    }
    display.value = result;
    calcHistory.push(equation + " = " + result);
    saveHistory();
    updateHistory();
  } catch (error) {
    handleError(error.message);
  }
}

document
  .getElementById("darkModeToggle")
  .addEventListener("click", function () {
    const isDarkModeOn = document.body.classList.toggle("dark-mode");
    localStorage.setItem("theme", isDarkModeOn ? "dark" : "light");
    this.setAttribute("aria-pressed", isDarkModeOn);
    this.blur();
  });

function loadTheme() {
  if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark-mode");
  }
}

loadTheme();

const math = {
  evaluate: (expression) => {
    try {
      return eval(expression);
    } catch (error) {
      throw new Error("Invalid calculation - please try again.");
    }
  },
};

trapFocus(historyDialog);
