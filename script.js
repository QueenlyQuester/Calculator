document.addEventListener("DOMContentLoaded", () => {
  // Constants
  const activeElementBeforeDialog = null;
  const calcHistory = [];
  const FOCUSABLE_ELEMENT_SELECTOR =
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
  const historyDialog = document.getElementById("historyDialog");
  const historyContent = document.getElementById("historyContent");
  const display = document.getElementById("display");
  const darkModeToggle = document.getElementById("darkModeToggle");

  // Functions
  const focusableElements = (element) =>
    element.querySelectorAll(FOCUSABLE_ELEMENT_SELECTOR);
  const firstFocusableElement = (elements) => elements[0];
  const lastFocusableElement = (elements) => elements[elements.length - 1];

  const trapFocus = (element) => {
    const elements = focusableElements(element);
    const firstElement = firstFocusableElement(elements);
    const lastElement = lastFocusableElement(elements);

    element.addEventListener("keydown", (e) => {
      if (e.key === "Tab" || e.keyCode === 9) {
        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            lastElement.focus();
            e.preventDefault();
          }
        } else {
          if (document.activeElement === lastElement) {
            firstElement.focus();
            e.preventDefault();
          }
        }
      }
    });
  };

  const saveHistory = () =>
    localStorage.setItem("calcHistory", JSON.stringify(calcHistory));

  const appendToDisplay = (input) => {
    if (display.value === "Error: Incomplete Expression") {
      display.value = "";
    }
    display.value += input;
  };

  const handleError = (error) => {
    display.value = "Error: Incomplete Expression";
  };

  const clearDisplay = () => (display.value = "");

  const resultCache = new Map();

  const calculate = () => {
    const equation = display.value;

    if (resultCache.has(equation)) {
      return (display.value = resultCache.get(equation));
    }

    try {
      if (/[+\-*/%]$/.test(equation.trim())) {
        throw new Error(
          "Incomplete expression - please enter a number after the operator."
        );
      }

      const result = math.evaluate(equation);

      if (Number.isNaN(result) || !isFinite(result)) {
        if (equation.includes("/0")) {
          throw new Error(
            "Division by zero is not possible - please try again."
          );
        } else {
          throw new Error("Invalid calculation - please try again.");
        }
      }

      display.value = result;
      calcHistory.push(equation + " = " + result);
      saveHistory();
      historyContent.setAttribute("aria-live", "polite");
      historyContent.textContent = calcHistory.join("\n");
      resultCache.set(equation, result);
    } catch (error) {
      handleError(error);
      resultCache.delete(equation);
    }
  };

  document.getElementById("calculate").addEventListener("click", calculate);
  document.getElementById("clear").addEventListener("click", clearDisplay);

  const toggleDarkMode = () => {
    const isDarkModeOn = document.body.classList.toggle("dark-mode");
    localStorage.setItem("theme", isDarkModeOn ? "dark" : "light");
    darkModeToggle.setAttribute("aria-pressed", isDarkModeOn);
    darkModeToggle.blur();
  };

  const loadTheme = () => {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme === "dark") {
      document.body.classList.add("dark-mode");
    }
  };

  darkModeToggle.addEventListener("click", toggleDarkMode);
  loadTheme();
});
