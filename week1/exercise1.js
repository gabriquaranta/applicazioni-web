/* Exercise 1: Better Scores

Goal: basic handling of JavaScript arrays

Develop a small JavaScript program to manage the scores given to your user in a question-and-answer website (e.g., StackOverflow). Scores are integer numbers, and they may be negative. You should:

    Define an array with all the scores you received in chronological order. For the moment:
        Embed the scores directly in the source code.
        Ignore the question, answer, and date that generated the score.
    Duplicate the array, but:
        Eliminate all negative scores (call NN the number of negative scores that are deleted).
        Eliminate the two lowest-ranking scores.
        Add NN+2 new scores, at the end of the array, with a value equal to the (rounded) average of the existing scores.
    Print both arrays, comparing the scores before and after the "improvement," and showing the averages in both cases.
 */

"use strict";

//ratings
let ratings = [9, -24, 82, -83, -39, 89, 5, 84, 75, -92];

//copy and filter ratings for only positive values
let ratings_filtered = ratings.filter((score) => score > 0);

//calculate number of negative as diff of size
let NN = ratings.length - ratings_filtered.length;

//calc average = sum(score)/number of scores
let avg_ratings_filtered = Math.round(
  ratings_filtered.reduce((r1, r2) => r1 + r2) / ratings_filtered.length
);

//add NN+2 new ratings with value=avg
for (let i = 0; i < NN + 2; i++) {
  ratings_filtered.push(avg_ratings_filtered);
}

// evaluate new averages for original and new
let avg_original = Math.round(
  ratings.reduce((r1, r2) => r1 + r2) / ratings.length
);

avg_ratings_filtered = Math.round(
  ratings_filtered.reduce((r1, r2) => r1 + r2)/ratings_filtered.length
);

//print values
console.log("\n" + avg_original + "\n" + avg_ratings_filtered);
