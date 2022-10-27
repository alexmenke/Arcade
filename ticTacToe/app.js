let gameState = ["", "", "", "", "", "", "", "", ""];
let gameActive = true;
let gameStatus = document.getElementById("gameStatus");

let playerOneName = "";
let playerOneValue = "X";

let playerTwoName = "";
let playerTwoValue = "O";

let currentPlayer = "";

const drawMessage = "The game has ended in a draw!";
const possibleWins = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];

startButton.addEventListener("click", function(event){
    event.preventDefault();
    playerOneName = document.getElementById("playerX").value;
    playerTwoName = document.getElementById("playerO").value;
    currentPlayer = playerOneName;
    gameStatus.innerHTML = (playerOneName + " goes first.");
})

function cellClick(clickedCellEvent){
    const clickedCell = clickedCellEvent.target;
    const clickedCellIndex = parseInt(clickedCell.getAttribute("data-cell-index"));
    if (gameState[clickedCellIndex] !== "" || !gameActive) {
        return;
    }
    cellPlayed(clickedCell, clickedCellIndex);
    checkForWin();
    if (gameActive) changePlayer();
}

function cellPlayed(clickedCell, clickedCellIndex){
    if(currentPlayer === playerOneName){
        gameState[clickedCellIndex] = playerOneName;
        clickedCell.innerHTML = playerOneValue;
    } else {
        gameState[clickedCellIndex] = playerTwoName;
        clickedCell.innerHTML = playerTwoValue;
    }
}

function changePlayer(){
    if (currentPlayer === playerOneName){
        currentPlayer = playerTwoName;
        gameStatus.innerHTML = (playerTwoName + "'s turn.");
    } else {
        currentPlayer = playerOneName;
        gameStatus.innerHTML = (playerOneName + "'s turn.");
    }
}

function checkForWin(){
    let roundWon = false;
    for (let i = 0; i <= 7; i++){
        const winCombo = possibleWins[i];
        let a = gameState[winCombo[0]];
        let b = gameState[winCombo[1]];
        let c = gameState[winCombo[2]];
        if (a === "" || b === "" || c === "") {
            continue;
        }
        if (a === b && b === c){
            roundWon = true;
            break
        }
    }
    if (roundWon) {
        if (currentPlayer === playerOneName){
            gameStatus.innerHTML = (playerOneName + " has won!");
            gameActive = false;
            return;
        }
        if (currentPlayer === playerTwoName){
            gameStatus.innerHTML = (playerTwoName + " has won!");
            gameActive = false;
            return;
        }
    }
    let roundDraw = !gameState.includes("");
    if (roundDraw) {
        gameStatus.innerHTML = drawMessage;
        gameActive = false;
        return;
    }
}

function resetInitialState() {
    gameActive = true;
    gameState = ["", "", "", "", "", "", "", "", ""];
    document.querySelectorAll(".cell")
        .forEach(cell => cell.innerHTML = "");
}

let resetButton = document.getElementById("resetButton");
resetButton.addEventListener("click", function (event){
    event.preventDefault();
    resetInitialState();
    playerOneName = "";
    playerTwoName = "";
    currentPlayer = "";
    gameStatus.innerHTML = "";
})

document.querySelectorAll('.cell').forEach(cell => cell.addEventListener("click", cellClick));