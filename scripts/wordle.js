let words = [];
let currentWord = "";
let currentGuess = "";
let attempts = [];

document.getElementById("wordle-button").addEventListener("click", () => {
    const wordleContainer = document.getElementById("wordle-container");
    const sudokuContainer = document.getElementById("sudoku-container");
    wordleContainer.style.display = "block";
    sudokuContainer.style.display = "none";
});

function createKeyboard() {
    const keyboardContainer = document.getElementById("keyboard");
    keyboardContainer.innerHTML = "";

    const rows = ["QWERTYUIOP", "ASDFGHJKL", "ZXCVBNM"];

    rows.forEach((row) => {
        let rowDiv = document.createElement("div");
        rowDiv.classList.add("keyboard-row");

        row.split("").forEach(letter => {
            let key = document.createElement("button");
            key.textContent = letter;
            key.id = `key-${letter}`;
            key.classList.add("key");
            key.addEventListener("click", () => handleKeyPress(letter));
            rowDiv.appendChild(key);
        });

        keyboardContainer.appendChild(rowDiv);
    });

    // Create bottom row div
    const bottomRowDiv = document.createElement("div");
    bottomRowDiv.classList.add("keyboard-row");

    let enterButton = document.createElement("button");
    enterButton.textContent = "Enter";
    enterButton.id = "key-Enter";
    enterButton.classList.add("key");
    enterButton.addEventListener("click", () => {
        if (currentGuess.length === 5) {
            checkGuess();
        }
    });

    let backspaceButton = document.createElement("button");
    backspaceButton.textContent = "⌫";
    backspaceButton.id = "key-Backspace";
    backspaceButton.classList.add("key");
    backspaceButton.addEventListener("click", () => {
        currentGuess = currentGuess.slice(0, -1);
        updateBoard();
    });

    bottomRowDiv.appendChild(backspaceButton);
    bottomRowDiv.appendChild(enterButton);
    keyboardContainer.appendChild(bottomRowDiv);
}


function checkGuess() {
    let row = attempts.length;
    if (!words.includes(currentGuess.toLowerCase())) {
        const message = document.getElementById("wordle-message");
        message.style.display = "block";
        message.className = "loser";
        message.innerHTML = `Not a valid word!`;
        setTimeout(() => {
            message.style.display = "none";
        }, 2000);
        return;
    }

    attempts.push(currentGuess);

    let letterCounts = {};
    for (let letter of currentWord) {
        letterCounts[letter] = (letterCounts[letter] || 0) + 1;
    }

    for (let i = 0; i < 5; i++) {
        let tile = document.getElementById(`tile-${row}-${i}`);
        let letter = currentGuess[i];

        if (letter === currentWord[i]) {
            tile.classList.add("correct");
            updateKeyboard(letter, "correct");
            letterCounts[letter]--;
        }
    }

    for (let i = 0; i < 5; i++) {
        let tile = document.getElementById(`tile-${row}-${i}`);
        let letter = currentGuess[i];

        if (!tile.classList.contains("correct")) {
            if (currentWord.includes(letter) && letterCounts[letter] > 0) {
                tile.classList.add("present");
                updateKeyboard(letter, "present");
                letterCounts[letter]--;
            } else {
                tile.classList.add("absent");
                updateKeyboard(letter, "absent");
            }
        }
    }

    const message = document.getElementById("wordle-message");

    if (currentGuess === currentWord) {
        message.style.display = "block";
        message.className = "winner";
        message.innerHTML = "🎉 You Won! Congratulations! 🎉";
    } else if (attempts.length >= 6) {
        message.style.display = "block";
        message.className = "loser";
        message.innerHTML = `The word was <b>${currentWord}</b>. Try again!`;
    }
    currentGuess = "";
}

function handleKeyPress(letter) {
    if (currentGuess.length < 5) {
        currentGuess += letter;
        updateBoard();
    }
}

async function loadWords() {
    const response = await fetch('/files/words.txt');
    const text = await response.text();
    words = text.split('\n').map(word => word.trim()).filter(word => word.length === 5);
    newGame();
}

function newGame() {
    currentWord = words[Math.floor(Math.random() * words.length)].toUpperCase();
    currentGuess = "";
    attempts = [];

    document.getElementById("game-board").innerHTML = "";
    createBoard();
    createKeyboard();

    let message = document.getElementById("wordle-message");
    message.innerHTML = "";
    message.className = "";
}

function createBoard() {
    const board = document.getElementById("game-board");
    board.innerHTML = "";

    for (let i = 0; i < 6; i++) {
        for (let j = 0; j < 5; j++) {
            let tile = document.createElement("div");
            tile.classList.add("tile");
            tile.id = `tile-${i}-${j}`;
            board.appendChild(tile);
        }
    }
}

document.addEventListener("keydown", (e) => {
    let letter = e.key.toUpperCase();
    if (/^[A-Z]$/.test(letter) && currentGuess.length < 5) {
        currentGuess += letter;
        updateBoard();
    } else if (e.key === "Enter" && currentGuess.length === 5) {
        checkGuess();
    } else if (e.key === "Backspace") {
        currentGuess = currentGuess.slice(0, -1);
        updateBoard();
    }
});

function updateBoard() {
    let row = attempts.length;
    for (let i = 0; i < 5; i++) {
        let tile = document.getElementById(`tile-${row}-${i}`);
        if (tile) {
            tile.textContent = currentGuess[i] || "";
        }
    }
}

function updateKeyboard(letter, status) {
    let key = document.getElementById(`key-${letter}`);
    if (!key) return;

    if (status === "correct") {
        key.classList.add("correct");
    } else if (status === "present" && !key.classList.contains("correct")) {
        key.classList.add("present");
    } else if (status === "absent" && !key.classList.contains("correct") && !key.classList.contains("present")) {
        key.classList.add("absent");
    }
}

document.getElementById("new-game").addEventListener("click", newGame);
loadWords();
