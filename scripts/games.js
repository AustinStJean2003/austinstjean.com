document.getElementById("sudoku-button").addEventListener("click", () => {
    const sudokuContainer = document.getElementById("sudoku-container");
    sudokuContainer.style.display = "block";
});

// document.getElementById("wordle-button").addEventListener("click", () => {
//     const wordleContainer = document.getElementById("wordle-container");
//     wordleContainer.style.display = "block";
// });

document.addEventListener("DOMContentLoaded", function () {
    const container = document.getElementById("container");

    function generateValidSudoku() {
        let board = Array.from({ length: 9 }, () => Array(9).fill(0));
        solveHelper(board);
        removeNumbers(board, 40);
        return board;
    }

    function removeNumbers(board, count) {
        let attempts = count;
        while (attempts > 0) {
            let row = Math.floor(Math.random() * 9);
            let col = Math.floor(Math.random() * 9);
            if (board[row][col] !== 0) {
                board[row][col] = 0;
                attempts--;
            }
        }
    }

    function solveHelper(board) {
        const emptyCell = findEmptyCell(board);
        if (!emptyCell) return true;

        const [row, col] = emptyCell;
        let nums = [1, 2, 3, 4, 5, 6, 7, 8, 9].sort(() => Math.random() - 0.5);
        for (let num of nums) {
            if (isValidMove(board, row, col, num)) {
                board[row][col] = num;
                if (solveHelper(board)) return true;
                board[row][col] = 0;
            }
        }
        return false;
    }

    function findEmptyCell(board) {
        for (let row = 0; row < 9; row++) {
            for (let col = 0; col < 9; col++) {
                if (board[row][col] === 0) return [row, col];
            }
        }
        return null;
    }

    function isValidMove(board, row, col, num) {
        for (let i = 0; i < 9; i++) {
            if (board[row][i] === num || board[i][col] === num) return false;
        }

        const startRow = Math.floor(row / 3) * 3;
        const startCol = Math.floor(col / 3) * 3;
        for (let i = startRow; i < startRow + 3; i++) {
            for (let j = startCol; j < startCol + 3; j++) {
                if (board[i][j] === num) return false;
            }
        }
        return true;
    }

    function createSudokuGrid(puzzle) {
        container.innerHTML = '';
        puzzle.forEach((row, rowIndex) => {
            const rowElement = document.createElement('div');
            rowElement.classList.add('row');
            row.forEach((cell, columnIndex) => {
                const cellElement = document.createElement('input');
                cellElement.classList.add('cell');
                cellElement.classList.add((rowIndex + columnIndex) % 2 === 0 ? 'lightBackground' : 'darkBackground');
                cellElement.type = 'text';
                cellElement.maxLength = 1;
                cellElement.value = cell !== 0 ? cell : '';
                cellElement.readOnly = cell !== 0;
                rowElement.appendChild(cellElement);
            });
            container.appendChild(rowElement);
        });
    }

    function solveSudoku(board) {
        let solvedBoard = JSON.parse(JSON.stringify(board));
        solveHelper(solvedBoard);
        return solvedBoard;
    }

    function solvePuzzle() {
        puzzle = solveSudoku(puzzle);
        createSudokuGrid(puzzle);
    }

    function resetPuzzle() {
        puzzle = JSON.parse(JSON.stringify(initialPuzzle));
        createSudokuGrid(puzzle);
    }

    function newGame() {
        puzzle = generateValidSudoku();
        initialPuzzle = JSON.parse(JSON.stringify(puzzle));
        createSudokuGrid(puzzle);
    }

    function getHint() {
        let emptyCells = [];
        let inputs = document.querySelectorAll(".cell");

        for (let row = 0; row < 9; row++) {
            for (let col = 0; col < 9; col++) {
                if (puzzle[row][col] === 0) {
                    emptyCells.push({ row, col });
                }
            }
        }

        if (emptyCells.length > 0) {
            let randomCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];
            let { row, col } = randomCell;
            puzzle[row][col] = solvedPuzzle[row][col];
            createSudokuGrid(puzzle);
        }
    }

    let initialPuzzle = generateValidSudoku();
    let puzzle = JSON.parse(JSON.stringify(initialPuzzle));
    let solvedPuzzle = solveSudoku(puzzle);

    createSudokuGrid(puzzle);

    document.getElementById("solveButton").addEventListener("click", solvePuzzle);
    document.getElementById("resetButton").addEventListener("click", resetPuzzle);
    document.getElementById("newGameButton").addEventListener("click", newGame);
    document.getElementById("hintButton").addEventListener("click", getHint);
});