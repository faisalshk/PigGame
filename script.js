'use strict';
/* Cerating a Pig Game 

Understanding the Problem:
1) A pig game is basically a dice game in which there is a score limit of 100  points.
2) the game will always start form player 1 and it only consists of 2 players
3) Player 1 will roll the dice and gets a dice no of 2 which means the score of player_1 is 2 points, Player can roll as many times he wants and the points will add up after that the player_1 can decide if he wants to hold the points or roll again 
4) if the player_1 holds the points then Player_2 will roll the dice and if Player_1 roll again and gets a dice no 1 then he will lose all the points now Player_2 will roll
5) After one round the points of both the players will be displayed in their respective section of TotalScoreboard
6) the one who reaches 100 points first will win the game

Breaking the Problem into Sub Problems:
1) User clicks on a button which says rolldice after a random will generate from 1 to 6, then the number will be displayed onto the screen
2)if the dice roll is one then switch the player else add the dice roll to the current score, then
 display the score
3) user holds the dice add current score to total score
4) if the total score is 100 current player wins the game else switch the player
5) user reset the game then set all the scores to 0 and set player one as starting 

*/

//selecting ELements
const scoreEl_0 = document.querySelector('#score--0');
const scoreEL_1 = document.getElementById('score--1');
const diceEL = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

const currentPlyElm_0 = document.querySelector('#current--0');
const currentPlyElm_1 = document.querySelector('#current--1');

const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');

// //Staring conditions
// scoreEl_0.textContent = 0;
// scoreEL_1.textContent = 0;
// diceEL.classList.add('hidden');
// //TotalScoreboard
// let scores = [0, 0];
// let currentScore = 0;
// //setting activePlayer
// let activePlayer = 0;
// //Declaring  state variable for running the game
// let gameState = true;

let scores, currentScore, activePlayer, gameState;

//creating a resetting function
const init = function () {
  //TotalScoreboard
  scores = [0, 0];
  currentScore = 0;
  //setting activePlayer
  activePlayer = 0;
  //eclaring  state variable for running the game
  gameState = true;

  scoreEl_0.textContent = 0;
  scoreEL_1.textContent = 0;
  currentPlyElm_0.textContent = 0;
  currentPlyElm_1.textContent = 0;

  diceEL.classList.add('hidden');
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
};
init();
//functiion for switching Player
const switchPlayer = function () {
  //reset the the currentScore
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  //Changing the activePlayer
  activePlayer = activePlayer === 0 ? 1 : 0; //if AP is zero then AP will be one and if AP is one then AP will be zero

  //changing the background effect
  player0El.classList.toggle('player--active');
  //the toggel method will check if a particular css classislist is persent or not and if present then it will remove the class mention in the parameter and if not it will add the given classlist mention in the parameter to the given Element.
  player1El.classList.toggle('player--active');
};

// Rooling dice Functionality

btnRoll.addEventListener('click', function () {
  if (gameState) {
    // 1) Generating a Random Number
    const Dice = Math.trunc(Math.random() * 6 + 1);
    console.log(Dice);
    // 2) Display the Dice
    diceEL.classList.remove('hidden');
    diceEL.src = `dice-${Dice}.png`;
    // 3) Check if the Dice value is 1 and if one Switch the player
    if (Dice !== 1) {
      //if dice is not equal to 1
      //add the current score
      currentScore += Dice;
      //display the current score
      // currentPlyElm_0.textContent = currentScore; //Change Later
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
      console.log(currentScore);
    } else {
      //if diece is one switch the player
      switchPlayer();
    }
  }
});

// Hold button Functionality
btnHold.addEventListener('click', function () {
  if (gameState) {
    console.log('Hold button Functionality');
    //1) Adding currentScore to the activePlayer total score
    scores[activePlayer] += currentScore;
    console.log(scores);
    //display the scores
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    //2) Check if the Player TotalScore is >=100
    //Finish the game
    if (scores[activePlayer] >= 10) {
      gameState = false;
      diceEL.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      //Switch the Player
      switchPlayer();
    }
  }
});

btnNew.addEventListener('click', init);
