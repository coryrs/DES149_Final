//To-Do:
// 1. Debug Score
// 2. Fix weird styling
// 3. Populate game array objects with Kinu's stuff
// 4. Style Overlay
// 5. Game end screen

const optionA = document.getElementById('option-a');
const optionB = document.getElementById('option-b');
const optionC = document.getElementById('option-c');
const optionD = document.getElementById('option-d');
const optionE = document.getElementById('option-e');
const gameImage = document.getElementById('game-image');
const question = document.getElementById('question');
const overlayMessage = document.getElementById('overlay');
const nextPage = document.getElementById('nextPage');
const scoreLabel = document.getElementById('score');
const maingame = document.getElementById('maingame');
const message = document.getElementById('message');
const overlayText = document.getElementById('overlay-text');
const correctAnswer = document.getElementById('correct-answer');
const overlayBg = document.getElementById('overlayBackground');
// var options = document.getElementsByClassName('option');

const optionsElement = document.getElementById('options');

const endBtn = document.getElementById('endBtn');
const restartBtn = document.getElementById('restartBtn');

const game = [
  {
    image: 'https://picsum.photos/300/200',
    question: 'What do you want to do today?',
    options: ['location', 'alphabet', 'time', 'category', 'hierarchy'],
    correctAns: 'location',
  },

  {
    image: 'https://picsum.photos/300/200',
    question: 'This is question 2',
    options: [
      'location and hierarchy',
      'alphabet',
      'time',
      'category',
      'just hierarchy',
    ],
    correctAns: 'alphabet',
  },

  {
    image: 'https://picsum.photos/300/200',
    question: 'How many elephants are in this pic?',
    options: [
      'location and hierarchy',
      'alphabet',
      'time',
      'category',
      'just hierarchy',
    ],
    correctAns: 'time',
  },
];

var score = 0;
var i = 0;

overlayMessage.style.display = 'none';

resetState();
pageDisplay(i);

// when next is clicked, increment i and display the new page.
nextPage.addEventListener('click', function() {
    overlayMessage.style.display = 'none';
    maingame.style.display = 'flex';
    if (i == game.length - 1) {
        endGame();
        return;
    }
    i++;
    resetState();
    pageDisplay(i);
});
// }

function resetState() {
    while (optionsElement.firstChild) {
        optionsElement.removeChild(optionsElement.firstChild);
    }
}

function pageDisplay(pageIndex) {
  overlayBg.style.display = 'none';
  gameImage.setAttribute('src', game[pageIndex].image);
  question.textContent = game[pageIndex].question;

  game[i].options.forEach(option => {
      const button = document.createElement('a');
      button.innerText = option;
      button.classList.add('option');
      button.classList.add('bluebtn');
      button.id = option;
      button.addEventListener('click', checkAnswer);
      optionsElement.appendChild(button);
  });
}


function checkAnswer(e) {
    // console.log("BTN CLICKED = ", e.target.id);
    if(game[i].correctAns === e.target.id) {
        score++;
        console.log("correct!! Score = ", score);

        //Turn on Success overlay
        maingame.style.display = 'none';
        overlayMessage.style.display = 'flex';
        overlayBg.style.display = 'block';
        message.textContent = 'Congratulations!';
        message.style.color = 'green';
        overlayText.textContent = 'You are great! No studying for you!';
        correctAnswer.textContent = `The correct LATCH principle is ${game[i].correctAns}.`;
        scoreLabel.textContent = `Score: ${score}`;
    } else {
        console.log("Wrong! Score = ", score);

        // Turn on failure overlay
        maingame.style.display = 'none';
        overlayMessage.style.display = 'flex';
        overlayBg.style.display = 'block';
        message.textContent = 'Wrong answer, please try again!';
        message.style.color = 'red';
        correctAnswer.textContent = `The correct LATCH principle is ${game[i].correctAns}.`;
        overlayText.textContent = 'You are so close, please go study more.';
        scoreLabel.textContent = `Score: ${score}`;
    }
}

function endGame() {
    console.log('GAME ENDED');

    //Turn on Game over overlay
    maingame.style.display = 'none';
    overlayMessage.style.display = 'flex';
    overlayBg.style.display = 'block';
    message.textContent = 'Game Over';
    message.style.color = 'yellow';
    overlayText.textContent = `Good job! Your score is ${score}`;
    correctAnswer.style.display = 'none';
    scoreLabel.textContent = `Score: ${score}`;

    // Remove the next button and replace it with a 'Play Again' button
    nextPage.style.display = 'none';

    const playAgainButton = document.createElement('a');
    playAgainButton.innerText = 'Play Again';
    playAgainButton.classList.add('bluebtn');
    playAgainButton.id = 'playAgain';
    playAgainButton.addEventListener('click', function() {
        // window.NavigationPreloadManager()
        console.log("Page reload");
    });
    optionsElement.appendChild(playAgainButton);
}
