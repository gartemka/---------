document.addEventListener("DOMContentLoaded", () => {
    const categoryIndex = localStorage.getItem("selectedCategory");
    if (categoryIndex === null) return;

    const category = questions[categoryIndex];
    const categoryTitle = document.getElementById("category-title");
    categoryTitle.textContent = category.name;

    let currentQuestionIndex = 0;
    loadQuestion();

    function loadQuestion() {
        if (currentQuestionIndex >= category.questions.length) {
            alert("Все вопросы пройдены!");
            window.location.href = "index.html";
            return;
        }

        const questionData = category.questions[currentQuestionIndex];
        document.getElementById("question-text").textContent = questionData.text;
        document.getElementById("question-img").src = questionData.img;
        document.getElementById("answer-input").value = "";
    }

    document.getElementById("submit-answer").addEventListener("click", () => {
        const userAnswer = document.getElementById("answer-input").value.trim().toLowerCase();
        const correctAnswer = category.questions[currentQuestionIndex].answer.toLowerCase();

        if (userAnswer === correctAnswer) {
            alert("Правильно!");
            currentQuestionIndex++;
            loadQuestion();
        } else {
            alert("Неправильно! Попробуйте еще раз.");
        }
    });
});
