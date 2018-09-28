/*Globals*/
let gameMode = "npc";
let gameState = [1, 2, 3, 4, 5, 6, 7, 8, 9];
let player1Score = [];
let player2Score = [];
const winCondition = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9],
    [1, 5, 9],
    [3, 5, 7],
    [1, 4, 5, 9], //Here begins walkaround
    [1, 2, 5, 9],
    [1, 3, 4, 7],
    [1, 3, 5, 9],
    [1, 5, 6, 9],
    [1, 5, 7, 9],
    [1, 5, 7, 8],
    [1, 4, 5, 7],
    [2, 3, 6, 8],
    [2, 4, 6, 8],
    [2, 5, 6, 8],
    [3, 6, 8, 9],
    [3, 4, 5, 6],
    [3, 5, 6, 7],
    [1, 3, 4, 5, 7],
    [3, 4, 5, 6, 7],
    [1, 2, 5, 6, 9],
    [1, 2, 5, 7, 9],
    [1, 4, 5, 7, 9],
    [1, 4, 5, 8, 9],
    [2, 3, 4, 5, 8]
];
/*Globals END */

/*Reset function */
function restartGameFunction(a = "npc") {
    gameMode = a;
    for (let i = 1; i < 10; i++) {
        document.getElementById(i).innerText = "";
    }
    /*Reset game essential variables */
    player1Score = [];
    player2Score = [];
    gameState = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    // Reset score board values

    document.getElementById("player1-matrix").innerText = [0];
    document.getElementById("player2-matrix").innerText = [0];
    document.getElementById("game-state-matrix").innerText = gameState;
    document.getElementById("msg").innerText = "Game on!";
    if (document.getElementById("grid-container").classList.contains('prevent-click')) {
        document.getElementById("grid-container").classList.remove('prevent-click');
    }
    return gameMode
}


//Handle clicked label
function clickHandlerFunction(e) {
    e = Number(e);
    //Check if move can be made
    if (gameState.includes(e)) {
        let tile = document.getElementById(e);
        if (gameMode === "human") {
            if (gameState.length % 2 != 0) { //even moves count->Player 1
                tile.innerText = "X";
                player1Score.push(e);
                updateGameStateFunction(e);

            } else if (gameState.length % 2 == 0) { //odd moves count->Player 2
                tile.innerText = "O";
                player2Score.push(e);
                updateGameStateFunction(e);
            }

        } else {
            tile.innerText = "X";
            player1Score.push(e);
            updateGameStateFunction(e);
            player2MoveFunction();
        }
    }
}

/*
To simulate second player's move:
1. check if there are any tiles to chose else exit
2. generate random number from range that is count of figures left in array
3. use this number to be index of array so there certainty that this tile is available
4. mark chosen tile
5. update npc score
6. update gameState
7. check if there is already a winner
*/

function player2MoveFunction() {
    if (gameState.length > 0) {
        //generate random index from range
        let index = Math.floor(Math.random() * gameState.length);
        //chose value from gameState
        let randomTile = gameState[index];
        //mark tile as taken
        document.getElementById(randomTile).innerText = "O";
        //update npc score
        player2Score.push(randomTile);
        //update game state
        updateGameStateFunction(randomTile);
        //check who wins
        checkForWinnerFunction();
    }
};


function checkForWinnerFunction() {
    let player1;
    let player2;
    for (let k = 0; k < winCondition.length; k++) {
        if (player1Score.sort().join('').includes(winCondition[k].join(''))) {
            player1 = true;
            endGameFunction("player 1");
        } else if (player2Score.sort().join('').includes(winCondition[k].join(''))) {
            player2 = true;
            endGameFunction("player 2");
        } else if (gameState.length === 0) {
            endGameFunction('tie');
        }
    }
    if (player2 && player1)
        endGameFunction("tie");
}

function endGameFunction(arg) {
    document.getElementById("grid-container").classList.add('prevent-click'); //prevent further input on grid

    //Show end game message
    if (arg === "tie") {
        document.getElementById("msg").innerText = (`Game Over!
        It's a TIE. Press button to start a new game.`);
    } else {
        document.getElementById("msg").innerText = (`Game Over!
    ${arg.toUpperCase()} has won! Press button to start a new game.`);
    }
}

function updateGameStateFunction(e) {
    gameState = gameState.filter(function (a) {
        return a != e;
    });
    //Update score board

    document.getElementById("player1-matrix").innerText = player1Score;
    document.getElementById("player2-matrix").innerText = player2Score;
    document.getElementById("game-state-matrix").innerText = gameState;

    checkForWinnerFunction();
    return gameState;
}


function autorun() {
    restartGameFunction("npc");
}
if (document.addEventListener) document.addEventListener("DOMContentLoaded", autorun, false);
else if (document.attachEvent) document.attachEvent("onreadystatechange", autorun);
else window.onload = autorun;