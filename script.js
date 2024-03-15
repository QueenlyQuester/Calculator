let calcHistory = JSON.parse(localStorage.getItem("calcHistory")) || [];

let saveHistory = () => {
  localStorage.setItem("calcHistory", JSON.stringify(calcHistory));
};

let appendToDisplay = (input) => {
  display.value += input;
};

let clearDisplay = () => {
  display.value = "";
};

let calculate = () => {
  let equation = display.value;
  try {
    display.value = eval(equation);
    calcHistory.push(equation + " = " + display.value); // Save the equation with result to history
    saveHistory(); // Save to local storage
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
