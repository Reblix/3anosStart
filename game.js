// Armazenar as perguntas e respostas
const questions = [
    {
        question: "Qual é a capital do Brasil?",
        options: ["São Paulo", "Rio de Janeiro", "Brasília", "Salvador"],
        answer: 2
    },
    {
        question: "Qual é o maior planeta do sistema solar?",
        options: ["Júpiter", "Saturno", "Terra", "Vênus"],
        answer: 0
    },
    // Adicione as outras perguntas aqui
];

// Elementos da interface
const startButton = document.getElementById("startButton");
const questionContainer = document.getElementById("questionContainer");
const questionElement = document.getElementById("question");
const optionsElement = document.getElementById("options");
const nextButton = document.getElementById("nextButton");
const gameOverContainer = document.getElementById("gameOverContainer");
const retryButton = document.getElementById("retryButton");
const winContainer = document.getElementById("winContainer");
const surprise1Button = document.getElementById("surprise1Button");
const surprise2Button = document.getElementById("surprise2Button");
const backgroundAudio = document.getElementById("backgroundAudio");
const correctSound = document.getElementById("correctSound");
const wrongSound = document.getElementById("wrongSound");

// Variáveis do jogo
let currentQuestionIndex = 0;
let score = 0;

// Inicializar o jogo
function initializeGame() {
    startButton.addEventListener("click", startGame);
    nextButton.addEventListener("click", () => {
        currentQuestionIndex++;
        setNextQuestion();
    });
    retryButton.addEventListener("click", startGame);
    surprise1Button.addEventListener("click", () => {
        alert("Almoço em restaurante de sua escolha");
    });
    surprise2Button.addEventListener("click", () => {
        alert("Qualquer almoço de aplicativo de sua escolha");
    });

    setGameScreen("container");
}

// Iniciar o jogo
function startGame() {
    score = 0;
    currentQuestionIndex = 0;
    setGameScreen("questionContainer");
    setNextQuestion();
}

// Exibir a próxima pergunta
function setNextQuestion() {
    if (currentQuestionIndex < questions.length) {
        showQuestion(questions[currentQuestionIndex]);
    } else {
        endGame();
    }
}

// Exibir a pergunta atual
function showQuestion(question) {
    questionElement.innerText = question.question;
    optionsElement.innerHTML = "";

    for (let i = 0; i < question.options.length; i++) {
        const option = document.createElement("li");
        option.innerText = question.options[i];
        option.dataset.index = i;
        option.addEventListener("click", selectOption);
        optionsElement.appendChild(option);
    }
}

// Selecionar a opção
function selectOption(event) {
    const selectedOption = event.target;
    const selectedAnswer = parseInt(selectedOption.dataset.index);

    if (selectedAnswer === questions[currentQuestionIndex].answer) {
        score++;
        playCorrectSound();
    } else {
        playWrongSound();
        setGameScreen("gameOverContainer");
    }

    selectedOption.classList.add("selected");

    Array.from(optionsElement.children).forEach(option => {
        option.removeEventListener("click", selectOption);
        if (parseInt(option.dataset.index) === questions[currentQuestionIndex].answer) {
            option.classList.add("correct");
        } else {
            option.classList.add("incorrect");
        }
    });

    nextButton.disabled = false;
}

// Finalizar o jogo
function endGame() {
    if (score === questions.length) {
        setGameScreen("winContainer");
    } else {
        setGameScreen("gameOverContainer");
    }
}

// Alterar a tela exibida
function setGameScreen(screen) {
    startButton.style.display = screen === "container" ? "block" : "none";
    questionContainer.style.display = screen === "questionContainer" ? "block" : "none";
    gameOverContainer.style.display = screen === "gameOverContainer" ? "block" : "none";
    winContainer.style.display = screen === "winContainer" ? "block" : "none";
    backgroundAudio.pause();

    if (screen === "container" || screen === "questionContainer") {
        backgroundAudio.currentTime = 0;
        backgroundAudio.play();
    }
}

// Função para reproduzir o efeito sonoro de resposta correta
function playCorrectSound() {
    correctSound.currentTime = 0;
    correctSound.play();
}

// Função para reproduzir o efeito sonoro de resposta errada
function playWrongSound() {
    wrongSound.currentTime = 0;
    wrongSound.play();
}

// Inicializar o jogo quando a página carregar
document.addEventListener("DOMContentLoaded", initializeGame);
