const question = document.getElementById('question');
const choices = Array.from(document.getElementsByClassName('choice-text'));
const progressText = document.getElementById('progressText');
const scoreText = document.getElementById('score');
const progressBarFull = document.getElementById('progressBarFull');
const loader = document.getElementById('loader');
const game = document.getElementById('game');
let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuesions = [];

let questions = [
    {
      question: "What is a synonym for 'noxious'?",
      choice1: "unhealthy",
      choice2: "nutritious",
      choice3: "airy",
      choice4: "bubbly",
      answer: 1
    },
    {
      question:
        "Which one has a different meaning?",
      choice1: "slim",
      choice2: "lean",
      choice3: "tired",
      choice4: "slender",
      answer: 3
    },
    {
      question: "Which of the following is a synonym for “Hilarious”?",
      choice1: "Boring",
      choice2: " Grim",
      choice3: "Serious",
      choice4: "Amusing",
      answer: 4
    }
  ];
  

//CONSTANTS
const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 3;

function startGame() {
    questionCounter = 0;
    score = 0;
    availableQuesions = Array.from(questions);
    getNewQuestion();
    game.classList.remove('hidden');
    loader.classList.add('hidden');
}

function getNewQuestion() {
    if (availableQuesions.length === 0 || questionCounter >= MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score);
        //go to the end page
        return window.location.assign('file:///C:/Users/root/Desktop/QuizApp/end.html');
    }
    questionCounter++;
    progressText.innerText = 'Question ' + questionCounter + '/' + MAX_QUESTIONS;
    //Update the progress bar
    progressBarFull.style.width = (questionCounter / MAX_QUESTIONS) * 100 + '%';

    const questionIndex = Math.floor(Math.random() * availableQuesions.length);
    currentQuestion = availableQuesions[questionIndex];
    question.innerText = currentQuestion.question;

    choices.forEach(function(choice) {
        const number = choice.dataset['number'];
        choice.innerText = currentQuestion['choice' + number];
    });

    availableQuesions.splice(questionIndex, 1);
    acceptingAnswers = true;
}

choices.forEach(function(choice) {
    choice.addEventListener('click', function(e) {
        if (!acceptingAnswers) return;

        acceptingAnswers = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset['number'];

        const classToApply =
            selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect';

        if (classToApply === 'correct') {
            incrementScore(CORRECT_BONUS);
        }

        selectedChoice.parentElement.classList.add(classToApply);

        setTimeout(function() {
            selectedChoice.parentElement.classList.remove(classToApply);
            getNewQuestion();
        }, 1000);
    });
});

function incrementScore(num) {
    score += num;
    scoreText.innerText = score;
};

startGame();