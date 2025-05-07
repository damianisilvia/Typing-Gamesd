const word = document.getElementById("word");
const text = document.getElementById("input");
const score = document.getElementById("score");
const time = document.getElementById("time");
const message = document.getElementById("end-game-container");
const settingsButton = document.getElementById("settings-btn");
const settingsDiv = document.getElementById("settings-div");
const settingsForm = document.getElementById("settings-form");
const difficultySelect = document.getElementById("difficulty");
/*aggiungo variabile per pulsante Inizia*/
const startButton = document.getElementById("start-btn");
text.disabled = true; // Blocca input finché non si clicca Inizia


//aggiungo il localStorage per mantenere la scelta del livello
difficultySelect.addEventListener("change", (e) => {
    difficulty = e.target.value;
    localStorage.setItem("difficulty", difficulty); // Salva per mantenere scelta
});
const words = [
    "ciao",
    "cane",
    "gatto",
    "computer",
    "javascript",
    "programmazione",
    "sviluppo",
    "web",
    "applicazione",
    "sito",
    "internet",
    "tecnologia",
    "software",
    "hardware",
    "sistema",
    "rete",
    "database",
    "algoritmo",
    "programmatore",
    "codice",
];

let randomWord;
let scoreValue = 0;
let timeValue = 10;
let difficulty = "easy";

const timeInterval = setInterval(updateTime, 1000);

function getRandomWord() {
    return words[Math.floor(Math.random() * words.length)];
}

function addWordToDOM() {
    randomWord = getRandomWord();
    word.innerText = randomWord;
}

function updateScore() {
    scoreValue++;
    score.innerText = scoreValue;
}

function updateTime() {
    timeValue--;
    time.innerText = timeValue + "s";
    if (timeValue === 0) {
        clearInterval(timeInterval);
        gameOver();
    }
}

//aggiungo if con difficulty prima di updateTime()
text.addEventListener("input", (e) => {
    const insertedText = e.target.value;
    if (insertedText === randomWord) {
        e.target.value = "";
        addWordToDOM();
        updateScore();
        if (difficulty === "hard") {
            timeValue += 2;
        } else if (difficulty === "medium") {
            timeValue += 3;
        } else {
            timeValue += 5;
        }
        updateTime();
    }
});

// TODO difficulty settings


addWordToDOM();
text.focus();

//cambio start button l'utente non può scriver finche non clicca Inizia
startButton.addEventListener("click", () => {
    scoreValue = 0;
    timeValue = 10;
    score.innerText = scoreValue;
    time.innerText = timeValue + "s";
    message.innerText = "";
    addWordToDOM();
    text.disabled = false;  // ✅ Riattiva input
    text.focus();
});
function gameOver() {
    message.innerHTML = `
        <h1>Tempo scaduto!</h1>
        <p>Il tuo punteggio è ${scoreValue}</p>
        <button onclick="location.reload()">Rigioca</button>
    `;
    text.disabled = true;
}
