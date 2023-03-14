const sqlite = require("sqlite3");

const examDB = new sqlite.Database("exams.sqlite", (err) => {
  if (err) throw err;
});

let result = [];

let sql = "select * from course ";

examDB.all(sql, (err, rows) => {
  if (err) throw err;
  for (let row of rows) {
    console.log(row.code, row.name);
    result.push(row);
  }
});

examDB.close();
