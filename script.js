"use strict";
// https://jacintodesign.github.io/quotes-api/data/quotes.json

const quoteContainer = document.querySelector(".quote__container");
const quoteAuthur = document.querySelector(".quote__authur-content");
const quoteContent = document.querySelector(".quote__content");
//btns
const btnNewQuote = document.querySelector(".btn__newquote");
const btnTweet = document.querySelector(".btn__tweet");
const spinner = document.querySelector(".loader");

spinner.hidden = true;

let quotes = [];
let quote;

// Spinner loads
const loadSpinner = function () {
  spinner.hidden = false;
  quoteContainer.hidden = true;
};

const loadSpinnerEnd = function () {
  spinner.hidden = true;
  quoteContainer.hidden = false;
};

// generate a new quote
const newQuote = function () {
  const randonNumber = Math.floor(Math.random() * quotes.length);
  quote = quotes[randonNumber];
  console.log(quote);

  if (quote.text.length > 120) {
    quoteContent.classList.add("long__quote");
  } else quoteContent.classList.remove("long__quote");
  loadSpinnerEnd();
  quoteContent.textContent = quote.text;
  quoteAuthur.textContent = quote.author;
};

// fetch quote from api and run new quote
const getQuotes = async function () {
  loadSpinner();
  const API_URL = `https://jacintodesign.github.io/quotes-api/data/quotes.json`;
  const res = await fetch(API_URL);
  const data = await res.json();
  quotes = data.flat();
  newQuote();
};

// tweet quote
const tweet = function () {
  window.open(
    `https://twitter.com/intent/tweet?text=${quote.text} - ${quote.author}`
  );
  console.log(`tweet`);
};

getQuotes();

// event listeners
btnNewQuote.addEventListener("click", newQuote);
btnTweet.addEventListener("click", tweet);
