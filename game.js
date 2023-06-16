// Músicas e sons
let backgroundMusic = new Audio('twice.mp3');
let correctSound = new Audio('acertou.mp3');
let gameOverSound = new Audio('errou.mp3');
let winSound = new Audio('aespa.mp3');

let gameContainer = document.getElementById('gameContainer');

// Definição do jogo
let gameState = 'START';

// Perguntas e respostas
let questions = [
  { question: "Primeira pergunta", correctAnswer: "Resposta correta 1", wrongAnswers: ["Resposta errada 1", "Resposta errada 2", "Resposta errada 3"] },
  { question: "Segunda pergunta", correctAnswer: "Resposta correta 2", wrongAnswers: ["Resposta errada 1", "Resposta errada 2", "Resposta errada 3"] },
  { question: "Terceira pergunta", correctAnswer: "Resposta correta 3", wrongAnswers: ["Resposta errada 1", "Resposta errada 2", "Resposta errada 3"] },
  { question: "Quarta pergunta", correctAnswer: "Resposta correta 4", wrongAnswers: ["Resposta errada 1", "Resposta errada 2", "Resposta errada 3"] },
  { question: "Quinta pergunta", correctAnswer: "Resposta correta 5", wrongAnswers: ["Resposta errada 1", "Resposta errada 2", "Resposta errada 3"] }
];

// Função de renderização do jogo
function renderGame() {
  gameContainer.innerHTML = '';

  if (gameState === 'START') {
    let startButton = document.createElement('button');
    startButton.textContent = "Iniciar";
    startButton.onclick = function() {
      gameState = 'QUIZ';
      renderGame();
    };
    gameContainer.appendChild(startButton);
    backgroundMusic.play();
  } else if (gameState === 'QUIZ') {
    for (let i = 0; i < questions.length; i++) {
      let questionParagraph = document.createElement('p');
      questionParagraph.textContent = questions[i].question;
      gameContainer.appendChild(questionParagraph);

      let correctAnswerButton = document.createElement('button');
      correctAnswerButton.textContent = questions[i].correctAnswer;
      correctAnswerButton.onclick = function() {
        correctSound.play();
        if (i === questions.length - 1) {
          gameState = 'WIN';
          renderGame();
        }
      };
      gameContainer.appendChild(correctAnswerButton);

      for (let j = 0; j < questions[i].wrongAnswers.length; j++) {
        let wrongAnswerButton = document.createElement('button');
        wrongAnswerButton.textContent = questions[i].wrongAnswers[j];
        wrongAnswerButton.onclick = function() {
          gameState = 'GAME_OVER';
          renderGame();
        };
        gameContainer.appendChild(wrongAnswerButton);
      }
    }
  } else if (gameState === 'GAME_OVER') {
    let gameOverMessage = document.createElement('p');
    gameOverMessage.textContent = "Errooooou, erroooou feio!!!!";
    gameContainer.appendChild(gameOverMessage);

    let tryAgainButton = document.createElement('button');
    tryAgainButton.textContent = "Tentar novamente";
    tryAgainButton.onclick = function() {
      gameState = 'QUIZ';
      renderGame();
    };
    gameContainer.appendChild(tryAgainButton);
    gameOverSound.play();
  } else if (gameState === 'WIN') {
    let winMessage = document.createElement('p');
    winMessage.textContent = "Olha pra elaaa, olha como ela é inteligenteeehhhh!!! Agora você vai ter que escolher entre 2 opções de surpresa";
    gameContainer.appendChild(winMessage);

    let surpriseButton1 = document.createElement('button');
    surpriseButton1.textContent = "Surpresa 1";
    surpriseButton1.onclick = function() {
      alert("Almoço em restaurante de sua escolha");
    };
    gameContainer.appendChild(surpriseButton1);

    let surpriseButton2 = document.createElement('button');
    surpriseButton2.textContent = "Surpresa 2";
    surpriseButton2.onclick = function() {
      alert("Qualquer almoço de aplicativo de sua escolha");
    };
    gameContainer.appendChild(surpriseButton2);
    winSound.play();
  }
}

// Inicializa o jogo
renderGame();
