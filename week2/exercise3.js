"use strict";

// dayjs library
const dayjs = require("dayjs");

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
  constructor(question, name, date) {
    this.question = question;
    this.name = name;
    this.date = date;
    this.AnswersList = [];
  }

  // add answ to list
  addAnswer(ans) {
    this.AnswersList.push(ans);
  }

  // find all answers by one person for this question
  findAll(name) {
    return this.AnswersList.filter((ans) => ans.name == name);
  }

  // asnwers after a given date supposing format is yyyy/mm/dd
  afterDate(date) {
    return this.AnswersList.filter((ans) => ans.date.isAfter(date));
  }

  // returns an array of Answers, sorted by increasing date
  listByDate() {
    return this.AnswersList.sort((a1, a2) =>
      a1.date.isBefore(a2.date) ? -1 : 1
    );
  }

  // returns an array of Answers, sorted by increasing score
  listByScore() {
    return this.AnswersList.sort((a1, a2) => a1.score - a2.score);
  }

  averageScore() {
    return (
      this.AnswersList.map((a) => a.score).reduce((a1, a2) => a1 + a2) /
      this.AnswersList.length
    );
  }
}

// main
let q1 = new QuestionClass("what day is it", "Gab", dayjs("20220307"));
console.log(q1.question);

q1.addAnswer(new AnswerClass("tues", "gab", 3, dayjs("2022-03-07")));
q1.addAnswer(new AnswerClass("mon", "gab", 0, dayjs("2022-03-06")));
q1.addAnswer(new AnswerClass("wed", "gab", 6, dayjs("2022-03-08")));

console.log(q1.listByDate());

console.log(q1.averageScore());
