"use strict";

const secretNumber = document.getElementById("secretNumber");
const message = document.getElementById("message");
const scoreEle = document.getElementById("score");
const highScore = document.getElementById("highScore");
let numberToGuess = getRandomInt();
let score = 20;

function getRandomInt() {
  return Math.floor(Math.random() * 20 + 1);
}
function isLosingGame() {
  return score === 0;
}

function displayMessage(messageToDisplay) {
  message.innerText = messageToDisplay;
}

function setHighScore() {
  if (highScore.innerText == 0 || highScore.innerText < score) {
    highScore.innerText = score;
  }
}

function checkNumber() {
  if(isLosingGame()) return;

  const number = parseInt(document.getElementById("GuessingNumber").value);

  if (!number) {
    displayMessage("⛔️ NO number");
  } else if (number == numberToGuess) {
    displayMessage("🎉 Correct number");
    document.body.style.backgroundColor = "#66dc66";
    secretNumber.style.width = "300px";
    secretNumber.innerHTML = numberToGuess;
    setHighScore();
  } else {
    score--;
    const wrongMsg = number < numberToGuess ? "📉 Too low!" : "📈 Too high!";
    displayMessage(isLosingGame() ? "💥 You lost the game" : wrongMsg);
    scoreEle.innerText = score;
  }
}

function resetGame() {
  score = 20;
  scoreEle.innerText = score;
  numberToGuess = getRandomInt();
  document.body.style.backgroundColor = "";
  document.getElementById("GuessingNumber").value = "";
  secretNumber.style.width = "150px";
  secretNumber.innerHTML = '?';
}
