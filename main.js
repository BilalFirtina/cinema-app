const container = document.querySelector(".container");

runEventsListeners();

function runEventsListeners() {
  container.addEventListener("click", select);
}

function select(e) {
  console.log(e.target.parentElement);
}
