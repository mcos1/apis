let deckId;
let computerScore = 0;
let myScore = 0;
const cardsContainer = document.getElementById("cards");
const newDeckBtn = document.getElementById("new-deck");
const drawCardsBtn = document.getElementById("draw-cards");
const cardOne = cardsContainer.children[0];
const cardTwo = cardsContainer.children[1];
const winnerMessage = document.getElementById("winner-message");
let cardsRemaining = document.getElementById("cards-remaining");
const computerScoreEl = document.getElementById("computer-score");
const myScoreEl = document.getElementById("my-score");

function handleClick() {
  fetch("https://apis.scrimba.com/deckofcards/api/deck/new/shuffle/")
    .then((res) => res.json())
    .then((data) => {
      cardsRemaining.innerText = `Remaining Cards: ${data.remaining}`;
      deckId = data.deck_id;
      console.log(data.cards);
    });
}

newDeckBtn.addEventListener("click", handleClick);

drawCardsBtn.addEventListener("click", () => {
  fetch(`https://apis.scrimba.com/deckofcards/api/deck/${deckId}/draw/?count=2`)
    .then((res) => res.json())
    .then((data) => {
      cardsRemaining.innerText = `Remaining Cards ${data.remaining}`;
      cardOne.innerHTML = `
      <img src=${data.cards[0].image} class="card">
        `;
      cardTwo.innerHTML = `
        <img src=${data.cards[1].image} class="card">
            `;
      const winnerText = determineCardWinner(data.cards[0], data.cards[1]);
      console.log(winnerText);

      if (data.remaining === 0) {
        drawCardsBtn.disabled = true;
        if (computerScore > myScore) {
          winnerMessage.innerText = "Computer wins war!";
        } else if (myScore > computerScore) {
          winnerMessage.innerText = "You win war!";
        } else {
          winnerMessage.innerText = "Its a tie!";
        }
      }
    });
});

function determineCardWinner(card1, card2) {
  const valueOptions = [
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "JACK",
    "QUEEN",
    "KING",
    "ACE",
  ];
  const cardOneValueIndex = valueOptions.indexOf(card1.value);
  const cardTwoValueIndex = valueOptions.indexOf(card2.value);
  console.log("card1: ", cardOneValueIndex);
  console.log("card2: ", cardTwoValueIndex);
  if (cardOneValueIndex > cardTwoValueIndex) {
    winnerMessage.innerHTML = "Computer wins!";
    computerScore++;
    computerScoreEl.textContent = `Computer Score: ${computerScore}`;
    return "Computer wins!";
  } else if (cardOneValueIndex === cardTwoValueIndex) {
    winnerMessage.innerHTML = "War!";
    return "War";
  } else {
    winnerMessage.innerHTML = "You win!";
    myScore++;
    myScoreEl.textContent = `My Score: ${myScore}`;
    return "You win!";
  }
}
