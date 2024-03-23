let history = [];

function addToDisplay(value) {
  document.getElementById("display").value += value;
}

function clearDisplay() {
  document.getElementById("display").value = "";
}

function calculate() {
  let result = eval(document.getElementById("display").value);
  history.push(document.getElementById("display").value + " = " + result);
  document.getElementById("display").value = result;
  updateHistory();
}

function updateHistory() {
  let historyList = document.getElementById("historyList");
  historyList.innerHTML = "";
  history.forEach((item) => {
    let li = document.createElement("li");
    li.textContent = item;
    historyList.appendChild(li);
  });
}
