const displayElement = document.getElementById("display");
const clearButton = document.getElementById("clear");
const calculateButton = document.getElementById("calculate");
const toggleDarkModeButton = document.getElementById("toggle-dark-mode");

clearButton.addEventListener("click", clearDisplay);
calculateButton.addEventListener("click", calculate);
toggleDarkModeButton.addEventListener("click", toggleDarkMode);

function appendToDisplay(value) {
  displayElement.value += value;
}

function clearDisplay() {
  displayElement.value = "";
}

function calculate(event) {
  event.preventDefault();

  const inputValue = displayElement.value.trim();
  const regex = /[^0-9.\-+]/g;
  const cleanedInput = inputValue.replace(regex, "");

  let result;
  try {
    result = parseFloat(cleanedInput);
    if (isNaN(result)) {
      throw new Error("Invalid input");
    }
    result = result.toFixed(2);
    displayElement.value = result.toString();
  } catch (error) {
    displayElement.value = "Error";
  }
}

function toggleDarkMode() {
  document.body.classList.toggle("dark-mode");
  localStorage.setItem(
    "darkMode",
    document.body.classList.contains("dark-mode")
  );
}

// Check if dark mode is enabled in local storage
if (localStorage.getItem("darkMode") === "true") {
  document.body.classList.add("dark-mode");
}
