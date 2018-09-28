/*Globals*/
// let userScore = [];
// let npcScore = [];
// let gameState = [1, 2, 3, 4, 5, 6, 7, 8, 9] //Available tiles id
const winCondition = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9],
    [1, 5, 9],
    [3, 5, 7]
]
/*Globals END */

/*Reset function */
function restartGameFunction() {
    for (let i = 1; i < 10; i++) {
        document.getElementById(i).innerHTML = "";
    }
    userScore = [];
    npcScore = [];
    gameState = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    document.getElementById("user-score").innerHTML = 0;
    document.getElementById("npc-score").innerHTML = 0;
    document.getElementById("user-score-matrix").innerHTML = [0];
    document.getElementById("npc-score-matrix").innerHTML = [0];
    document.getElementById("game-state-matrix").innerHTML = gameState;
    document.getElementById("msg").innerHTML = "Game on!";
}

//check for clicked tile
function clickHandlerFunction(e) {
    // let num=parseInt(e);
    if (gameState.includes(Number(e))) {
        let tile = document.getElementById(e);
        tile.innerHTML = "X";
        userScore.push(e);
        updateGameStateFunction(e);
        checkForWinnerFunction();
        setTimeout(npcMove(gameState), 4000);
    }
}


function npcMove(gameState) {
    if (gameState.length > 0) {
        let index = Math.floor(Math.random() * gameState.length);
        let randomTile = gameState[index];
        console.log(`gameState=${gameState} gameState[${index}]=${randomTile}`);
        //solution for .disabled not available for div
        // if (gameState.includes(Number(randomTile))) {
        //     console.log(`Doubel detected`)
        //     return;
        // } else {
        //mark selected tile with "O"
        document.getElementById(randomTile).innerHTML = "O";
        //update npc score
        npcScore.push(randomTile);
        //update game state
        updateGameStateFunction(randomTile);
        checkForWinnerFunction();

    }
    // }
}


function checkForWinnerFunction() {
    for (let k = 0; k < winCondition.length; k++) {
        if (winCondition[k].sort().join(',') === userScore.sort().join(',')) {
            document.getElementById("msg").innerHTML = "Winner";

        } else if (winCondition[k].sort().join(',') === npcScore.sort().join(',')) {
            document.getElementById("msg").innerHTML = "Winner";

        } else if (gameState === 0) {
            document.getElementById("msg").innerHTML = "Tie";
        }
    }
}

function updateGameStateFunction(e) {
    if (gameState.length === 0) {
        checkForWinnerFunction();
        return;
    } else {
        gameState = gameState.filter(function (a) {
            return a != e;
        });

        document.getElementById("user-score").innerHTML = userScore.length;
        document.getElementById("npc-score").innerHTML = npcScore.length;
        document.getElementById("user-score-matrix").innerHTML = userScore;
        document.getElementById("npc-score-matrix").innerHTML = npcScore;
        document.getElementById("game-state-matrix").innerHTML = gameState;
    }
    checkForWinnerFunction();
    return gameState;
}


function autorun() {
    restartGameFunction();
}
if (document.addEventListener) document.addEventListener("DOMContentLoaded", autorun, false);
else if (document.attachEvent) document.attachEvent("onreadystatechange", autorun);
else window.onload = autorun;