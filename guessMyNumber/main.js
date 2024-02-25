'use strict';

const message = document.getElementById("message");
const scoreEle = document.getElementById("score");
const highScore = document.getElementById("highScore");
let numberToGuess = getRandomInt();
let score = 20;

function getRandomInt() {
    return Math.floor((Math.random() * 20) + 1);
}

function checkNumber(){
    const number = parseInt(document.getElementById("GuessingNumber").value);

  if(number == numberToGuess){
    message.innerText = '🎉 Correct number'
    document.body.style.backgroundColor = '#66dc66';

    if(highScore.innerText == 0 || highScore.innerText < score){
        highScore.innerText = score;
    }
  }else if(number > numberToGuess){
    score--;
    message.innerText = '📈 Too high!'
    scoreEle.innerText = score;
  }else{
    score--;
    message.innerText = '📉 Too low!'
    scoreEle.innerText = score;

  }
}

function resetGame(){
    score = 20;
    scoreEle.innerText = score;
    numberToGuess = getRandomInt();
    document.body.style.backgroundColor = '';
    document.getElementById("GuessingNumber").value = '';
}