/* JS file for Science & Nature Quizzes page*/

// Initial required ariables
const question = document.getElementById('question');
const choiceDiv = document.getElementById('choiceDiv');

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
const alert = document.getElementById('alert');

let questionCtr = 0;
let currentQuestion = {};
let acceptAnswer = false;
let questions = [];
let questionArr = [];
let questionIndex;
let results;

// Get data from the open web api
fetch('https://opentdb.com/api.php?amount=10&category=17&type=multiple')
    .then(function (response) {
            return response.json();
        })
    .then(function (data) {
            //questions = data;
            appendData(data);
            return true;
        })
        .catch(function (err) {
            console.log('error: ' + err);
})

// Append questions and answers to HTML Quizzes page
appendData = (data) => {
    //questionArr = [...questions];
    results = data.results;
    getNextQuestion();
};

// Get the next question
getNextQuestion = () => {
    questionCtr++;
    questionIndex = Math.floor(Math.random() * results.length);
    currentQuestion = results[questionIndex];

    // Get all answers in one array
    let answersArr = currentQuestion.incorrect_answers;
    let randomIndex = Math.floor(Math.random() * (answersArr.length + 1));
    answersArr.splice(randomIndex, 0, currentQuestion.correct_answer);
    //console.log(answersArr);

    // Apply the random question to the html page
    question.innerHTML = currentQuestion.question;

    // Apply the choices to the html page rodio buttons
    for (let i = 0; i < answersArr.length; i++){
        let div = document.createElement('div');
        div.classList.add('form-check');

        let input = document.createElement('input');
        input.classList.add('form-check-input');
        input.setAttribute('type', 'radio');
        input.setAttribute('name', 'optionsRadios');
        input.setAttribute('value', answersArr[i]);

        let label = document.createElement('label');
        label.innerText = answersArr[i];

        div.appendChild(input);
        div.appendChild(label);
        choiceDiv.appendChild(div);
    }
        results.splice(questionIndex, 1);
        acceptAnswer = true;

    // Validate the user answer & display the corresponding alert
    btnCheck.addEventListener('click', function () {
        for (let i = 0; i < options.length; i++){
        if (options[i].checked) {
            optionValue = options[i].value;
            // console.log(optionValue);
            if (optionValue === currentQuestion.correct_answer) {
                //console.log('yes');
                alert.innerHTML = `<div class="alert alert-dismissible alert-info">
  <button type="button" class="btn-close" data-bs-dismiss="alert"></button>Well done! You chose the correct answer.</div>`
            } else {
                //console.log('no');
                alert.innerHTML = `<div class="alert alert-dismissible alert-secondary">
  <button type="button" class="btn-close" data-bs-dismiss="alert"></button>The answer is wrong. Please try again.</div>`
            }
        }
    }
    });
}
