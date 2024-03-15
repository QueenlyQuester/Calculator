const display = document.getElementById("display");

let appendToDisplay = (input) => {
  display.value += input;
};

let clearDisplay = () => {
  display.value = "";
};

let calcHistory = [];

let calculate = () => {
  try {
    display.value = eval(display.value);
    calcHistory.push(display.value); // Save to history
  } catch (error) {
    display.value = "Error";
  }
};

function openHistory() {
  document.getElementById("historyDialog").removeAttribute("hidden");
  // Display history content
  document.getElementById("historyContent").innerHTML =
    calcHistory.join("<br>");
}

function closeHistory() {
  document.getElementById("historyDialog").setAttribute("hidden", "");
}
