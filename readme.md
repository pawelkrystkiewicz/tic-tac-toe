TIC TAC TOE 
======
##### v1.0.0

## Design brief
   Main goal was to create tic-tac-toe game as JavaScript web application.
   
   Game grid consists of HTML label tags with structure and numerical `id`'s as shown below:

 **1** | **2** | **3**
 :---: |:---:| :---:
 **4** | **5** | **6** 
 **7** | **8** | **9**
  
   This solution utilizes arrays to store:
   + numerical `id` of grid tiles avalaible for players next move: `[1,2,3,4,5,6,7,8,9]`,
   + `id` of tiles clicked by player or picked by NPC,
   + win conditions as tiles `id`. e.g. `winCondition[0]=[1,2,3]` is a win condition for scratched top row:
   
 ~~**1**~~ | ~~**2**~~ | ~~**3**~~
 :---: |:---:| :---:
 **4** | **5** | **6** 
 **7** | **8** | **9**
 
 ### Game flow
 One game cycle against NPC can be described as following procedure:  
 0. All variables are set to default for a new game, grid is unlocked for click,
 ```
 player1Score = [];
 player2Score = [];
 player2MoveCount = 0;
 gameState = [1, 2, 3, 4, 5, 6, 7, 8, 9];
 ```
 1. Player 1 (user) clicks on label passing it's `id` to a function `clickHandleFunction(this.id)`,
 2. if specified `id` is found in `gameState` array then the rest of the function will be executed,
 4. selected label is marked by **X**,
 5. `player1Score` is updated by pushing selected `id`,
 6. `gameState` is update by removing selected `id`,
 7. after udpdating game state check for winner is performed if Player 2 or NPC has made at least 2 moves,
 8. if winner is not yet found and there are tiles left in `gameState` script awaits for click to execute point 1.
 
#### Game with Human
If game against Human is selected then Player 2 (NPC) variables are utilized for game state tracking.
In this scenario every even click is assumed to made by Player 2 and marks tiles with **O** and every odd
move belongs to player 1 and marks tiles with **X**.
Evenness of click is assed by evaluating condition: `if(gameState.length % 2 == 0)` which is good measurement because
`gameState.length` at the beginning of game is odd and first(also odd) move is done by Player 1.

#### Game with NPC
To simulate Player 2 (NPC) decision making following steps are taken:
1. check if there are any tiles to chose from, if not then exit,
2. generate random number from range that is count of figures left in array: `gameState.length`,
3. choose tile's `id` by using random number to be index of array `gameState`.
This approach gives certainty that tile is available because it's picked from set of tiles that are left in this array.

## Looking for winner
### Check if array contains all specified elements

For this task function `findCharsFunction(a,b)` was created that checks every single element of every nested array with `.includes()` method against `player#Score`. Function takes arguments of `source` and `condition`, where default has been set for `condition` to be `winCondition`. This clears up code a bit by allowing to pass only one argument that is either `player1Score` or `player2Score` as `source`.
This function is utilized as logical check for `if` winning conditions and is invoked inside of `checkForWinnerFunction()`.

```.
function findCharsFunction(source, condition = winCondition) {
    for (let k = 0; k < condition.length; k++) {
        let isFound = 0;
        for (let j = 0; j < source.length; j++) {
          if (source.includes(condition[k][j])) {
               isFound++;
                if (isFound == 3) {
                    return true
                }
            }
        }
    }
    return false
}
```
To better visualise how this function works let's inspect function step by step when executed with given parameters:  
```
player1Score=[1,2,3,4];
winCondition[0]=[1,2,3];
findCharsFunction(player1Score, winCondition);
```

Following is happening:
1. `k = 0`
2. `isFound = 0`
3. `j = 0`
4. Statement `[1, 2, 3, 4].includes(1)` is `true`
5. `isFound++` (then `isFound == 1`)
6.  Statement `isFound == 3` is `false`
7. `j = 1`
8. Statement `[1, 2, 3, 4].includes(2)` is `true`
9. `isFound++` (then `isFound == 2`)
10.  Statement `isFound == 3` is `false`
11. `j = 2`
12. Statement `[1, 2, 3, 4].includes(3)` is `true`
13. `isFound++` (then `isFound==3`)
14. Statement `isFound == 3` is `true`
15. Exit function with `return true`

#### Input lock
This is simply achieved by asigning CSS class to an element with attribute `pointer-events: none`.