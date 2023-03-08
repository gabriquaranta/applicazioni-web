"use strict";

const dayjs = require("dayjs");

class Film {
  constructor(id, title, fav, date, rating) {
    this.id = id;
    this.title = title;
    this.isFavorite = false;
    if (fav) this.isFavorite = fav;
    if (date) this.date = date;
    if (rating) this.rating = rating;
  }
}

class FilmLibrary {
  constructor() {
    this.movies = [];
  }

  addNewFilm(film) {
    this.movies.push(film);
  }

  sortByDate() {
    return this.movies
      .filter((m) => (m.date ? true : false))
      .sort((m1, m2) => (m1.date.isBefore(m2.date) ? -1 : 1))
      .concat(this.movies.filter((m) => (m.date ? false : true)));
  }

  deleteFilm(id) {
    this.movies = this.movies.filter((m) => m.id != id);
  }

  resetWatchedFilms() {
    this.movies.forEach((m) => (m.date = null));
  }

  getRated() {
    console.log(this.movies.filter((m) => m.rating).map((m) => m.title));
  }
}

// main
const mylibrary = new FilmLibrary();
mylibrary.addNewFilm(
  new Film("1", "PulpFiction", false, dayjs("2023-03-10"), 5)
);
mylibrary.addNewFilm(new Film("2", "Avengers", false, dayjs("2023-02-5"), 4));
mylibrary.addNewFilm(new Film("3", "TheLighthouse", true, null, 3));
mylibrary.addNewFilm(new Film("4", "Matrix", true, null, null));
mylibrary.addNewFilm(new Film("5", "Akira", true, dayjs("2023-03-01"), null));

//console.log(mylibrary.movies);
console.log(mylibrary.sortByDate().map((m) => m.title));

//mylibrary.deleteFilm(4);
//console.log(mylibrary.sortByDate().map((m) => m.title));

//mylibrary.resetWatchedFilms();
//console.log(mylibrary.sortByDate().map((m) => m.date));

mylibrary.getRated();
