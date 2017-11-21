import { AsyncStorage } from 'react-native'
import { CARDS_STORAGE_KEY } from './_cards'

export async function saveDeck( deck ) {
  console.log("Inside of saveDeck ... deck is ", deck)
    try {
      await AsyncStorage.setItem(CARDS_STORAGE_KEY, JSON.stringify(
        deck));
    } catch (error) {
      console.log("Error saving data" + error);
    }
}

export async function getDecks() {
try {
      let decks = await AsyncStorage.getItem(CARDS_STORAGE_KEY);
      return decks;
    } catch (error) {
      console.log("Error retrieving data" + error);
    }
}

export async function getDeck(deckTitle) {
  let deck = JSON.parse(await getDecks())[deckTitle];
  console.log("getDeck ... deckTitle == ",deck);
  if(deck) {
    return deck;
  }
  else{
    return (deckTitle + ' doesn\'t exist');
  }
}

export async function saveDeckTitle(deckTitle) {
  let decks = JSON.parse(await getDecks())
  decks[deckTitle] = [];
  await saveDeck(decks)
  console.log("Inside of api.js ... saveDeckTitle ... new Decks equals", decks);
}

export async function addCardToDeck(deckTitle, card) {
  console.log("addCardToDeck ");
  if(card['question'] && card['answer']){
    //var deck = JSON.parse(await getDeck(deckTitle));
    let deckOfCards = JSON.parse(await getDecks());
    console.log("Inside of addCardToDeck, deckOfCards == ", deckOfCards);
    let deck = deckOfCards[deckTitle];


    console.log("Inside of addCardToDeck, deck == ", deck);
    console.log("Inside of addCardToDeck, card == ", card);
    console.log("Inside of addCardToDeck, deckOfCards == ", deckOfCards);
    deck.push(card);
    //deckOfCards['deck'][deckTitle] = deck
    console.log("Inside of addCardToDeck, deck AFTER push == ", deck);
    console.log("Inside of addCardToDeck, deckOfCards AFTER push == ", deckOfCards);
    await saveDeck(deckOfCards);
    let updatedDeckOfCards = JSON.parse(await getDecks());
    console.log("NEW ... updatedDeckOfCards == ", updatedDeckOfCards);
  }
}

export function clear() {
  AsyncStorage.clear();
}
