let activeElementBeforeDialog;
const calcHistory = [];

const display = document.getElementById("display");
const historyContent = document.getElementById("historyContent");

function openHistory() {
  const historyDialog = document.getElementById("historyDialog");
  historyDialog.removeAttribute("hidden");
  activeElementBeforeDialog = document.activeElement;
  historyDialog.focus();
  historyContent.textContent = calcHistory.join("\n");
  trapFocus(historyDialog);
}

function closeHistory() {
  const historyDialog = document.getElementById("historyDialog");
  historyDialog.setAttribute("hidden", "");
  activeElementBeforeDialog && activeElementBeforeDialog.focus();
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
  element.addEventListener("focusin", function (e) {
    if (e.target === lastFocusableEl && e.shiftKey) {
      firstFocusableEl.focus();
      e.preventDefault();
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
  if (equation === "") {
    return;
  }
  try {
    if (/[+\-*/%]$/.test(equation)) {
      throw new Error(
        "Incomplete expression - please enter a number after the operator."
      );
    }
    const result = math.evaluate(equation); // Using math.js library's evaluate function
    if (Number.isNaN(result) || !isFinite(result)) {
      if (equation.includes("/0")) {
        throw new Error("Division by zero is not possible - please try again.");
      } else {
        throw new Error("Invalid calculation - please try again.");
      }
    }
    display.value = result;
    calcHistory.push(equation + " = " + result);
    saveHistory();
    historyContent.setAttribute("aria-live", "polite");
    historyContent.textContent = calcHistory.join("\n");
  } catch (error) {
    display.value = error.message; // Update the display with the error message
    historyContent.textContent = calcHistory.join("\n");
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

document.addEventListener("DOMContentLoaded", function () {
  const buttons = document.querySelectorAll("#calculator button");
  buttons.forEach(function (button) {
    button.addEventListener("click", function (event) {
      const buttonValue = event.target.textContent;
      // Validate and sanitize user input before processing it
      if (buttonValue === "C") {
        clearDisplay();
      } else {
        appendToDisplay(buttonValue);
      }
    });
  });
});
