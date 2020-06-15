/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, roundScore, activePlayer, gamePlaying;

//Starting the game exists as a function
init();

//To add an event listener, we simply type "addEventListener", and then we add the particular event in the parthenses. A callback function is "btn", because it calls the function for us. We also have the option of creating a function after 'click' and writing the function within the callback.

document.querySelector('.btn-roll').addEventListener('click', function() {
    if(gamePlaying) {
//1. Need a random number
    //to roll a dice, we use the math operator. The .floor makes sure it is a whole number, and the Math.random generates a random number (in this case, from 0-5). The + 1 corrects this, making it generate a random number from 1-6.
    var dice = Math.floor(Math.random() * 6) + 1;

    //2. display the result
    var diceDOM = document.querySelector('.dice');
    diceDOM.style.display = 'block';
    diceDOM.src = 'dice-' + dice + '.png';

    //3. Update the round score if the rolled number was not a 1
    if (dice !== 1) {
        //add score
        roundScore += dice;
        document.querySelector('#current-' + activePlayer).textContent = roundScore;
    } else {nextPlayer();}
    }

    
});

document.querySelector('.btn-hold').addEventListener('click', function() {
    if (gamePlaying) {
    //This is meant to add the current score to the global score
    scores[activePlayer] += roundScore;

    // Update the UI
    document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

    // Check if player won the game
    if (scores[activePlayer] >= 100) {
        document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
        document.querySelector('dice').style.display = 'none';
        document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
        document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
        gamePlaying = false;
    } else {
        nextPlayer();
    }
    }
    
});

function nextPlayer() {
//Next Player, this follows the DRY method
activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
roundScore = 0;

document.getElementById('current-0').textContent = '0';
document.getElementById('current-1').textContent = '0';
document.querySelector('.player-0-panel').classList.toggle('active');
document.querySelector('.player-1-panel').classList.toggle('active');

document.querySelector('.dice').style.display = 'none';
//document.querySelector('.player-0-panel').classList.remove('active');
//document.querySelector('.player-1-panel').classList.add('active');
};

document.querySelector('.btn-new').addEventListener('click', init
);

function init() {
    scores = [0, 0];
    activePlayer = 0;
    roundScore = 0;

    //We can also use the Query Selector to change CSS. In this case, we want the dice to disappear before anyone rolls the dice.
    document.querySelector('.dice').style.display = 'none';

    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';
    
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
};

//INSTRUCTIONS

/* First Things */

//document gives us access to the DOM, and querySelector allows us to select items the same way we select things in CSS. We want to update the number on the player within the index.html file, so we grab the ID.


//This is called a setter, because it sets a value.
//document.querySelector('#current-' + activePlayer).textContent = dice;

//This is called a getter, because it gathers the information.
//var x = document.querySelector('#score-0').textContent;
//console.log(x);

//By using innerHTML, we override the limitations of textContent, and can actually update the HTML.
//document.querySelector('#current-' + activePlayer).innerHTML = '<em>' + dice + '</em>';