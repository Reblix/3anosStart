// Músicas e sons
let backgroundMusic = new Audio('assets/sounds/twice.mp3');
let correctSound = new Audio('assets/sounds/acertou.mp3');
let gameOverSound = new Audio('assets/sounds/errou.mp3');
let winSound = new Audio('assets/sounds/aespa.mp3');

let gameContainer = document.getElementById('gameContainer');

// Definição do jogo
let gameState = 'START';

// Perguntas e respostas
let questions = [
  { question: "Primeira pergunta - Qual é o nosso lugar favorito nº1 pra bater papo e ter reflexões e tals?", correctAnswer: "Praça da igreja", wrongAnswers: ["Center", "Nosso quarto", "Praça da caminhada com sorvetinho"] },
  { question: "Segunda pergunta - Quem é melhor lutador?", correctAnswer: "Demolidor", wrongAnswers: ["Batman", "Punho de ferro", "Shang-Chi"] },
  { question: "Terceira pergunta - Chocolate branco é chocolate?", correctAnswer: "É sim, pq? Pq sim.", wrongAnswers: ["É chocolate preto pintado de branco", "É doce leite printado de branco", "É uma invenção dos comunistas"] },
  { question: "Quarta pergunta - Heluara Madlene odeia cor laranja no seu vesturário, exceto por:", correctAnswer: "Cinto laranja", wrongAnswers: ["Alça de sandália laranja", "Alça de bolsa laranja", "Listra em sapato"] },
  { question: "Quinta pergunta - Qual foi o álbum de kpop mais vendido até hoje? ", correctAnswer: "Proof - BTS", wrongAnswers: [" Bambi -  Baekhyun (EXO)", "Hello Future - NCT Dream", "NOEASY - STRAY KIDS"] }
];

let currentQuestion = 0;

// Função de renderização do jogo
function renderGame() {
  gameContainer.innerHTML = '';

  if (gameState === 'START') {
    let startMessage = document.createElement('p');
    startMessage.textContent = "Hoje o nosso dia vai ser todo diferentão, então tu vai precisar zerar esse joguinho pra seguirmos pra próxima etapa e tals.";
    gameContainer.appendChild(startMessage);

    let startButton = document.createElement('button');
    startButton.textContent = "Iniciar";
    startButton.onclick = function() {
      gameState = 'TITLE';
      backgroundMusic.play(); // toca a música de fundo
      renderGame();
    };
    gameContainer.appendChild(startButton);
  } else if (gameState === 'TITLE') {
    let title = document.createElement('h1');
    title.textContent = "Reblix's Quiz, 3 anos hein? Uau!";
    gameContainer.appendChild(title);

    let nextButton = document.createElement('button');
    nextButton.textContent = "Começar Quiz";
    nextButton.onclick = function() {
      gameState = 'QUIZ';
      renderGame();
    };
    gameContainer.appendChild(nextButton);
  } else if (gameState === 'QUIZ') {
    let questionParagraph = document.createElement('p');
    questionParagraph.textContent = questions[currentQuestion].question;
    gameContainer.appendChild(questionParagraph);

    let correctAnswerButton = document.createElement('button');
    correctAnswerButton.textContent = questions[currentQuestion].correctAnswer;
    correctAnswerButton.onclick = function() {
      correctSound.play();
      currentQuestion++;
      if (currentQuestion === questions.length) {
        gameState = 'WIN';
      }
      renderGame();
    };
    gameContainer.appendChild(correctAnswerButton);

    for (let j = 0; j < questions[currentQuestion].wrongAnswers.length; j++) {
      let wrongAnswerButton = document.createElement('button');
      wrongAnswerButton.textContent = questions[currentQuestion].wrongAnswers[j];
      wrongAnswerButton.onclick = function() {
        gameState = 'GAME_OVER';
        renderGame();
      };
      gameContainer.appendChild(wrongAnswerButton);
    }
  } else if (gameState === 'GAME_OVER') {
    let gameOverMessage = document.createElement('p');
    gameOverMessage.textContent = "Errooooou, erroooou feio!!!!";
    gameContainer.appendChild(gameOverMessage);

    let tryAgainButton = document.createElement('button');
    tryAgainButton.textContent = "Tentar novamente";
    tryAgainButton.onclick = function() {
      gameState = 'QUIZ';
      currentQuestion = 0;
      renderGame();
    };
    gameContainer.appendChild(tryAgainButton);
    backgroundMusic.volume = 0.5; // reduz o volume da música de fundo
    gameOverSound.play();
    gameOverSound.onended = function() {
      backgroundMusic.volume = 1; // restaura o volume da música de fundo
    }
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
    backgroundMusic.pause(); // para a música de fundo
    winSound.play();
  }
}

// Inicializa o jogo
renderGame();
