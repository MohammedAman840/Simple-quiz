
const questions=[
    {
        question:"First Appearance of India In Olympics?",
        answers:[
            {text:"1896",correct: true},
            {text:"1890",correct: false},
            {text:"1898",correct: false},
            {text:"1897",correct: false}
        ]
    },
    {
        question:"Who is the first Indian woman to win an Olympic medal?",
        answers:[
            {text:"Saina Nehwal",correct: false},
            {text:"P V Sindhu",correct: false},
            {text:"K Malleswari",correct: true},
            {text:"Anuju Bobby George",correct: false}
        ]
    },
    {
        question:"India’s Total number of Appearance In Olympics?",
        answers:[
            {text:"45 times",correct: false},
            {text:"35 times",correct: true},
            {text:"25 times",correct: false},
            {text:"15 times",correct: false}
        ]
    },
    {
        question:"Highest Number of Medal Won by India?",
        answers:[
            {text:"10 Medals, 2021 Tokyo Olympics",correct: false},
            {text:"8 Medals, 2016 Rio Olympics",correct: false},
            {text:"12 Medals, 2012 London Olympics",correct: false},
            {text:"7 Medals, 2021 Tokyo Olympics",correct: true}
        ]
    },
    {
        question:"Which country is the host of the special Olympics World Games 2023?",
        answers:[
            {text:"India",correct: false},
            {text:"Japan",correct: false},
            {text:"Germany",correct: true},
            {text:"USA",correct: false}
        ]
    }
];

const questionElement=document.getElementById("question");
const answerButton=document.getElementById("ans-btn");
const nextButton=document.getElementById("next-btn");
const startButton=document.getElementById("start-btn");

let currentQuestionIndex=0;
let score=0;

function startQuiz(){
    currentQuestionIndex=0;
    score=0;
    nextButton.innerHTML="Next";
    showQuestion();
}
function showQuestion(){
    resetState()
    let currentQuestion=questions[currentQuestionIndex];
    let questionNo=currentQuestionIndex+1
    questionElement.innerHTML=questionNo+". "+currentQuestion.question;
    
    currentQuestion.answers.forEach(answer=>{
        const button=document.createElement("button");
        button.innerHTML=answer.text;
        button.classList.add("btn")
        answerButton.appendChild(button);
        if(answer.correct){
            button.dataset.correct=answer.correct;
        }
        button.addEventListener('click',selectAnswer);
    })
}

function resetState(){
    nextButton.style.display="none";
    while(answerButton.firstChild){
        answerButton.removeChild(answerButton.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn=e.target;
    const isCorrect=selectedBtn.dataset.correct==="true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }
    else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButton.children).forEach(button=>{
        if(button.dataset.correct==="true"){
            button.classList.add("correct");
        }
        button.disabled=true;
    })
    nextButton.style.display="block";
}


function showScore(){
    resetState();
    questionElement.innerHTML=`You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML="Play Again";
    nextButton.style.display="block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex<questions.length){
        showQuestion();
    }
    else{
        showScore();
    }
}

nextButton.addEventListener('click',()=>{
    if(currentQuestionIndex<questions.length){
        handleNextButton();
    }
    else{
        startQuiz();
    }
})


startQuiz();