document.addEventListener('DOMContentLoaded', () => {
    const submitButton = document.getElementById('submit');
    const gameBoard = document.getElementById('game-board');
    const messageDiv = document.querySelector('.message');
    const cells = document.querySelectorAll('.cell');
    let player1, player2;
    let currentPlayer = 'X';
    let board = ['', '', '', '', '', '', '', '', ''];
    let gameActive = true;

    submitButton.addEventListener('click', () => {
        player1 = document.getElementById('player-1').value;
        player2 = document.getElementById('player-2').value;

        if (player1 && player2) {
            document.getElementById('name-inputs').style.display = 'none';
            gameBoard.style.display = 'block';
            messageDiv.textContent = `${player1}, you're up`;
        }
    });

    cells.forEach(cell => {
        cell.addEventListener('click', (event) => {
            const cellId = event.target.id - 1;
            if (board[cellId] === '' && gameActive) {
                board[cellId] = currentPlayer;
                event.target.textContent = currentPlayer;
                checkWinner();
                currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
                messageDiv.textContent = currentPlayer === 'X' ? `${player1}, you're up` : `${player2}, you're up`;
            }
        });
    });

    function checkWinner() {
        const winPatterns = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
            [0, 4, 8], [2, 4, 6]              // Diagonals
        ];
        let winner = null;

        winPatterns.forEach(pattern => {
            if (board[pattern[0]] && board[pattern[0]] === board[pattern[1]] && board[pattern[0]] === board[pattern[2]]) {
                winner = board[pattern[0]];
            }
        });

        if (winner) {
            messageDiv.textContent = winner === 'X' ? `${player1} congratulations you won!` : `${player2} congratulations you won!`;
            gameActive = false;
        } else if (!board.includes('')) {
            messageDiv.textContent = `It's a draw!`;
            gameActive = false;
        }
    }
});

