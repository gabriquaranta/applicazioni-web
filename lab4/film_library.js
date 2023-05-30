import dayjs from "dayjs";

class Film {
  constructor(id, title, isFavorite = false, watchDate, rating) {
    this.id = id;
    this.title = title;
    this.favorite = isFavorite;
    this.rating = rating;
    // saved as dayjs object only if watchDate is truthy
    this.watchDate = watchDate && dayjs(watchDate);

    this.toString = () => {
      return (
        `Id: ${this.id}, ` +
        `Title: ${this.title}, Favorite: ${this.favorite}, ` +
        `Watch date: ${this.formatWatchDate("MMMM D, YYYY")}, ` +
        `Score: ${this.formatRating()}`
      );
    };

    this.formatWatchDate = (format) => {
      return this.watchDate ? this.watchDate.format(format) : "<not defined>";
    };

    this.formatRating = () => {
      return this.rating ? this.rating : "<not assigned>";
    };
  }
}

class FilmLibrary {
  constructor() {
    this.list = [];

    // this.print = () => {
    //   console.log("***** List of films *****");
    //   this.list.forEach((item) => console.log(item.toString()));
    // };
    this.all = () => {
      return this.list;
    };

    this.addNewFilm = (film) => {
      if (!this.list.some((f) => f.id == film.id)) this.list.push(film);
      else throw new Error("Duplicate id");
    };

    this.deleteFilm = (id) => {
      const newList = this.list.filter(function (film, index, arr) {
        return film.id !== id;
      });
      this.list = newList;
    };

    this.resetWatchedFilms = () => {
      this.list.forEach((film) => delete film.watchDate);
    };

    this.getRated = () => {
      const newList = this.list.filter(function (film, index, arr) {
        return film.rating > 0;
      });
      return newList;
    };

    this.sortByDate = () => {
      const newArray = [...this.list];
      newArray.sort((d1, d2) => {
        if (!d1.watchDate) return 1; // null/empty watchDate is the lower value
        if (!d2.watchDate) return -1;
        return d1.watchDate.diff(d2.watchDate, "day");
      });
      return newArray;
    };
  }
}

function init_library() {
  // Creating some film entries
  const f1 = new Film(1, "Pulp Fiction", true, "2023-03-10", 5);
  const f2 = new Film(2, "21 Grams", false, "2023-03-17", 4);
  const f3 = new Film(3, "Star Wars", false);
  const f4 = new Film(4, "Matrix", false);
  const f5 = new Film(5, "Shrek", false, "2023-03-21", 3);
  const f6 = new Film(6, "Forrest Gump", false);
  const f7 = new Film(7, "Avatar", false);
  const f8 = new Film(9, "Akira", true, "2023-03-14", 5);
  const f9 = new Film(9, "The Consultant", true, "2023-03-17", 3);

  // Adding the films to the FilmLibrary
  const library = new FilmLibrary();
  library.addNewFilm(f1);
  library.addNewFilm(f2);
  library.addNewFilm(f3);
  library.addNewFilm(f4);
  library.addNewFilm(f5);
  library.addNewFilm(f6);
  library.addNewFilm(f7);
  library.addNewFilm(f8);
  library.addNewFilm(f9);

  return library();

  // // Print Sorted films
  // console.log("***** List of films (sorted) *****");
  // const sortedFilms = library.sortByDate();
  // sortedFilms.forEach((film) => console.log(film.toString()));

  // // Deleting film #3
  // library.deleteFilm(3);

  // // Reset dates
  // library.resetWatchedFilms();

  // // Printing modified Library
  // library.print();

  // // Retrieve and print films with an assigned rating
  // console.log("***** Films filtered, only the rated ones *****");
  // const ratedFilms = library.getRated();
  // ratedFilms.forEach((film) => console.log(film.toString()));

  // // Additional instruction to enable debug
  // debugger;
}

init_library();
