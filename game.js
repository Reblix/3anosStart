var correctSound = new Audio("assets/sounds/acertou.mp3");
var incorrectSound = new Audio("assets/sounds/errou.mp3");
var victorySound = new Audio("assets/sounds/aespa.mp3");
var backgroundMusic = document.getElementById("background-music");
var answerMusic = document.getElementById("answer-music");

var welcomeElement = document.querySelector('.welcome-message');
var titleElement = document.querySelector('.title');
var startButtonElement = document.getElementById('start-button');
var gameElement = document.getElementById('game');
var questionElement = document.getElementById('question');
var optionsElement = Array.from(document.getElementsByClassName('option'));
var gameOverElement = document.getElementById('game-over');
var restartButtonElement = document.getElementById('restart-button');
var congratsElement = document.getElementById('congrats');
var option1Element = document.getElementById('option1');
var option2Element = document.getElementById('option2');

var questions = [
  {
    text: "Quem é mais over power de todos?",
    options: ["Batman", "Batman com preparo", "Batman do futuro", "Batman sempre"],
    answer: "Batman sempre"
  },
  {
    text: "Quem é a mulher mais bonita do multiverso?",
    options: ["Hyun-ah", "Madonna", "Heluara Madlene"],
    answer: "Heluara Madlene"
  },
  {
    text: "Qual album de kpop teve maior renda até hoje?",
    options: ["Map of the Soul: Persona do BTS", "The War do EXO", "Map of the Soul: 7 do BTS", "Love Yourself: Answer do BTS"],
    answer: "Map of the Soul: 7 do BTS"
  }
];

var currentQuestionIndex = 0;
var backgroundMusicVolume = 0.6;

startButtonElement.addEventListener('click', function() {
  welcomeElement.style.display = "none";
  titleElement.style.display = "block";
  gameElement.style.display = "block";
  loadQuestion();
  backgroundMusic.play();
});

restartButtonElement.addEventListener('click', restartGame);
option1Element.addEventListener('click', function() {
  if (checkAnswer(option1Element.innerText)) {
    showCongratsMessage();
    correctSound.play();
    backgroundMusic.volume = backgroundMusicVolume;
    setTimeout(function() {
      currentQuestionIndex++;
      loadQuestion();
    }, 1000);
  } else {
    showWrongMessage();
    incorrectSound.play();
    backgroundMusic.volume = backgroundMusicVolume;
  }
});

option2Element.addEventListener('click', function() {
  if (checkAnswer(option2Element.innerText)) {
    showCongratsMessage();
    correctSound.play();
    backgroundMusic.volume = backgroundMusicVolume;
    setTimeout(function() {
      currentQuestionIndex++;
      loadQuestion();
    }, 1000);
  } else {
    showWrongMessage();
    incorrectSound.play();
    backgroundMusic.volume = backgroundMusicVolume;
  }
});

function startGame() {
  welcomeElement.style.display = "none";
  titleElement.style.display = "block";
  startButtonElement.style.display = "none";
  gameElement.style.display = "block";
  backgroundMusic.volume = backgroundMusicVolume;
  backgroundMusic.play();
}

function loadQuestion() {
  if (currentQuestionIndex >= questions.length) {
    gameElement.style.display = "none";
    congratsElement.style.display = "block";
    victorySound.play();
    backgroundMusic.volume = backgroundMusicVolume;
    backgroundMusic.pause();
  } else {
    var question = questions[currentQuestionIndex];
    questionElement.innerText = question.text;
    for (var i = 0; i < optionsElement.length; i++) {
      optionsElement[i].style.display = "block";
      optionsElement[i].innerText = question.options[i];
    }
  }
}

function restartGame() {
  currentQuestionIndex = 0;
  gameOverElement.style.display = "none";
  gameElement.style.display = "block";
  loadQuestion();
}

function checkAnswer(selectedAnswer) {
  var question = questions[currentQuestionIndex];
  return selectedAnswer === question.answer;
}

function showCongratsMessage() {
  congratsElement.style.display = "block";
  congratsElement.innerText = "Olha pra ela como ela é inteligente, acertou, parabéns!!!";
  for (var i = 0; i < optionsElement.length; i++) {
    optionsElement[i].style.display = "none";
  }
}

function showWrongMessage() {
  congratsElement.style.display = "block";
  congratsElement.innerText = "Errrouuu, errou feeeeiooo";
  for (var i = 0; i < optionsElement.length; i++) {
    optionsElement[i].style.display = "none";
  }
}
