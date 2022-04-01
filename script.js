// Please implement exercise logic here

/**
 * ==============================
 * ==============================
 * Global Variables
 * ==============================
 * ==============================
 */

// boardSize has to be an even number
const boardSize = 4;
const board = [];
let deck = [];

/**
 * ==============================
 * ==============================
 * Helper Functions
 * ==============================
 * ==============================
 */

/**
 * Randomize the index of an array of size (max).
 * @param {number} max size of the array
 * @returns {number} randomized index of the array
 */
const randomizeIndex = (max) => Math.floor(Math.random() * max);

/**
 * Creates a standard 52 card deck.
 * @returns {Array} an array of a standard 52 card deck.
 */
const deckCreator = () => {
  const createdDeck = [];
  const suits = ['Spades', 'Clubs', 'Hearts', 'Diamonds'];
  const suitSymbols = ['♠', '♣', '♥', '♦'];
  for (let i = 0; i < suits.length; i += 1) {
    const currentSuit = suits[i];
    const currentSymbol = suitSymbols[i];
    const currentColour = i < 2 ? 'black' : 'red';
    for (let j = 1; j <= 13; j += 1) {
      const currentRank = j;
      let currentName = j;
      let currentDisplayName = j;
      if (currentRank === 1) {
        currentName = 'Ace';
        currentDisplayName = 'A';
      } else if (currentRank === 11) {
        currentName = 'Jack';
        currentDisplayName = 'J';
      } else if (currentRank === 12) {
        currentName = 'Queen';
        currentDisplayName = 'Q';
      } else if (currentRank === 13) {
        currentName = 'King';
        currentDisplayName = 'K';
      }
      const currentCard = {
        suit: currentSuit,
        symbol: currentSymbol,
        colour: currentColour,
        rank: currentRank,
        name: currentName,
        displayName: currentDisplayName,
      };

      createdDeck.push(currentCard);
    }
  }
  return createdDeck;
};

/**
 * Shuffles an array, simulates a deck shuffling
 * @param {Array} deckToShuffle an array (of decks) to shuffle
 * @returns {Array} a complete shuffled deck
 */
const deckShuffler = (deckToShuffle) => {
  for (let i = 0; i < deckToShuffle.length; i += 1) {
    const currentCard = deckToShuffle[i];
    const randomCardIndex = randomizeIndex(deckToShuffle.length);
    const randomCard = deckToShuffle[randomCardIndex];
    deckToShuffle[i] = randomCard;
    deckToShuffle[randomCardIndex] = currentCard;
  }
  return deckToShuffle;
};

/**
 * Creates the grid of array for the game
 */
const gridCreator = () => {
  const cardToPlace = boardSize * boardSize;
  const cardToDraw = cardToPlace / 2;
  let cardsOnGrid = [];
  for (let i = 0; i < cardToDraw; i += 1) {
    const currentCard = deck.pop();

    // push twice because we need 2 instances of a single card
    cardsOnGrid.push(currentCard);
    cardsOnGrid.push(currentCard);
  }

  cardsOnGrid = deckShuffler(cardsOnGrid);

  for (let i = 0; i < boardSize; i += 1) {
    const rowArray = [];
    for (let j = 0; j < boardSize; j += 1) {
      rowArray.push(cardsOnGrid.pop());
    }
    board.push(rowArray);
  }
};

// debugging codes
if (deck.length === 0) {
  deck = deckShuffler(deckCreator());
  console.log(deck);
}
gridCreator();
console.log(board);

/**
 * ==============================
 * ==============================
 * Handler/Callback Functions
 * ==============================
 * ==============================
 */

/**
 * ==============================
 * ==============================
 * Game Functions
 * ==============================
 * ==============================
 */
