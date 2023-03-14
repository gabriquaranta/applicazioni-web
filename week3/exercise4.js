"use strict";

const dayjs = require("dayjs");
const sqlite3 = require("sqlite3");

// asnwers class
class AnswerClass {
  constructor(response, name, score, date) {
    this.response = response;
    this.name = name;
    this.score = score;
    this.date = date;
  }
}

// question class
class QuestionClass {
  constructor(question, name, date, emptyanswersDB) {
    this.question = question;
    this.name = name;
    this.date = date;
    this.AnswersDB = new sqlite3.Database("emptyAnswersDB");
  }

  add(answer) {
    this.AnswersDB.run("insert into answers values");
  }
}

// main
let q1 = new QuestionClass(
  "what day is it",
  "Gab",
  dayjs("20220307"),
  "qa.sqlite"
);
console.log(q1.question);

q1.add(new AnswerClass("tues", "gab", 3, dayjs("2022-03-07"), "qa.sqlite"));
q1.add(new AnswerClass("mon", "gab", 0, dayjs("2022-03-06"), "qa.sqlite"));
q1.add(new AnswerClass("wed", "gab", 6, dayjs("2022-03-08"), "qa.sqlite"));
