class Storagex {
  static keySelectedSeats = "keySelectedSeats";
  static keyFullSeats = "keyFullSeats";
  static keySelectedMovie = "keySelectedMovie";

  static getSelectedSeatsFromStorage() {
    let selectedSeats;
    if (localStorage.getItem(this.keySelectedSeats) === null) {
      selectedSeats = [];
    } else {
      selectedSeats = JSON.parse(localStorage.getItem(this.keySelectedSeats));
    }
    return selectedSeats;
  }

  static getFullSeatsFromStorage() {
    let fullSeats;
    if (localStorage.getItem(this.keyFullSeats) === null) {
      fullSeats = [];
    } else {
      fullSeats = JSON.parse(localStorage.getItem(this.keyFullSeats));
    }
    return fullSeats;
  }

  static getSelectedMovieIndexFromStorage() {
    return localStorage.getItem(this.keySelectedMovie);
  }

  static addSelectedSeatToStorage(indexs) {
    localStorage.setItem(this.keySelectedSeats, JSON.stringify(indexs));
  }
  static addFullSeatToStorage(indexs) {
    localStorage.setItem(this.keyFullSeats, JSON.stringify(indexs));
  }
  static addSelectedMovieToStorage(index) {
    localStorage.setItem(this.keySelectedMovie, JSON.stringify(index));
  }
  static removeLocalStorage() {
    localStorage.removeItem(this.keyFullSeats);
    localStorage.removeItem(this.keySelectedSeats);
    localStorage.removeItem(this.keySelectedMovie);
  }
}
