const responses = [
  {
    question: "What does 'aprender' stand for?",
    answers: [
      { text: "to learn", correct: true },
      { text: "to read", correct: false },
      { text: "to write", correct: false },
    ],
  },
  {
    question: "What does 'escribir' stand for??",
    answers: [
      { text: "listen", correct: false },
      { text: "to write", correct: true },
      { text: "to taste", correct: false },
    ],
  } ,
  {
    question: "What does 'leer' stand for?",
    answers: [
    {text:"read", correct: true}, 
    {text:"see", correct: false}, 
    {text:"look", correct: false}
    ]
  },
  {
    question: "What does 'escuchar' stand for?",
    answers: [
        {text:"sit", correct: false}, 
        {text:"run", correct: false}, 
        {text:"listen", correct: true}
    ]
  },
  {
    question: "What does 'tocar' stand for?",
    answers: [
        {text:"taste", correct: false}, 
        {text:"touch", correct: true}, 
        {text:"kick", correct: false}
    ]
  },
  {
    question: "What does 'ver' stand for?",
    answers: [
        {text:"see", correct: true}, 
        {text:"listen", correct: false}, 
        {text:"look", correct: false}
    ]
  },
  {
    question: "What does 'el olor' stand for?",
    answers: [
        {text:"smell", correct: true}, 
        {text:"run", correct: false}, 
        {text:"kiss", correct: false}
    ]
  },
  {
    question: "What does 'caminar' stand for?",
    answers: [
        {text:"to eat", correct: false}, 
        {text:"sit", correct: false}, 
        {text:"walk", correct: true}
    ]
  },
  {
    question: "What does 'ayudar' stand for?",
    answers: [
        {text:"kiss", correct: false}, 
        {text:"help", correct: true}, 
        {text:"sit", correct: false}
    ]
  }, 
];

const questionEl = document.getElementById("question");
const answerBtn = document.getElementById("answer_list");
const nextBtn = document.getElementById("next_btn");
const submitBtn = document.getElementById("submitBtn");
const quizBox = document.querySelector(".quiz");
const scoreboard = document.getElementsByClassName("scoreboard");

let questionIndex = 0;
let score = 0;

function startQuiz() {
  questionIndex = 0;
  score = 0;
  nextBtn.innerHTML = "Next";
  showQuestion();
}

function showQuestion() {
  resetState();
  let currentQuestion = responses[questionIndex];
  let questionNo = questionIndex + 1;
  questionEl.innerHTML = questionNo + ". " + currentQuestion.question;

  currentQuestion.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerHTML = answer.text;
    button.classList.add("btn");
    answerBtn.appendChild(button);
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
  });
}

function showScore() {
  resetState();
  questionEl.innerHTML = `You got ${score} pt(s) of ${responses.length}
    !`;
  nextBtn.innerHTML = "Play again?";
  nextBtn.style.display = "block";
  
} 

function restartButton() {
  questionIndex++;
  if (questionIndex < responses.length) {
    showQuestion();
  } else {
    showScore();
  }
}

nextBtn.addEventListener("click", function () {
  if (questionIndex < responses.length) {
    restartButton();
  } else {
    startQuiz();
  }
});

function resetState() {
  nextBtn.style.display = "none";
  while (answerBtn.firstChild) {
    answerBtn.removeChild(answerBtn.firstChild);
  }
}

function selectAnswer(x) {
  const selectedBtn = x.target;
  const isCorrect = selectedBtn.dataset.correct === "true";
  if (isCorrect) {
    selectedBtn.classList.add("correct");
    score++;
  } else {
    selectedBtn.classList.add("incorrect");
  }

  Array.from(answerBtn.children).forEach((button) => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    }
    button.disabled = true;
  });
  nextBtn.style.display = "block";
}

startQuiz();

function endQuiz() {
  var scoreboard = document.querySelector(".scoreboard");
  scoreboard.style.display = "block";

  quizBox.style.display = "none";
}

submitBtn.addEventListener("click", submission);

function submission() {
  var initials = document.getElementById("initials").value;

  var highscore = JSON.parse(localStorage.getItem("score")) || [];
  highscore.push({
    initials: initials,
    score: score,
  });
  localStorage.setItem("score", JSON.stringify(highscore));
  console.log(highscore);

  
}

/* restartBtn.addEventListener("click", function(){window.location.reload();})   */
