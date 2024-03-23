let displayValue = "";
let history = [];

function addToDisplay(value) {
  displayValue += value;
  document.getElementById("display").value = displayValue;
}

function calculate() {
  try {
    const result = eval(displayValue);
    history.push({
      expression: displayValue,
      result: result,
    });
    displayValue = "";
    document.getElementById("display").value = result;
    updateHistory();
  } catch (error) {
    displayValue = "";
    document.getElementById("display").value = "Error";
  }
}

function updateHistory() {
  const historyList = document.getElementById("historyList");
  historyList.innerHTML = "";
  history.forEach((item) => {
    const li = document.createElement("li");
    li.className = "history-item";
    li.textContent = `${item.expression} = ${item.result}`;
    historyList.appendChild(li);
  });
}

function clearHistory() {
  history = [];
  updateHistory();
}
