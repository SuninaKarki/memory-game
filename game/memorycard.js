// array of pairs of the card values
const cardValues = ["A", "B", "C", "D", "E", "F", "G", "H"];
const cardPairs = [...cardValues, ...cardValues];
console.log(cardPairs);

// shuffle the array to randomize card positions
const shuffledPairs = shuffleArray(cardPairs);

// create the game board
const gameBoard = document.getElementById("game-board");
createGameBoard(shuffledPairs);

// function to shuffle an array using Fisher-Yates algorithm
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// function to create the game board
function createGameBoard(cards) {
    cards.forEach((value, index) => {
        const card = document.createElement("div");
        card.classList.add("card", "hidden");
        card.dataset.index = index;
        card.innerText = value;
        card.addEventListener("click", revealCard);
        gameBoard.appendChild(card);
    });
}

let flippedCards = [];
let matchedPairs = 0;

// function to handle card click
function revealCard() {
    const selectedCard = this;
    if (selectedCard.classList.contains("hidden") && flippedCards.length < 2) {
        selectedCard.classList.remove("hidden");
        flippedCards.push(selectedCard);
        if (flippedCards.length === 2) {
            setTimeout(checkMatch, 500);
        }
    }
}

// function to check if the flipped cards match
function checkMatch() {
    const [card1, card2] = flippedCards;
    if (card1.innerText === card2.innerText) {
        // Matched cards
        card1.removeEventListener("click", revealCard);
        card2.removeEventListener("click", revealCard);
        matchedPairs++;
        if (matchedPairs === cardPairs.length / 2) {
            // All pairs matched, game over logic
            console.log("Game Over!");
        }
    } else {
        // Not matched, hide cards
        card1.classList.add("hidden");
        card2.classList.add("hidden");
    }
    // Reset flippedCards array
    flippedCards = [];
}
