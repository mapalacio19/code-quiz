const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const progressText = document.getElementById('progressText');
const scoreText = document.getElementById('score');
const progressBarFull = document.getElementById("progressBarFull");

let currentQuestion = {};
let acceptAnswers = true;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

let questions = [
    {
        question: "Which artist or band sold the most records?",
        choice1: "Garth Brooks",
        choice2: "The Beatles",
        choice3: "Michael Jackson",
        choice4: "Elvis Presley",
        answer: 2
    },

    {
        question: "How many bands has the lead singer of the Foo Fighters (Dave Grohl) been in?",
        choice1: "42",
        choice2: "7",
        choice3: "11",
        choice4: "30",
        answer: 4
    },

    {
        question: "What is Snoop Doggs real name?",
        choice1: "Calvin Roy Smith Jr.",
        choice2: "Sean John Cordozar",
        choice3: "Calvin Cordozar Broadus Jr.",
        choice4: "Lucas John",
        answer: 3
    },

    {
        question: "What is the most known jazz instrument?",
        choice1: "Trumpet",
        choice2: "Drums",
        choice3: "Piano",
        choice4: "Saxophone",
        answer: 4
    }
]

// CONSTANTS
const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 4;

startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions];
    getNewQuestion();
};

getNewQuestion = () => {

    if(availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS){
        //go to the end page
        return window.location.assign("end.html");
    }

    questionCounter++;
    progressText.innerText = `Question ${questionCounter}/${MAX_QUESTIONS}`;
    //Update the progress bar
    progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;

    const questionIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionIndex];
    question.innerText = currentQuestion.question;

    choices.forEach( choice => {
        const number = choice.dataset['number'];
        choice.innerText = currentQuestion['choice'+ number];
    });

    availableQuestions.splice(questionIndex, 1);
    acceptingAnswers = true;
}

choices.forEach(choice => {
    choice.addEventListener("click", e => {
        if(!acceptingAnswers) return;

    acceptingAnswers = false;
    const selectedChoice = e.target;
    const selectedAnswer = selectedChoice.dataset["number"];

    const classToApply = selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";

        if(classToApply == 'correct') {
            incrementScore(CORRECT_BONUS);
        }

    selectedChoice.parentElement.classList.add(classToApply); 

    setTimeout( () => {
    selectedChoice.parentElement.classList.remove(classToApply);   
    getNewQuestion();
    }, 1000);
    });
});

incrementScore = num => {
    score +=num;
    scoreText.innerText = score;
};

startGame();