'use strict';

//Selecting DOM Elements
const Player1 = document.querySelector('.player_1');
const Player2 = document.querySelector('.player_2');

const diceElement = document.querySelector('.dice');

const buttonRollDice = document.querySelector('.btn_roll');
const buttonNewGame = document.querySelector('.btn_new');
const buttonHoldGame = document.querySelector('.btn_hold');

//Funtion to initialize a new game
const InitialNewGame = function () {
  //Initializing Game
  diceElement.classList.add('hidden');

  //Setting default values
  scores = [0, 0]; //scores[0]: Player1's score & scores[1]: Player2's score
  activePlayer = 1; //Player1 will start the game
  currentScore = 0;
  playing = true; //Game is in progress

  document.querySelector('#score_1').textContent = '0';
  document.querySelector('#score_2').textContent = '0';
  document.querySelector('#current_1').textContent = '0';
  document.querySelector('#current_2').textContent = '0';

  //If a winner is declared then its 'player_winner' class should be removed
  Player1.classList.remove('player_winner');
  Player2.classList.remove('player_winner');

  //If player2 was active in the previous game but for the new game only initialize player1 as active
  Player1.classList.add('player_active');
  Player2.classList.remove('player_active');
};

let scores = [0, 0];
let activePlayer = 1;
let currentScore = 0;
let playing = true;

InitialNewGame();

const playerSwitch = function () {
  //Setting current game score of the previously active player to 0
  document.querySelector(`#current_${activePlayer}`).textContent = '0';
  //If the previously player1 was active then now switch to player2 or viceversa
  activePlayer = activePlayer === 1 ? 2 : 1;
  //Initialing current score to 0 because the new player will start his/her turn
  currentScore = 0;

  //Changing background of active players
  document.querySelector('.player_1').classList.toggle('player_active');
  document.querySelector('.player_2').classList.toggle('player_active');
};

//Function for clicking 'Roll Dice' button
buttonRollDice.addEventListener('click', function () {
  //If game is in progress
  if (playing) {
    //Generating random number between 1 to 6 (Rolling Dice)
    const randomNum = Math.trunc(Math.random() * 6) + 1;

    //Viewing dice on the screen
    diceElement.classList.remove('hidden');
    diceElement.src = `./Dice Images/dice-${randomNum}.png`;

    //Adding the value of dice to the score
    if (randomNum !== 1) {
      //Adding score to the current game score
      currentScore = currentScore + randomNum;
      //Displaying score to the screen
      document.querySelector(`#current_${activePlayer}`).textContent =
        currentScore;
    } else {
      //Calling function to switch the player
      playerSwitch();
    }
  }
});

//Function for clicking 'Hold' button
buttonHoldGame.addEventListener('click', function () {
  if (playing) {
    //Add the current score to player's total score
    scores[activePlayer - 1] = scores[activePlayer - 1] + currentScore;
    document.querySelector(`#score_${activePlayer}`).textContent =
      scores[activePlayer - 1];

    //If the goal of 100 points is achieved then finish the game and declare the winner
    if (scores[activePlayer - 1] >= 100) {
      //Changing to false to disable the use 'Roll Dice' and 'Hold' buttons
      playing = false;

      //Hide the Dice
      diceElement.classList.add('hidden');

      //Add the winner class to the winning player
      document
        .querySelector(`.player_${activePlayer}`)
        .classList.add('player_winner');
      //Removing the active player class from the player
      document
        .querySelector(`.player_${activePlayer}`)
        .classList.remove('player_active');
    } else {
      //Switch the player
      playerSwitch();
    }
  }
});

//Function for clicking 'New Game' button
buttonNewGame.addEventListener('click', function () {
  //Initialize New game
  InitialNewGame();
});
