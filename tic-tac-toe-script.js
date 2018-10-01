/*Globals*/
let gameMode = "npc";
let gameState = [1, 2, 3, 4, 5, 6, 7, 8, 9];
let player1Score = [];
let player2Score = [];
let player2MoveCount = 0;
const winCondition = [
    [1, 2, 3], //horizontals
    [4, 5, 6],
    [7, 8, 9],
    [1, 4, 7], //verticals
    [2, 5, 8],
    [3, 6, 9],
    [1, 5, 9], //diagonals
    [3, 5, 7]
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
    player2MoveCount = 0;
    gameState = [1, 2, 3, 4, 5, 6, 7, 8, 9];

    //message to user
    document.getElementById("msg").innerText = "Play!";

    // Reset score board values
    document.getElementById("player1-matrix").innerText = [0];
    document.getElementById("player2-matrix").innerText = [0];
    document.getElementById("game-state-matrix").innerText = gameState;

    //if board was locked for click then unlock
    if (document.getElementById("grid-container").classList.contains('prevent-click')) {
        document.getElementById("grid-container").classList.remove('prevent-click');
    }

    if (document.getElementById("grid-container").classList.contains('hide-element')) {
        document.getElementById("grid-container").classList.remove('hide-element');
    }

    if (document.getElementById("grid-container").classList.contains('blur-element')) {
        document.getElementById("grid-container").classList.remove('blur-element');
    }

    document.getElementById("score").style.visibility = "unset";
    document.getElementById("game-options").classList.add('hide-element');

    return gameMode //update global gameMode
}


//Handle clicked label
function clickHandlerFunction(e) {
    e = Number(e); //id to number
    //Check if move is legal
    if (gameState.includes(e)) {
        let tile = document.getElementById(e);
        if (gameMode === "human") { //if we choose to play with another human
            if (gameState.length % 2 != 0) { //even moves count->Player 1
                tile.innerText = "X"; //mark player1 spot with X
                player1Score.push(e); //update player1 points
                document.getElementById("msg").innerText = `Your turn PLAYER 2 [O]`;
                updateGameStateFunction(e); //update game state


            } else if (gameState.length % 2 == 0) { //odd moves count->Player 2
                tile.innerText = "O"; //mark playe2 spot with X
                player2Score.push(e); //update player2 points
                document.getElementById("msg").innerText = `Your turn PLAYER 1 [X]`; //add some context
                player2MoveCount++;
                updateGameStateFunction(e); //update game state

            }

        } else { //if normal mode(npc) is in effect
            tile.innerText = "X"; //mark player1 spot as X
            player1Score.push(e); //update player1 moves
            document.getElementById("msg").innerText = `Your turn NPC [O]`; //add some context
            updateGameStateFunction(e); //update game state
            player2MoveFunction(); //make npc move
        }
    }
}

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
        //increment move count
        player2MoveCount++;
        //show turns
        document.getElementById("msg").innerText = `Your turn PLAYER 1 [X]`;
        //update game state
        updateGameStateFunction(randomTile);
        //check who wins
    }
};

//Function checking for winner or win case like tie
function checkForWinnerFunction() {
    if (player2MoveCount >= 2) {
        if (findCharsFunction(player1Score) && findCharsFunction(player2Score)) {
            endGameFunction("tie");
        } else if (findCharsFunction(player2Score)) {
            endGameFunction("player 2");
        } else if (findCharsFunction(player1Score)) {
            endGameFunction("player 1");
        } else if (gameState.length === 0) {
            endGameFunction("tie");
        }
    }
}

//FUNCTION HANDLING WIN OUTCOMES AND END GAME
function endGameFunction(arg) {
    document.getElementById("grid-container").classList.add('prevent-click'); //prevent further input on grid
    document.getElementById("grid-container").classList.add('blur-element'); //hide element

    if (document.getElementById("game-options").classList.contains('hide-element')) {
        document.getElementById("game-options").classList.remove('hide-element');
    }

    //Show end game message
    if (arg === "tie") {
        document.getElementById("msg").innerText = (`It's a TIE.
        Press button to start a new game.`);
    } else {
        document.getElementById("msg").innerText = (`${arg.toUpperCase()} has won!
        Press button to start a new game.`);

    }
}

//FUNCTION UPDATING GAME STATE AND SCORES
function updateGameStateFunction(e) {
    gameState = gameState.filter(function (a) { //new array excludes id of tile that has been played
        return a != e;
    });
    //Update score board
    document.getElementById("player1-matrix").innerText = player1Score;
    document.getElementById("player2-matrix").innerText = player2Score;
    document.getElementById("game-state-matrix").innerText = gameState;

    checkForWinnerFunction();
    return gameState;
}

//FUNCTION CHECKING IF WIN HAS BEEN ACHIEVED
function findCharsFunction(source, condition = winCondition) {
    //condition[] is 2D array, loop through every element
    for (let k = 0; k < condition.length; k++) {
        //moving on to next condition, clear count
        let isFound = 0;
        //loop through every single element in condition[] array
        for (let j = 0; j < source.length; j++) {
            //check if source[] includes any single element from condition sub array[]
            if (source.includes(condition[k][j])) {
                //we are looking from 3 matches for win so increment value if true:
                isFound++;
                if (isFound == 3) { //if found 3 matches it's a win, function
                    return true
                }
            }
        }
    }
    return false //if previous condition wasn't caught as true then there is no match, return case false
}