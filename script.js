// Please implement exercise logic here

/**
 * ==============================
 * ==============================
 * Global Variables
 * ==============================
 * ==============================
 */

// DOM stuff
const boardDiv = document.createElement('div');
const infoDiv = document.createElement('div');

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
 * ==============================
 * ==============================
 * Handler/Callback Functions
 * ==============================
 * ==============================
 */

/**
 * handler function on card click
 * @param {number} row the row of card that are clicked
 * @param {number} column the column of card that are clicked
 */
const cardClickHandler = (row, column) => {
  const rowElementArray = document.getElementsByClassName('cardRow');
  const cardElementArray = rowElementArray[row].getElementsByClassName('card');
  const clickedCard = cardElementArray[column];
  clickedCard.innerHTML = '';

  const cardNameDiv = document.createElement('div');
  cardNameDiv.classList.add('name', board[row][column].colour);
  cardNameDiv.innerText = board[row][column].displayName;

  const cardSymbolDiv = document.createElement('div');
  cardSymbolDiv.classList.add('symbol', board[row][column].colour);
  cardSymbolDiv.innerText = board[row][column].symbol;

  clickedCard.append(cardNameDiv);
  clickedCard.append(cardSymbolDiv);

  setTimeout(() => {
    clickedCard.innerHTML = '';
  }, 5000);
};

/**
 * ==============================
 * ==============================
 * Game Functions
 * ==============================
 * ==============================
 */

/**
 * Creates the grid of array for the game
 */
const gridCreator = () => {
  if (boardSize % 2 === 1) {
    alert('can\'t make game because boardSize is an odd number');
    return;
  }
  if (boardSize > 10) {
    alert('board size too big for only one deck of cards');
    return;
  }

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

/**
 * Creates UI for a grid in the game
 */
const gridUICreator = () => {
  for (let i = 0; i < board.length; i += 1) {
    const cardRowDiv = document.createElement('div');
    cardRowDiv.className = 'cardRow';
    for (let j = 0; j < board[i].length; j += 1) {
      const cardDiv = document.createElement('div');
      cardDiv.className = 'card';

      cardDiv.addEventListener('click', () => { cardClickHandler(i, j); });

      // this is what you add if you want to display the cards
      // const cardNameDiv = document.createElement('div');
      // cardNameDiv.classList.add('name', board[i][j].colour);
      // cardNameDiv.innerText = board[i][j].displayName;

      // const cardSymbolDiv = document.createElement('div');
      // cardSymbolDiv.classList.add('symbol', board[i][j].colour);
      // cardSymbolDiv.innerText = board[i][j].symbol;

      // cardDiv.append(cardNameDiv);
      // cardDiv.append(cardSymbolDiv);
      cardRowDiv.append(cardDiv);
    }
    boardDiv.append(cardRowDiv);
  }
  document.body.append(boardDiv);
};

const gameInit = () => {
  if (deck.length === 0) {
    deck = deckShuffler(deckCreator());
    console.log(deck);
  }
  gridCreator();
  gridUICreator();
  infoDiv.innerText = "let's play match game!";
  document.body.append(infoDiv);
  console.log(board);
};
gameInit();
