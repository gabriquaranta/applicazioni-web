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
  constructor(question, name, date, db) {
    this.question = question;
    this.name = name;
    this.date = date;
    this.db = db;
  }

  async add(ans) {
    await this.db.run(
      "insert into answers(text,respondent,score,date) values (?,?,?,?)",
      [ans.response, ans.name, ans.score, ans.date.format("DD/MM/YYYY")],
      (res, err) => {
        if (err) console.log(res + " ERR_INS");
      }
    );
  }

  async getAll() {
    await this.db.all("select * from answers", [], (err, rows) => {
      if (err) throw err;
      return rows;
    });
  }
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
    dayjs("15-03-2022").format("YYYY/MM/DD"),
    db
  );

  let a1 = new AnswerClass("tues", "gab", 3, dayjs("2022-03-18"));
  let a2 = new AnswerClass("mon", "gab", 0, dayjs("2019-03-06"));
  let a3 = new AnswerClass("wed", "gab", 6, dayjs("2023-06-08"));

  await question.db.run("delete from answers where id>0", (res, err) => {
    if (err) console.log(res + "ERR_DEL");
  });

  await question.add(a1);
  await question.add(a2);
  await question.add(a3);

  console.log(await question.getAll().toString()); //RETURN promise NEED check resolution
}

main();
