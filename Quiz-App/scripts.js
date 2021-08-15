/*
**to do list
1- load first question
2- when submit load another one
3-after five questions display score and button to reload quiz
 */
const questions=[
    {
        id:1,
        question:'how many hearts octopus has?',
        choices:[3,2,1,5],
        correctAnswer:3
    },
    {
        id:2,
        question:'how many time hair grow after death?',
        choices:['3 months','1 week','2 day','1 month'],
        correctAnswer:'3 months'
    },
    {
        id:3,
        question:'which animal that has eye bigger than his head?',
        choices:['elephant','mouse','bear','ostrich'],
        correctAnswer:'ostrich'
    },
    {
        id:4,
        question:'who is the current president in America?',
        choices:['obama','bosh','bayden','tramb'],
        correctAnswer:'bayden'
    },
    {
        id:5,
        question:'which animal that will die if drink water?',
        choices:['elephant','mouse','bear','ostrich'],
        correctAnswer:'mouse'
    }
];

let currentQuestion  = 0;
let score = 0;

function loadQuiz(){
    const questionObj = questions[currentQuestion];

    var questionHTmlDiv = document.createElement("div");
    questionHTmlDiv.id=questionObj.id;
    questionHTmlDiv.className = "question";
    questionHTmlDiv.innerHTML = questionObj.question;
    document.getElementById("quiz-container").appendChild(questionHTmlDiv); 

    questionObj.choices.forEach(function (choice) {
        var div = document.createElement("div");
        div.className = 'choice-container';
        div.innerHTML = `<input type="radio" name="choice" value="${choice}" />
        <span>${choice}</span>`;
        document.getElementById("quiz-container").appendChild(div);  
    });
}
function clearPreviousQuestion(){
    document.getElementById("quiz-container").innerHTML = "";
}
function showScore(){
    document.getElementById('quiz-container').innerHTML = "";
    document.getElementById('quiz-container').style.display = "none";
    document.getElementById('startBtn').style.display = "block";
    document.getElementById('btn').style.display = "none";

    document.getElementById('score').innerHTML ='You Answer ' + score + '/5 Correct';
    document.getElementById('score').style.display = 'block';
}
function submitAnswer(){
    if(document.querySelector('input[name="choice"]:checked')){
    correctAnswer();
    currentQuestion++;
   if(currentQuestion > questions.length-1){
       showScore();
   }else{
    clearPreviousQuestion();
    loadQuiz();
   }
}
}
function correctAnswer(){
      const CurrentQuestionID =document.getElementsByClassName('question')[0].id;
      const userAnswer = document.querySelector('input[name="choice"]:checked').value;
      const correctAnswer = questions.filter(q => q.id == CurrentQuestionID);
     
      if(userAnswer == correctAnswer[0].correctAnswer){
          score++;
      }
}

//initial call
loadQuiz();