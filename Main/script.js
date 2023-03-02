var questionIndex = 0;
var time = 60;
var timer;

var questionsEl = document.querySelector("#questions");
var timerEl = document.querySelector("#time");
var choicesEl = document.querySelector("#choices");
var startbtn = document.querySelector("#start");
var submitbtn = document.querySelector("#submit");
var initialsEl = document.querySelector("#initials");
var feedbackEl = document.querySelector("#feedback");

function startQuiz() {
  var startScreenEl = document.querySelector("#start-screen");
  startScreenEl.setAttribute("class", "hide");
  questionsEl.removeAttribute("class");
  timer = setInterval(countdown, 1000);
  timerEl.textContent = time;
  loadQuestion();
}

function countdown() {
  time--;
  timerEl.textContent = time;
  if (time <= 0) {
    endQuiz();
  }
}

function loadQuestion() {
  var currentQuestion = questions[questionIndex];
  document.querySelector("#question-title").textContent = currentQuestion.title;
  choicesEl.innerHTML = "";
  for (var i = 0; i < currentQuestion.choices.length; i++) {
    var choice = currentQuestion.choices[i];
    var btn = document.createElement("button");
    btn.setAttribute("class", "choice");
    btn.setAttribute("value", choice);
    btn.textContent = i + 1 + ". " + choice;
    choicesEl.appendChild(btn);
  }
}

function checkAnswer(e) {
  var btn = e.target;
  if (!btn.matches(".choice")) {
    return;
  }
  if (btn.value !== questions[questionIndex].answer) {
    time -= 15;
    if (time < 0) {
      time = 0;
    }
    timerEl.textContent = time;
    feedbackEl.textContent = "incorrect";
  } else {
    feedbackEl.textContent = "correct";
  }
  feedbackEl.setAttribute("class", "feedback");
  setTimeout(() => {
    feedbackEl.setAttribute("class", "feedback hide");
  }, 1000);
  questionIndex++;
  if (time <= 0 || questionIndex === questions.length) {
    endQuiz();
  } else {
    loadQuestion();
  }
}

function endQuiz() {
  clearInterval(timer);
  document.querySelector("#end-screen").removeAttribute("class");
  questionsEl.setAttribute("class", "hide");
  document.querySelector("#final-score").textContent = time;
}

function saveScore() {
  var initials = initialsEl.value.trim();
  if (initials != "") {
    var scores = JSON.parse(localStorage.getItem("scores")) || [];
    var userScore = {
      score: time,
      initials: initials,
    };
    scores.push(userScore);
    localStorage.setItem("scores", JSON.stringify(scores));
    window.open('highscores.html');
  }
}

function checkForSubmission(e) {
  if (e.key === "Submit") {
    saveScore();
  }
}

submitbtn.onclick = saveScore;

startbtn.onclick = startQuiz;

choicesEl.onclick = checkAnswer;

initialsEl.onkeyup = checkForSubmission;
