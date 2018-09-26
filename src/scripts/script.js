let checkboxes = document.getElementsByName("checkbox");
let userScore = [];
let npcScore = [];
let gameState = [1, 2, 3, 4, 5, 6, 7, 8, 9] //Available tiles


//game reset function
function reset() {
    for (let i = 0; i < checkboxes.length; i++) {
        checkboxes[i].checked = false;
        let k = i + 1;
        document.getElementById("label-" + k).innerHTML = "";
        checkboxes[i].disabled = false;
    }
    userScore = [];
    npcScore = [];
    gameState = [1, 2, 3, 4, 5, 6, 7, 8, 9]
    document.getElementById("user-score").innerHTML = 0;
    document.getElementById("npc-score").innerHTML = 0;
    document.getElementById("user-score-matrix").innerHTML = [0];
    document.getElementById("npc-score-matrix").innerHTML = [0];
    document.getElementById("msg").innerHTML = "";
}
//check for clicked tile
function check() {
    for (let i = 0; i < checkboxes.length; i++) { //loop through all inputs
        console.log(i);
        checkboxes[i].onclick = function () {
            if (checkboxes[i].checked === true) { //if clicked and checked
                let k = i; //helpful variable
                document.getElementById("label-" + k).innerHTML = "X"; //mark tile with X
                checkboxes[i].disabled = true; //prevent input
                userScore.push(k) //update user score
                console.log("User score: " + k)
                updateGameState(k); //update current game state
            } else {
                document.getElementById("label-" + k).innerHTML = ""; //clear tile mark

            }

        }


    }

    npcMove(gameState); //npc's round

}


function npcMove(gameState) {

    if (gameState.length === 0) {
        document.getElementById("msg").innerHTML = "Game Over";
        alert("Game Over");
        checkForWinner();
        reset();
        return;
    } else {
        let a = gameState[Math.floor(Math.random() * gameState.length)];
        let b = a - 1;

        console.log("Random choice: " + a + " index of checkbox: " + b);
        document.getElementById("label-" + a).innerHTML = "O"; //mark spot with O

        checkboxes[b].checked = true //mark as taken
        checkboxes[b].disabled = true; //prevent input
        npcScore.push(a); //update npc score
        updateGameState(a); //update game state
    }
}



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

function checkForWinner() {
    //user
    for (let k = 0; k < winCondition.length; k++) {
        if (winCondition[k].sort().join(',') === userScore.sort().join(',')) {
            console.log('Same members in Array ' + k);
            document.getElementById("user-score").innerHTML = "Winner";
            alert("Game Over,\nWinner: You!");
            return;
        } else {
            console.log('Not a match for user in Array ' + k);
        }

    }
    //npc
    for (let k = 0; k < winCondition.length; k++) {
        if (winCondition[k].sort().join(',') === npcScore.sort().join(',')) {
            console.log('Same members in Array ' + k);
            document.getElementById("npc-score").innerHTML = "Winner";
            alert("Game Over,\nWinner: NPC");
        } else {
            console.log('Not a match for NPC in Array ' + k);
        }

    }
}

function gameOver() {
    document.getElementById("msg").innerHTML = "Game Over";
    if (confirm("Game Over!\nRestart?")) {
        reset();

    } else {
        return;
    }

}

function updateGameState(e) {
    if (gameState.length === 0 || userScore.length + npcScore.length >= 9) {
        gameOver();
        checkForWinner();
        return;
    } else {
        gameState = gameState.filter(gameState => gameState !== e);
        document.getElementById("user-score").innerHTML = userScore.length;
        document.getElementById("npc-score").innerHTML = npcScore.length;
        document.getElementById("user-score-matrix").innerHTML = userScore;
        document.getElementById("npc-score-matrix").innerHTML = npcScore;
        console.log("Current game state: " + gameState);
    }
    checkForWinner(); //check win conditions
    return gameState;
}