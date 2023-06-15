var correctSound = new Audio("assets/sounds/acertou.mp3");
var incorrectSound = new Audio("assets/sounds/errou.mp3");
var victorySound = new Audio("assets/sounds/aespa.mp3");
var backgroundMusic = document.getElementById("background-music");
var answerMusic = document.getElementById("answer-music");

var welcomeElement = document.querySelector('.message');
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

startButtonElement.addEventListener('click', startGame);
restartButtonElement.addEventListener('click', restartGame);
option1Element.addEventListener('click', function() {
  showMessage("Parabéns, você é a mulher mais inteligente e sexy desse mundo mesmo hein, agora escolhe o que vamos fazer:");
});
option2Element.addEventListener('click', function() {
  showMessage("Parabéns, você é a mulher mais inteligente e sexy desse mundo mesmo hein, agora escolhe o que vamos fazer:");
});

function startGame() {
  welcomeElement.style.display = "none";
  titleElement.style.display = "none";
  startButtonElement.style.display = "none";
  gameElement.style.display = "block";
  loadQuestion();
  backgroundMusic.play();
}

function loadQuestion() {
  if (currentQuestionIndex >= questions.length) {
    gameElement.style.display = "none";
    congratsElement.style.display = "block";
    victorySound.play();
    backgroundMusic.pause();
  } else {
    var question = questions[currentQuestionIndex];
    questionElement.innerText = question.text;
    optionsElement.forEach(function(element, index) {
      element.innerText = question.options[index];
      element.addEventListener('click', function() {
        if (this.innerText === question.answer) {
          currentQuestionIndex++;
          loadQuestion();
          correctSound.play();
        } else {
          gameElement.style.display = "none";
          gameOverElement.style.display = "block";
          incorrectSound.play();
        }
      });
    });
  }
}

function restartGame() {
  currentQuestionIndex = 0;
  gameOverElement.style.display = "none";
  gameElement.style.display = "block";
  loadQuestion();
}

function showMessage(message) {
  congratsElement.style.display = "none";
  var pElement = document.createElement("p");
  pElement.innerText = message;
  congratsElement.appendChild(pElement);
  option1Element.style.display = "block";
  option2Element.style.display = "block";
}
