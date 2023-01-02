/* JS file for HTML Quizzes page*/

// Initial required ariables
const question = document.getElementById('question');

const choiceA = document.getElementById('a');
const lblA = document.getElementById('labelA');

const choiceB = document.getElementById('b');
const lblB = document.getElementById('labelB');

const choiceC = document.getElementById('c');
const lblC = document.getElementById('labelC');

const choiceD = document.getElementById('d');
const lblD = document.getElementById('labelD');

const options = document.getElementsByName('optionsRadios');
let optionValue;

const btnCheck = document.getElementById('checkAnswer');

let questionCtr = 0;
let currentQuestion = {};
let acceptAnswer = false;
let questions = [];
let questionArr = [];
let questionIndex;

// Get data from the local json file For HTML quizzes
fetch('/data/htmlqna.json')
    .then(function (response) {
            return response.json();
        })
    .then(function (data) {
        questions = data;
        appendData(data);
            return true;
        })
        .catch(function (err) {
            console.log('error: ' + err);
})

// Append questions and answers to HTML Quizzes page
appendData = (data) => {
    // index
    // console.log(questionArr);
    // for (let getData of data.question) {
    //     question.innerHTML = getData;
    // }
    questionArr = [...questions];
    getNextQuestion();
};

// Get the next question
getNextQuestion = () => {
    questionCtr++;
    questionIndex = Math.floor(Math.random() * questionArr.length);
    currentQuestion = questionArr[questionIndex];

    // Apply the random question to the html page
    question.innerHTML = currentQuestion.question;

    // Apply the choices to the html page rodio buttons
    choiceA.setAttribute('value', currentQuestion.a);
    lblA.innerText = currentQuestion.a;
    
    choiceB.setAttribute('value', currentQuestion.b);
    lblB.innerText = currentQuestion.b;

    choiceC.setAttribute('value', currentQuestion.c);
    lblC.innerText = currentQuestion.c;

    choiceD.setAttribute('value', currentQuestion.d);
    lblD.innerText = currentQuestion.d;

    questionArr.splice(questionIndex, 1);
    acceptAnswer = true;

    btnCheck.addEventListener('click', function () {
        for (let i = 0; i < options.length; i++){
        if (options[i].checked) {
            optionValue = options[i].value;
            if (optionValue === currentQuestion.correct) {
                console.log('yes');
            } else {
                console.log('no');
            }
        }
    }
    });
}
