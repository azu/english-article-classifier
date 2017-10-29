"use strict";
const { classifyArticle } = require("./lib/english-article-classifier.js");
console.log(classifyArticle("hour"));
/*
{ type: 'an',
  reason: 'Specific start of words that should be proceeded by \'an\'' }
 */
console.log(classifyArticle("union"));
/*
{ type: 'a',
  reason: 'Special cases where a word that begins with a vowel should be proceeded by \'a\'' }
 */
console.log(classifyArticle("word"));
/*
{ type: 'a',
  reason: 'Other words that begins with a vowel should be proceeded by \'a\'' }
 */
console.log(
    classifyArticle("ZXCVBNM", {
        forceA: ["ZXCVBNM"]
    })
);
/*
{ type: 'a',
  reason: 'User defined words that should be proceeded by \'a\'' }
 */
console.log(
    classifyArticle("ZXCVBNM", {
        forceAn: ["ZXCVBNM"]
    })
);
/*
{ type: 'an',
  reason: 'User defined words that should be proceeded by \'an\'' }
 */
