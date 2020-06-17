/*
Dice GAME - RULES:
- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- BUT, if the player rolls two 6's in a row, all his ROUND score gets lost.
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLOBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game
*/


/* STEP 1: Set the game variables and game initialization
1. We can declare all of the needed variables together (without defining them)
2. We create the init function to set everything to 0 at the beginning of a new game
3. We call the init function immediately upon the game beginning
4. We use the nextPlayer function twice in the game, so we create a nextPlayer function to stay within the DRY principle.
*/
var scores, roundScore, activePlayer, dice, diceDOM, gamePlaying, lastDice, winningScore;

init();

/* STEP 2: Event Listener when the dice is rolled
1. We use a querySelector to grab the CSS
2. We use an eventListener to set the parameters. To add an event listener, we simply type "addEventListener", and then we add the particular event in the parthenses. A callback function is "btn", because it calls the function for us. We also have the option of creating a function after 'click' and writing the function within the callback.
3. By writing the function within the eventListener, we create an "anonymous function" that cannot be accessed anywhere else. 
 */

document.querySelector('.btn-roll').addEventListener('click', function () {
    if (gamePlaying) {
        //1. Create a random number. To do this, we create the rolled dice. To roll a dice (between 1-6), we use the math operator. The .floor makes sure it is a whole number, and the Math.random generates a random number (in this case, from 0-5). The + 1 corrects this, making it generate a random number from 1-6.
        dice = Math.floor(Math.random() * 6) + 1;

        //2. Display the result. To do this, we create a new variable called diceDOM and we also need to turn the dice visibility back on (which was turned off at the beginning of the game). DiceDOM will update the visibility of the dice with the correct dice number.

        diceDOM = document.querySelector('.dice');
        diceDOM.style.display = 'block';
        diceDOM.src = 'dice-' + dice + '.png';

        //3. Update the round score (if number is not 1 and not 6+6)
        if (dice === 6 && lastDice === 6) {
            scores[activePlayer] = 0;
            document.getElementById('score-' + activePlayer).textContent = '0';
            nextPlayer();
        } else if (dice !== 1) {
            //Add the score to the round score
            roundScore += dice;
            //Then display the round score with the updated number
            document.getElementById('current-' + activePlayer).textContent = roundScore;
        } else {
            nextPlayer();
        }
    }
    //We place lastDice outside the core function so that once everything runs, the lastDice score will equal the last dice roll that was played. The only way that happens is if everything else runs first. The game has to determine that two sixes weren't rolled, and the dice is not one.
    lastDice = dice;
});

/* STEP 3: Event Listener when the user holds their score
1. We use an eventListener on their click and start
2. We then add their current score to their global score, update the UI, and then check to see if the player won the game.
3. If the player wins the game, we then...
 */
document.querySelector('.btn-hold').addEventListener('click', function () {
    if (gamePlaying) {
        //1. We add the current score to the global score. 
        scores[activePlayer] += roundScore;

        //2. We update the UI to show the change after their hold. By targeting the scores[activePlayer] in the array, we specify the activePlayer's score will be updated.
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

        //We now allow for the input from the user what they wish the final score to be
        var input = document.querySelector('.final-score').value;
        //We now check to make sure that someone actually inputs a value. This will convert via  type coersion to false if they do not add any value.
        if (input) {
            winningScore = input;
        } else {
            winningScore = 100;
        }

        //We check if the player has won the game. If they hit or equal 100, then change the text of the player that won 
        if (scores[activePlayer] >= winningScore) {
            document.getElementById('name-' + activePlayer).textContent = 'Winner!';
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            document.querySelector('.dice').style.display = 'none';
            gamePlaying = false;
        } else {
            //If next player has not won the game, we move on to the next player
            nextPlayer();
        }
    }

});

/* STEP 4: Allow players to reset or start the game over
1. We have already created an init function, so we no longer need an anonymous function. We instead use the init function.
2. We set the eventListener to reset the game on click
3. We don't need to use the function call of the init function (using ()), we only want it to appear on the eventFunction when it's clicked.
 */
document.querySelector('.btn-new').addEventListener('click', init);

function init() {
    scores = [0, 0];
    roundScore = 0;
    activePlayer = 0;
    //This hides the dice at the beginning of the game
    document.querySelector('.dice').style.display = 'none';
    //These set all the scores to 0 at the beginning of the game
    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    //Then we return the names to normal in the event that they won the game
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';
    //Then we remove the winner and active class in the event they won the game
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
    //Then we create the state function of gamePlaying so that it begins and ends at a real point.
    gamePlaying = true;
}

function nextPlayer() {
    //If the number is equal to one, then we need to change the active player. We write "if the active player is equal to one, then change the active player to 1 else change the active player to 0. This is a ternary operator."
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    //We also set the round score back to 0 if a 1 is rolled.
    roundScore = 0;
    //Then we wipe out the current number if a 1 is rolled as the punishment.
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    //Then we change the visibility of the active player by adding and removing the "active" css class. You utilize "classlist" to add, remove, or toggle classes. While we could "add" or "remove" the classes, toggling is more efficient as it requires 2 lines of code vs. 4.
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');
    //When the player is changed, the dice visibility needs to be removed. 
    document.querySelector('.dice').style.display = 'none';
}

/* Notes and Other Options

1. .document gives us access to the DOM, and querySelector allows us to select items the same way we select things in CSS. We want to update the number on the player within the index.html file, so we grab the ID.

2. This is called a setter, because it sets a value.
document.querySelector('#current-' + activePlayer).textContent = dice;

3. This is called a getter, because it gathers the information.
//var x = document.querySelector('#score-0').textContent;
//console.log(x);

4. By using innerHTML, we override the limitations of textContent, and can actually update the HTML.
document.querySelector('#current-' + activePlayer).innerHTML = '<em>' + dice + '</em>';
//document.querySelector('#score-' + activePlayer).textContent = dice;
*/
