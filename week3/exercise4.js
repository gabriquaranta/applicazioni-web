"use strict";

const dayjs = require("dayjs");
const sqlite3 = require("sqlite3");

const dateformat = "YYYY/MM/DD";

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
  constructor(question, name, date, db) {
    this.question = question;
    this.name = name;
    this.date = date;
    this.db = db;
  }

  async add(ans) {
    await this.db.run(
      "insert into answers(text,respondent,score,date) values (?,?,?,?)",
      [ans.response, ans.name, ans.score, ans.date.format(dateformat)],
      (res, err) => {
        if (err) console.log(res + " ERR_INS");
      }
    );
  }

  async getAll() {
    let query = "select * from answers";

    return new Promise((resolve, reject) => {
      this.db.all(query, [], (err, rows) => {
        if (err) {
          reject(err);
        }
        resolve(rows);
      });
    });
  }

  async find(respondent) {
    let query = "select * from answers where respondent=?";
    return new Promise((resolve, reject) => {
      this.db.all(query, respondent, (err, rows) => {
        if (err) reject(err);
        if (rows) resolve(rows);
      });
    });
  }

  async afterDate(date) {
    let query = "select * from answers where date<?";
    return new Promise((resolve, reject) => {
      this.db.all(query, date, (err, rows) => {
        if (err) reject(err);
        if (rows) resolve(rows);
      });
    });
  }

  async getWorst() {
    let query = "select * from answers order by score asc";
    return new Promise((resolve, reject) => {
      this.db.get(query, (err, rows) => {
        if (err) reject(err);
        if (rows) resolve(rows);
      });
    });
  }
}

function sep() {
  console.log();
}

// MAIN
async function main() {
  //
  let db = new sqlite3.Database("qa.sqlite", (err) => {
    if (err) console.log("ERR_DB");
  });

  let question = new QuestionClass(
    "what day is it",
    "gab",
    dayjs("15-03-2022").format(dateformat),
    db
  );

  //reset db file
  await question.db.run("delete from answers where id>0", (res, err) => {
    if (err) console.log(res + "ERR_DEL");
  });
  await question.db.run(
    "update sqlite_sequence set seq=0 where name=answers",
    (res, err) => {
      if (err) console.log(res + "ERR_DEL");
    }
  );

  let a1 = new AnswerClass("tues", "gab", 3, dayjs("2022-03-18"));
  let a2 = new AnswerClass("mon", "matt", 0, dayjs("2019-03-06"));
  let a3 = new AnswerClass("wed", "sss", 6, dayjs("2023-06-08"));

  await question.add(a1);
  await question.add(a2);
  await question.add(a3);

  sep();
  await question.getAll().then((r) => console.log(r));

  sep();
  let respondent = "gab";
  await question.find(respondent).then((r) => console.log(r));

  sep();
  let qdate = dayjs("2022-03-18").format(dateformat);
  await question.afterDate(qdate).then((r) => console.log(r));

  sep();
  await question.getWorst().then((r) => console.log(r));
}

main();
