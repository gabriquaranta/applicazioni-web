"use strict";

let msg = "Hello World!";
console.log(msg+"\n");

let book = {
  author: "Enrico",
  pages: 340,
  chapterPages: [90, 50, 60, 140],
};
for (const prop in book) //good pratice to put const var instead of let var, so it raises errors if the var is modified during the loop
  console.log(`${prop} = ${book[prop]}`);

console.log("");

let keys=Object.keys(book); //array of keys
let entries=Object.entries(book); //array of KV pairs

console.log("");

//copia tutte prop numerabili 
let bookcopy=Object.assign({},book);
console.log(bookcopy);


//DAYJS test
