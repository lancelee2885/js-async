"use strict"

const BASE_URL = "http://deckofcardsapi.com/api/deck";
let DECK_ID = undefined;

async function getNewDeck() {
  let response = await axios.get(`${BASE_URL}/new/shuffle/?deck_count=1`);
  DECK_ID = response.data.deck_id;
  // console.log("new deck")
  return DECK_ID;
}

async function shuffleDeck() {
  await axios.get(`${BASE_URL}/${DECK_ID}/shuffle/`);
}

async function getCard() {
  let response = await axios.get(`${BASE_URL}/${DECK_ID}/draw/?count=1`);
  return response.data;
}

async function displayCard() {
  if (!DECK_ID) {
    await getNewDeck();
  }
  let card = await getCard()
  if (+card.remaining === 0) {
    await shuffleDeck();
    console.log("shuffled deck");
  }
  $(".cards").empty();
  $(".cards").append(`<image src=${card.cards[0].image}>`);
}


// $(".deck-button").on("click", getNewDeck)
$(".card-button").on("click", displayCard);