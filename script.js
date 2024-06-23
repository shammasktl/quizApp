const questions = [
    {
        question: 'Which is Largest Animal in The World',
        answers: [
            { text: 'Shark', correct: false },
            { text: 'Blue Whale', correct: true },
            { text: 'Elephant', correct: false },
            { text: 'Girraffe', correct: false }
        ]
    },
    {
        question: 'Which is the Largest Continent in The Earth',
        answers: [
            { text: 'Antartica', correct: false },
            { text: 'Africa', correct: false },
            { text: 'Asia', correct: true },
            { text: 'Australia', correct: false }
        ]
    },
    {
        question: 'Which is the Smallest Continent in The Earth',
        answers: [
            { text: 'Antartica', correct: false },
            { text: 'Africa', correct: false },
            { text: 'Asia', correct: false },
            { text: 'Australia', correct: true }
        ]
    },
    {
        question: 'Who Acted as the Protogonist in the Film "The Matrix"',
        answers: [
            { text: 'Tony Cruise', correct: false },
            { text: 'Keanu Ravens', correct: true },
            { text: 'Leonardo Decapriyo', correct: false },
            { text: 'Will Smith', correct: false }
        ]
    },
    {
        question: 'Which "MCU" Product got a Responsive Box Office Collection',
        answers: [
            { text: 'Loki Season 2', correct: true },
            { text: 'Doctor Strange: the Multiverse of Madness', correct: false },
            { text: 'Shang Chi', correct: false },
            { text: 'Black Widow', correct: false }
        ]
    }
];

const questionElement = document.getElementById('question')
const answerButtons = document.getElementById('answer-buttons')
const nextButton = document.getElementById('next-btn')

let currentQuestionIndex = 0;
let score = 0; 

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = 'Next';
    showQuestion();
}

function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + '. ' + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement('button');
        button.innerHTML = answer.text;
        button.classList.add('btn');
        answerButtons.appendChild(button);
        if (answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener('click', selectAnswer);
    });

}

function resetState() {
    nextButton.style.display = 'none';
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === 'true';
    if (isCorrect) {
        selectedBtn.classList.add('correct');
        score++;
    } else {
        selectedBtn.classList.add('incorrect');
    }
    Array.from(answerButtons.children).forEach(button => {
        if (button.dataset.correct === 'true') {
            button.classList.add('correct')
        }
        button.disabled = true;

    });
    nextButton.style.display = 'block';
}

function showScore(){
    resetState();
    question.innerHTML = `You Score ${score} out of ${questions.length}!`;
    nextButton.innerHTML = 'Play Again';
    nextButton.style.display = 'block'
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}

nextButton.addEventListener('click', ()=> {
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
})

startQuiz();