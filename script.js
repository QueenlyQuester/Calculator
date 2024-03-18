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
}

function saveHistory() {
  localStorage.setItem("calcHistory", JSON.stringify(calcHistory));
}

function appendToDisplay(input) {
  display.value += input;
}

function clearDisplay() {
  display.value = "";
}

function calculate() {
  const equation = display.value;
  try {
    if (/[+\-*/%]$/.test(equation.trim())) {
      throw new Error(
        "Incomplete expression - please enter a number after the operator."
      );
    }
    const result = math.evaluate(equation); // Using math.js library's evaluate function
    if (isNaN(result) || !isFinite(result)) {
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
    historyContent.innerHTML = calcHistory.join("<br>");
  } catch (error) {
    display.value = error.message;
  }
}
