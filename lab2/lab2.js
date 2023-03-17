"use strict";

const dayjs = require("dayjs");
const sqlite3 = require("sqlite3");

const dateformat = "YYYY/MM/DD";

class Film {
  constructor(id, title, fav, date, rating) {
    this.id = id;
    this.title = title;
    this.isFavorite = 0;
    if (fav) this.isFavorite = fav;
    if (date) this.date = dayjs(date).format(dateformat);
    if (rating) this.rating = rating;
  }
}

class FilmLibrary {
  constructor(dbPath) {
    this.db = new sqlite3.Database(dbPath, (err) => {
      if (err) throw err;
    });
  }

  async all() {
    let query = "select * from films";
    return new Promise((resolve, reject) => {
      this.db.all(query, (err, rows) => {
        if (err) reject(err);
        let arr = [];
        if (rows) {
          rows.forEach((r) =>
            arr.push(new Film(r.id, r.title, r.favorite, r.watchdate, r.rating))
          );
          resolve(arr);
        }
      });
    });
  }

  async favorites() {
    let query = "select * from films where favorite=1";
    return new Promise((resolve, reject) => {
      this.db.all(query, (err, rows) => {
        if (err) reject(err);
        let arr = [];
        if (rows) {
          rows.forEach((r) =>
            arr.push(new Film(r.id, r.title, r.favorite, r.watchdate, r.rating))
          );
          resolve(arr);
        }
      });
    });
  }

  async watchedToday() {
    let query = "select * from films where watchdate=?";
    let watchdate = dayjs().format(dateformat).toString();
    return new Promise((resolve, reject) => {
      this.db.all(query, watchdate, (err, rows) => {
        if (err) reject(err);
        let arr = [];
        if (rows) {
          rows.forEach((r) =>
            arr.push(new Film(r.id, r.title, r.favorite, r.watchdate, r.rating))
          );
          resolve(arr);
        }
      });
    });
  }

  async watchedBefore(date) {
    let query = "select * from films where watchdate<?";
    let watchdate = date;
    return new Promise((resolve, reject) => {
      this.db.all(query, watchdate, (err, rows) => {
        if (err) reject(err);
        let arr = [];
        if (rows) {
          rows.forEach((r) =>
            arr.push(new Film(r.id, r.title, r.favorite, r.watchdate, r.rating))
          );
          resolve(arr);
        }
      });
    });
  }

  async ratingGT(score) {
    let query = "select * from films where rating>?";
    return new Promise((resolve, reject) => {
      this.db.all(query, score, (err, rows) => {
        if (err) reject(err);
        let arr = [];
        if (rows) {
          rows.forEach((r) =>
            arr.push(new Film(r.id, r.title, r.favorite, r.watchdate, r.rating))
          );
          resolve(arr);
        }
      });
    });
  }

  async titleContains(string) {
    let query = "select * from films where title like ?";
    return new Promise((resolve, reject) => {
      this.db.all(query, "%" + string + "%", (err, rows) => {
        if (err) reject(err);
        let arr = [];
        if (rows) {
          rows.forEach((r) =>
            arr.push(new Film(r.id, r.title, r.favorite, r.watchdate, r.rating))
          );
          resolve(arr);
        }
      });
    });
  }

  async store(film) {
    let query =
      "insert or ignore into films(id,title,favorite,watchdate,rating) values (?,?,?,?,?)";
    let par = [
      film.id,
      film.title,
      film.favorite,
      dayjs(film.watchdate).format(dateformat).toString(),
      film.rating,
    ];
    await this.db.run(query, par, (err) => {
      if (err) throw err;
      else console.log("\ninserted", film);
    });
  }

  async delete(filmid) {
    let query = "delete from films where id=?";
    await this.db.run(query, filmid, (err) => {
      if (err) throw err;
      else console.log("\ndeleted", filmid);
    });
  }

  async resetDates() {
    let query = "update films set watchdate=null where id>=0";
    await this.db.run(query, (err) => {
      if (err) throw err;
      else console.log("\nresetted");
    });
  }
}

async function main() {
  let dbPath = "films.db";
  let library = new FilmLibrary(dbPath);

  console.log("\n", await library.all());
  console.log("\n", await library.favorites());
  console.log("\n", await library.watchedToday());
  console.log("\n", await library.watchedBefore("2023-03-17".toString()));
  console.log("\n", await library.ratingGT(4));
  console.log("\n", await library.titleContains("trix"));

  library.store(new Film(6, "Akira", 1, "15-02-2023", 5));
  library.delete(6);
}

main();
