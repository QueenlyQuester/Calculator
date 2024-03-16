let activeElementBeforeDialog;
const calcHistory = [];
function openHistory() {
  const historyDialog = document.getElementById("historyDialog");
  historyDialog.removeAttribute("hidden");
  activeElementBeforeDialog = document.activeElement;
  historyDialog.focus();
  document.getElementById("historyContent").innerHTML =
    calcHistory.join("<br>");
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
const saveHistory = () => {
  localStorage.setItem("calcHistory", JSON.stringify(calcHistory));
};
const appendToDisplay = (input) => {
  display.value += input;
};
const clearDisplay = () => {
  display.value = "";
};
const calculate = () => {
  const display = document.getElementById("display");
  const equation = display.value;
  try {
    display.value = eval(equation);
    calcHistory.push(equation + " = " + display.value);
    saveHistory();
  } catch (error) {
    display.value = "Error";
  }
};
