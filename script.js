document.addEventListener("DOMContentLoaded", () => {
    const submitButton = document.getElementById("submit");
    const player1Input = document.getElementById("player1");
    const player2Input = document.getElementById("player2");

    submitButton.addEventListener("click", () => {
        const player1 = player1Input?.value || "Player 1";
        const player2 = player2Input?.value || "Player 2";

        document.querySelector(".message").textContent = `${player1}, you're up!`;

        initializeGame(player1, player2);
    });
});

function initializeGame(player1, player2) {
    const boardContainer = document.querySelector(".board-container");
    boardContainer.innerHTML = ""; // Clear previous game board

    const board = Array(9).fill(null);
    let currentPlayer = player1;

    for (let i = 0; i < 9; i++) {
        const cell = document.createElement("div");
        cell.id = i;
        cell.classList.add("cell");
        cell.addEventListener("click", () => handleCellClick(i, board, currentPlayer, player1, player2));
        boardContainer.appendChild(cell);
    }
}

function handleCellClick(index, board, currentPlayer, player1, player2) {
    if (!board[index]) {
        board[index] = currentPlayer === player1 ? "X" : "O";
        document.getElementById(index).textContent = board[index];

        if (checkWinner(board, currentPlayer)) {
            document.querySelector(".message").textContent = `${currentPlayer}, congratulations you won!`;
        } else {
            currentPlayer = currentPlayer === player1 ? player2 : player1;
            document.querySelector(".message").textContent = `${currentPlayer}, you're up!`;
        }
    }
}

function checkWinner(board, player) {
    const winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6],
    ];

    return winningCombinations.some((combo) =>
        combo.every((index) => board[index] === (player === player1 ? "X" : "O"))
    );
}
