"use strict";

// import dayjs
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
    return this.AnswersList.filter((ans) => ans.name() == name);
  }

  // asnwers after a given date supposing format is yyyy/mm/dd
  afterDate(date) {
    return this.AnswersList.filter((ans) => ans.date > date);
  }

  // returns an array of Answers, sorted by increasing date
  listByDate() {
    return this.AnswersList.sort((a1, a2) => (a1.date < a2.date ? -1 : 1));
  }

  // returns an array of Answers, sorted by increasing score
  listByScore() {
    return this.AnswersList.sort((a1, a2) => a1.score - a2.score);
  }
}

// main
const q1 = new QuestionClass("what day is it", "Gab", "2022/03/7");

console.log(q1.question);

q1.addAnswer(new AnswerClass("tues", "gab", 3, "2022-03-07"));
q1.addAnswer(new AnswerClass("mon", "gab", 0, "2022-03-06"));

console.log(q1.listByDate());
