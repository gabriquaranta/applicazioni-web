"use strict";

const dayjs = require("dayjs");
const sqlite3 = require("sqlite3");
const timers = require("timers");

// asnwers class
class AnswerClass {
  constructor(id, response, name, score, date) {
    this.id = id;
    this.response = response;
    this.name = name;
    this.score = score;
    this.date = date;
  }
}

// question class
class QuestionClass {
  constructor(question, name, date, db) {
    this.question = question;
    this.name = name;
    this.date = date;
    this.db = db;

    console.log(this.db);
  }

  add = (answerObj) => {
    let query = "insert into answers values ";
    query = query + answerObj.id + ", ";
    query = query + answerObj.response + ", ";
    query = query + answerObj.name + ", ";
    query = query + answerObj.score + ", ";
    query = query + answerObj.date;

    console.log(query);

    this.db.run(query, (err) => {
      if (err) console.log("err_add");
    });
  };
}

let main = () => {
  let ansId = 0;
  let db = new sqlite3.Database("qa.sqlite", (err) => {
    if (err) console.log("err_db");
    else console.log("q1 db linked");
  });

  db.run(
    "CREATE TABLE if not exists answers (id INTEGER PRIMARY KEY AUTOINCREMENT, text TEXT, respondent TEXT, score INTEGER, date DATE);",
    (err) => {
      if (err) console.log("err_create");
      else console.log("q1db answers table created");
    }
  );

  db.run("insert into answers values 0,ans,name,1,2020/02/01", (err) => {
    if (err) console.log("err_ins");
    else console.log("q1db answers table created");
  });

  let q1 = new QuestionClass("what day is it", "Gab", dayjs("20220307"), db);
  //console.log(q1.question);

  /*
timers.setInterval(() => {
  q1.add(
    new AnswerClass(
      ansId,
      "tues",
      "gab",
      3,
      dayjs("2022-03-07").format("DD/MM/YYYY")
    )
  );
  ansId++;
}, 2000);


q1.add(
  new AnswerClass(
    ansId,
    "mon",
    "gab",
    0,
    dayjs("2022-03-06").format("DD/MM/YYYY")
  )
);
ansId++;
q1.add(
  new AnswerClass(
    ansId,
    "wed",
    "gab",
    6,
    dayjs("2022-03-08").format("DD/MM/YYYY")
  )
);
ansId++;
*/

  db.close();
};

main();
