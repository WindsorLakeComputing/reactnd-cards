import { AsyncStorage } from 'react-native'
import { CARDS_STORAGE_KEY } from './_cards'

export async function saveDeck( deck ) {
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
}

export async function addCardToDeck(deckTitle, card) {
  if(card['question'] && card['answer']){
    let deckOfCards = JSON.parse(await getDecks());
    let deck = deckOfCards[deckTitle];
    deck.push(card);
    await saveDeck(deckOfCards);
    let updatedDeckOfCards = JSON.parse(await getDecks());
  }
}

export function clear() {
  AsyncStorage.clear();
}
