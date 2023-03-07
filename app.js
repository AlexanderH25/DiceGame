'use strict';

// Selecting elements
const score0Box = document.querySelector('#score--0');
const score1Box = document.querySelector('#score--1');
const player1Score = document.querySelector('#current--0')
const player2Score = document.querySelector('#current--1')
const playerSection0 = document.querySelector('.player--0');
const playerSection1 = document.querySelector('.player--1');

const dice = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnHold = document.querySelector('.btn--hold');
const BtnRoll = document.querySelector('.btn--roll');
const btnReset = document.querySelector('.btn--new')

score0Box.textContent = 0;
score1Box.textContent = 0;
dice.classList.add('hidden');

let totalScore = [0,0];
let currentScore = 0;
let activePlayer = 0;
let playing = true;

function switchPlayer() {
    document.querySelector(`#current--${activePlayer}`).textContent = 0;
    activePlayer = activePlayer === 0 ? 1 : 0
    currentScore = 0;
    playerSection0.classList.toggle('player--active');
    playerSection1.classList.toggle('player--active');
}

//Rolling dice functionallity
BtnRoll.addEventListener('click', () => {
    if(playing) {
        let diceNumber = 1 + Math.trunc(Math.random()* 5);

        dice.classList.remove('hidden');
        dice.src = `Dice/dice-${diceNumber}.png`;

        if(diceNumber !== 1) {
            currentScore += diceNumber;
            document.querySelector(`#current--${activePlayer}`).textContent = currentScore;
        } else {
            // Switch players
            switchPlayer();
        }
    }
})

btnHold.addEventListener('click', () => {
    if(playing) {
        // add current score to active player
        totalScore[activePlayer] += currentScore;
        document.querySelector(`#score--${activePlayer}`).textContent = totalScore[activePlayer]
        //check if player's score is > 100
        if(totalScore[activePlayer] >= 100) {
            document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
            document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
            playing = false;
            dice.classList.add('hidden');
        } else {
            //switch to the next player
            switchPlayer();
        }
    }
})

btnReset.addEventListener('click', () => {
    totalScore = [0,0];
    currentScore = 0;
    
    score0Box.textContent = 0;
    score1Box.textContent = 0;
    player1Score.textContent = 0;
    player2Score.textContent = 0;

    document.querySelector(`.player--${activePlayer}`).classList.remove('player--winner');
    activePlayer = 0;
    document.querySelector(`.player--${activePlayer}`).classList.add('player--active');
    dice.classList.remove('hidden');
    playing = true;
})