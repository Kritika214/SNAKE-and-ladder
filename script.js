// scripts.js
document.addEventListener('DOMContentLoaded', () => {
    const board = document.getElementById('board');
    const rollDiceBtn = document.getElementById('rollDice');
    const diceResult = document.getElementById('diceResult');
    const playerTurn = document.getElementById('playerTurn');

    const players = [
        { position: 0, element: createPlayerElement('red') },
        { position: 0, element: createPlayerElement('blue') },
    ];
    
    let currentPlayer = 0;

    function createPlayerElement(color) {
        const div = document.createElement('div');
        div.classList.add('player');
        div.style.backgroundColor = color;
        return div;
    }

    function drawBoard() {
        for (let i = 0; i < 100; i++) {
            const cell = document.createElement('div');
            cell.setAttribute('data-id', i);
            board.appendChild(cell);
        }
        updateBoard();
    }

    function updateBoard() {
        board.querySelectorAll('div').forEach(cell => cell.innerHTML = '');
        players.forEach(player => {
            const playerCell = board.querySelector(`div[data-id='${player.position}']`);
            if (playerCell) {
                playerCell.appendChild(player.element);
            }
        });
    }

    function rollDice() {
        return Math.floor(Math.random() * 6) + 1;
    }

    rollDiceBtn.addEventListener('click', () => {
        const dice = rollDice();
        diceResult.innerText = `Dice: ${dice}`;
        
        let newPosition = players[currentPlayer].position + dice;
        if (newPosition > 99) {
            newPosition = 99; // Ensure the player does not go out of the board
        }

        players[currentPlayer].position = newPosition;
        updateBoard();
        
        if (newPosition === 99) {
            alert(`Player ${currentPlayer + 1} wins!`);
            resetGame();
        } else {
            currentPlayer = (currentPlayer + 1) % players.length;
            playerTurn.innerText = `Player Turn: ${currentPlayer + 1}`;
        }
    });

    function resetGame() {
        players.forEach(player => player.position = 0);
        currentPlayer = 0;
        updateBoard();
    }

    drawBoard();
});
