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

    const rows = [
        "QWERTYUIOP",
        "ASDFGHJKL",
        "ZXCVBNM"
    ];

    rows.forEach((row, rowIndex) => {
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
    createKeyboard()
}

function createBoard() {
    for (let i = 0; i < 6; i++) {
        for (let j = 0; j < 5; j++) {
            let tile = document.createElement("div");
            tile.classList.add("tile");
            tile.id = `tile-${i}-${j}`;
            document.getElementById("game-board").appendChild(tile);
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
        tile.textContent = currentGuess[i] || "";
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

function checkGuess() {
    let row = attempts.length;
    if (!words.includes(currentGuess.toLowerCase())) {
        alert("Not a valid word!");
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
        message.className = "winner";
        message.classList.add("fade-out"); // Apply fade-out effect
        message.innerHTML = "🎉 You Won! Congratulations! 🎉"
    } else if (attempts.length >= 6) {
        message.className = "loser";
        message.classList.add("fade-out"); // Apply fade-out effect
        message.innerHTML = "Thank you for playing! Try again."
    }

    currentGuess = "";
}


document.getElementById("new-game").addEventListener("click", newGame);

loadWords();
