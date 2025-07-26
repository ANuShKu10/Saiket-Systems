const quizData = [
  {
    question: "What is the correct syntax to link a CSS file to HTML?",
    options: [
      "<script src='style.css'>",
      "<link href='style.css'>",
      "<link rel='stylesheet' href='style.css'>",
      "<css link='style.css'>"
    ],
    answer: "<link rel='stylesheet' href='style.css'>"
  },
  {
    question: "Which of the following is NOT a JavaScript data type?",
    options: ["String", "Boolean", "Float", "Undefined"],
    answer: "Float"
  },
  {
    question: "What method is used to select an element by ID?",
    options: [
      "document.querySelector()",
      "document.getElementById()",
      "getElementByName()",
      "document.getElements()"
    ],
    answer: "document.getElementById()"
  },
  {
    question: "Which of the following is used to update content in the DOM?",
    options: [
      "innerText",
      "console.log()",
      "document.write()",
      "alert()"
    ],
    answer: "innerText"
  }
];

let currentQuestion = 0;
let score = 0;
let userAnswers = [];

function startQuiz() {
  document.getElementById("start-screen").style.display = "none";
  document.querySelector(".quiz-container").style.display = "block";
  loadQuestion();
}

function loadQuestion() {
  const q = quizData[currentQuestion];
  document.getElementById("question").innerText = q.question;

  const optionsContainer = document.getElementById("options");
  optionsContainer.innerHTML = "";

  q.options.forEach(option => {
    const label = document.createElement("label");
    label.classList.add("option");

    const input = document.createElement("input");
    input.type = "radio";
    input.name = "answer";
    input.value = option;

    label.appendChild(input);
    label.appendChild(document.createTextNode(option));
    optionsContainer.appendChild(label);
  });

  updateProgress();
}

function submitAnswer() {
  const selected = document.querySelector('input[name="answer"]:checked');
  const feedback = document.getElementById("feedback");
  feedback.innerText = "";

  if (!selected) {
    feedback.innerText = "⚠️ Please select an answer!";
    feedback.style.color = "#d32f2f";
    return;
  }

  const userAnswer = selected.value;
  const correctAnswer = quizData[currentQuestion].answer;

  userAnswers.push({
    question: quizData[currentQuestion].question,
    selected: userAnswer,
    correct: correctAnswer,
    isCorrect: userAnswer === correctAnswer
  });

  if (userAnswer === correctAnswer) {
    score++;
  }

  currentQuestion++;

  if (currentQuestion < quizData.length) {
    loadQuestion();
  } else {
    showFinalScore();
  }
}

function updateProgress() {
  const percent = ((currentQuestion) / quizData.length) * 100;
  document.getElementById("progress-bar").style.width = `${percent}%`;
}

function showFinalScore() {
  document.querySelector(".quiz-container").innerHTML = `
    <h2>🎉 You've completed the quiz!</h2>
    <p class="score">Your Score: ${score} / ${quizData.length}</p>
    <div class="review">
      <h3>📚 Review Incorrect Answers:</h3>
      ${generateReviewHTML()}
    </div>
    <button class="btn" onclick="restartQuiz()">Restart Quiz</button>
  `;
  document.getElementById("progress-bar").style.width = "100%";
}

function generateReviewHTML() {
  return userAnswers
    .filter(ans => !ans.isCorrect)
    .map(ans => `
      <div class="wrong-block">
        <p><strong>Q:</strong> ${ans.question}</p>
        <p class="wrong">Your Answer: ${ans.selected}</p>
        <p class="correct">Correct Answer: ${ans.correct}</p>
        <hr/>
      </div>
    `).join('') || "<p>✅ All answers were correct!</p>";
}

function restartQuiz() {
  currentQuestion = 0;
  score = 0;
  userAnswers = [];
  document.querySelector(".quiz-container").innerHTML = `
    <h2 id="question">Question</h2>
    <div id="options" class="fade"></div>
    <button class="btn" onclick="submitAnswer()">Next</button>
    <div id="feedback"></div>
  `;
  loadQuestion();
}
