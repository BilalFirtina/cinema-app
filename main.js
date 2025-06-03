const container = document.querySelector(".container");
const selectMovie = document.querySelector("#selectMovie");
const count = document.querySelector("#count");
const amount = document.querySelector("#amount");
const seatMain = document.querySelector(".seatMain");
const seats = Array.from(document.querySelectorAll(".seat"));
const buyButton = document.querySelector("#buyButton");
const clearButton = document.querySelector("#clearButton");

runEventsListeners();
function runEventsListeners() {
  container.addEventListener("click", select);
  selectMovie.addEventListener("change", changeMovie);
  document.addEventListener("DOMContentLoaded", runPageLoaded);
  buyButton.addEventListener("click", buySelectedSeats);
  clearButton.addEventListener("click", clearSelectedSeats);
}

function select(e) {
  const selectedElement = e.target.parentElement;
  if (
    selectedElement.classList.contains("seat") &&
    !selectedElement.classList.contains("full")
  ) {
    selectedElement.classList.toggle("selected");
    calculate();
    saveSelectedSeatsIndexToStorage();
    saveSelectedMovieIndexToStorage();
  }
}
function changeMovie() {
  calculate();
  saveSelectedMovieIndexToStorage();
}

function clearSelectedSeats() {
  seats.forEach((seat) => {
    seat.classList.remove("full", "selected");
    Storagex.removeLocalStorage();
  });
  calculate();
  selectMovie.selectedIndex = 0;
}

function buySelectedSeats() {
  if (confirm("Satın almak istiyor musunuz?")) {
    const selectedList = getSelectedSeats();
    selectedList.forEach((seat) => {
      seat.classList.add("full");
      seat.classList.remove("selected");
    });
    calculate();
    saveFullSeatsIndexToStorage();
    saveSelectedSeatsIndexToStorage();
  } else {
    return;
  }
}

function getSelectedSeats() {
  const selectedList = [...seatMain.querySelectorAll(".selected")];
  return selectedList;
}

function getFullSeats() {
  const fullList = [...seatMain.querySelectorAll(".full")];
  return fullList;
}

function runPageLoaded() {
  const selectedSeatsIndex = Storagex.getSelectedSeatsFromStorage();
  selectedSeatsIndex.forEach((seat) => {
    seats[seat].classList.add("selected");
  });
  const fullSeatsIndex = Storagex.getFullSeatsFromStorage();
  fullSeatsIndex.forEach((seat) => {
    seats[seat].classList.add("full");
  });
  selectMovie.selectedIndex = Storagex.getSelectedMovieIndexFromStorage();
  calculate();
}

function getSelectedSeatIndex() {
  const selectedList = getSelectedSeats();
  const selectedSeatsIndex = selectedList.map((seat) => {
    return seats.indexOf(seat);
  });
  return selectedSeatsIndex;
}

function getFullSeatIndex() {
  const fullList = getFullSeats();
  const fullSeatsIndex = fullList.map((seat) => {
    return seats.indexOf(seat);
  });
  return fullSeatsIndex;
}

function saveSelectedSeatsIndexToStorage() {
  const selectedSeatsIndex = getSelectedSeatIndex();
  Storagex.addSelectedSeatToStorage(selectedSeatsIndex);
}

function saveFullSeatsIndexToStorage() {
  const fullSeatsIndex = getFullSeatIndex();
  Storagex.addFullSeatToStorage(fullSeatsIndex);
}

function saveSelectedMovieIndexToStorage() {
  const selectedMovieIndex = selectMovie.selectedIndex;
  Storagex.addSelectedMovieToStorage(selectedMovieIndex);
}

function calculate() {
  const selectedSeatsCounts = getSelectedSeats().length;
  //const price = Number(selectMovie.value);
  const price = Number(selectMovie.options[selectMovie.selectedIndex].value);
  count.textContent = selectedSeatsCounts;
  amount.textContent = selectedSeatsCounts * price;
}
