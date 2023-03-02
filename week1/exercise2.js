/* Exercise 2: My Users' List

Goal: basic handling of JavaScript strings

Develop a small JS program to manage the list of users in a Q&A website.

    Define the names of users as a comma-separated list.
    For instance: "Luigi De Russis, Luca Mannella, Fulvio Corno, Juan Pablo Saenz Moreno, Enrico Masala, Antonio Servetti, Eros Fani"
    Parse the string and create an array containing one name per array position.
    Beware: no extra spaces should be present.
    Create a second array by computing the acronyms of the people as the initial letters of the name. Acronyms should be in all-capital letters.
    For example, Luigi De Russis -> LDR.
    Print the resulting list of acronyms and the full names.
    Extra: in alphabetical order of acronym.
 */

"use strict"

let users="Luigi De Russis, Luca Mannella, Fulvio Corno, Juan Pablo Saenz Moreno, Enrico Masala, Antonio Servetti, Eros Fani";

//split to array
let users_array=users.split(", ");

//removes space from inside names
for (let i=0;i<users_array.length;i++){
    users_array[i]=users_array[i].replace(" ","");
}

console.log(users_array);