// Constants
const display = document.getElementById("display");
const historyContent = document.getElementById("historyContent");
const historyDialog = document.getElementById("historyDialog");
const calcHistory = [];

// Function to open history dialog
function openHistory() {
  historyDialog.showModal();
  const activeElementBeforeDialog = document.activeElement;
  historyDialog.querySelector("button[autofocus]").focus();
  updateHistory();
}

// Function to close history dialog
function closeHistory() {
  historyDialog.close();
  activeElementBeforeDialog && activeElementBeforeDialog.focus();
}

// Function to update history content
function updateHistory() {
  historyContent.textContent = calcHistory.join("\n");
}

// Function to trap focus within an element
function trapFocus(element) {
  const focusableElements = element.querySelectorAll(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  );
  const firstFocusableEl = focusableElements[0];
  const lastFocusableEl = focusableElements[focusableElements.length - 1];

  element.addEventListener("keydown", (e) => {
    switch (e.key) {
      case "Tab":
      case "9":
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
        break;
      case "Escape":
        if (e.target.closest("#historyDialog")) {
          closeHistory();
          e.stopPropagation();
        }
        break;
      case "ArrowRight":
        if (e.target === lastFocusableEl && !e.shiftKey) {
          firstFocusableEl.focus();
          e.preventDefault();
        }
        break;
      case "ArrowLeft":
        if (e.target === firstFocusableEl && e.shiftKey) {
          lastFocusableEl.focus();
          e.preventDefault();
        }
        break;
    }
  });

  element.addEventListener("focusin", (e) => {
    if (e.target === lastFocusableEl && e.shiftKey) {
      firstFocusableEl.focus();
      e.preventDefault();
    }
  });
}

// Function to save history to local storage
function saveHistory() {
  localStorage.setItem("calcHistory", JSON.stringify(calcHistory));
}

// Function to append input to display
function appendToDisplay(input) {
  if (display.value === "Error: Incomplete Expression") {
    display.value = "";
  }
  display.value += input;
}

// Function to handle errors
function handleError(error) {
  display.value = `Error: ${error.message || "Incomplete Expression"}`;
}

// Function to clear display
function clearDisplay() {
  display.value = "";
}

// Function to calculate equation
function calculate() {
  const equation = display.value;
  try {
    if (/[+\-*/%]$/.test(equation.trim())) {
      throw new Error(
        "Incomplete expression - please enter a number after the operator."
      );
    }
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
    display.value = error.message;
  }
}

// Event listener for dark mode toggle
document.getElementById("darkModeToggle").addEventListener("click", (e) => {
  const isDarkModeOn = document.body.classList.toggle("dark-mode");
  localStorage.setItem("theme", isDarkModeOn ? "dark" : "light");
  e.target.setAttribute("aria-pressed", isDarkModeOn);
  e.target.blur();
});

// Function to load theme from local storage
function loadTheme() {
  if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark-mode");
  }
}

loadTheme();
