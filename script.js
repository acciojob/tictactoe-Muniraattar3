// Reference elements
const playerInput = document.getElementById("player-input");
const player1Input = document.getElementById("player-1");
const player2Input = document.getElementById("player-2");
const submitButton = document.getElementById("submit");
const gameBoard = document.getElementById("game-board");
const messageDiv = document.querySelector(".message");
const boardContainer = document.querySelector(".board");

// Variables to track game state
let player1, player2, currentPlayer;
let board = Array(9).fill(null);

// Winning combinations
const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

// Start the game
submitButton.addEventListener("click", () => {
    player1 = player1Input.value || "Player 1";
    player2 = player2Input.value || "Player 2";
    currentPlayer = player1;
    messageDiv.textContent = `${currentPlayer}, you're up!`;
    playerInput.style.display = "none";
    gameBoard.style.display = "block";
    createBoard();
});

// Function to create the board
function createBoard() {
    boardContainer.innerHTML = ""; // Clear existing board
    for (let i = 0; i < 9; i++) {
        const cell = document.createElement("div");
        cell.id = i;
        cell.addEventListener("click", handleCellClick);
        boardContainer.appendChild(cell);
    }
}

// Handle cell click
function handleCellClick(event) {
    const cell = event.target;
    const cellIndex = parseInt(cell.id);

    if (!board[cellIndex]) {
        board[cellIndex] = currentPlayer === player1 ? "X" : "O";
        cell.textContent = board[cellIndex];
        cell.classList.add("taken");

        if (checkWin()) {
            messageDiv.textContent = `${currentPlayer}, congratulations you won!`;
            disableBoard();
        } else if (board.every((cell) => cell)) {
            messageDiv.textContent = "It's a draw!";
        } else {
            currentPlayer = currentPlayer === player1 ? player2 : player1;
            messageDiv.textContent = `${currentPlayer}, you're up!`;
        }
    }
}

// Check if the current player has won
function checkWin() {
    return winningCombos.some((combo) => 
        combo.every((index) => board[index] === (currentPlayer === player1 ? "X" : "O"))
    );
}

// Disable further clicks on the board
function disableBoard() {
    document.querySelectorAll(".board div").forEach((cell) => {
        cell.removeEventListener("click", handleCellClick);
    });
}
