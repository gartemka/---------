document.addEventListener("DOMContentLoaded", () => {
    const categoryIndex = localStorage.getItem("selectedCategory");
    const categoryTitle = document.getElementById("categoryTitle");
    const questionsDiv = document.getElementById("questions");
    const questionModal = document.getElementById("questionModal");
    const questionText = document.getElementById("questionText");
    const questionImage = document.getElementById("questionImage");
    const answerText = document.getElementById("answerText");
    const showAnswerBtn = document.getElementById("showAnswer");
    const closeQuestionBtn = document.getElementById("closeQuestion");
    const timerDisplay = document.getElementById("timer");
    let timer;
    let timeLeft = 300; // Начальное количество секунд

    const categories = [
        "Математический калейдоскоп",
        "Биологическое разнообразие",
        "Химическая реакция",
        "Ох уж эта физика",
        "По морям и океанам",
        "К звездам ввысь",
        "Коды информатики",
        "Чёрный ящик"
    ];

    const questionsData = {
        0: [ // Математический калейдоскоп
            { points: 5, text: 'Кому принадлежит высказывание : "Математику уже затем учить надо, что она ум в порядок приводит"?', answer: 'Михаилу Васильевичу Ломоносову', image: 'img/lomonosov.jpg' },
            { points: 10, text: 'Решите ребус:', answer: 'список', image: 'img/rebus1.jpg' },
            { points: 15, text: 'Решите ребус', answer: '5 = 1', image: 'img/rebus2.jpg' },
            { points: 20, text: 'Сколько раз надо сложить бумагу толщиной листа А4, чтобы она достигла Луны?', answer: '43', image: 'img/luna.jpg' },
        ],
        1: [ // Биологическое разнообразие
            { points: 5, text: 'Какая часть растения отвечает за поглощение воды?', answer: 'Корни', image: 'img/roots.jpg' },
            { points: 10, text: 'Какое животное ученые используют  для учета количества клещей?', answer: 'ежей', image: 'img/dg.jpeg' },
            { points: 15, text: '🔵ТАК называется плод у мака, льна и хлопчатника.', answer: 'коробочка', image: 'img/photosynthesis.jpg' },
            { points: 20, text: 'Назовите животное, на пол потомства которого влияет температура?', answer: 'крокодил', image: 'img/gg.jpeg' },
        ],
        2: [ // Химическая реакция
            { points: 5, text: '🔵В 1909 году химик Кикунаэ Икэда получил патент на ЕГО производство. Он получил название "адзи-но-мото" — "корень вкуса".', answer: 'глутамат натрия', image: 'img/chemical_reaction.jpg' },
            { points: 10, text: '🔵В честь ученого из какой страны назван пятый химический элемент бор?', answer: 'не назван в честь ученого из какой-либо страны', image: 'img/oxidation.jpg' },
            { points: 15, text: 'Почему вода не горит?', answer: 'Она уже сгорела', image: 'img/carbon.jpeg' },
            { points: 20, text: '🔵Химическая формула ЭТОГО соединения является единственным палиндромом среди всех химических формул.', answer: 'Бромид Рубидия (RbBr)', image: 'img/catalysis.jpg' },
        ],
        3: [ // Ох уж эта физика
            { points: 5, text: 'Какая цепь нужна для поддержки груза?', answer: 'В', image: 'img/force.jpg' },
            { points: 10, text: 'Из-за кого мы мало спим?', answer: 'Томас Эдисон', image: 'img/gravity.jpg' },
            { points: 15, text: 'Что происходит с Эйфелевой башней летом?', answer: 'высота Эйфелевой башни летом увеличивается примерно на 15 сантиметров', image: 'img/newton.jpg' },
            { points: 20, text: '⌛️ Почему в часе — 60 минут, а в минуте — 60 секунд?', answer: 'Потому что у вавилонян было 60 богов', image: 'img/inertia.jpeg' },
        ],
        4: [ // По морям и океанам
            { points: 5, text: 'Какое полезное ископаемое дало название пасте карбонара?', answer: 'уголь', image: 'img/jupiter.jpg' },
            { points: 10, text: 'В какое море не впадает ни одной реки?', answer: 'Красное, поэтому вода в нем очень прозрачная и чистая', image: 'img/sun.jpg' },
            { points: 15, text: 'Существуют ли в мире территории, не принадлежащие ни одному государству?', answer: 'Антарктида', image: 'img/ecliptic.jpg' },
            { points: 20, text: 'Какой самый продаваемый товар в мире?', answer: 'Кубик Рубика', image: 'img/ccc.jpeg' },
        ],
        5: [ // К звездам ввысь
            { points: 5, text: 'Как называется ближайшая к Земле звезда?', answer: 'Солнце', image: 'img/sun4.jpg' },
            { points: 10, text: 'Первая женщина космонавт Беларуси?', answer: 'Марина Витальевна Василевская', image: 'img/light_year.jpg' },
            { points: 15, text: '🔵За ЭТОТ промежуток времени Юрий Гагарин пролетел вокруг Земли.', answer: '108 минут', image: 'img/asteroid.jpg' },
            { points: 20, text: '🔵ЭТОЙ звезде мы обязаны словом "каникулы".', answer: 'Сириус. Альфа Большого Пса', image: 'img/andromeda.jpg' },
        ],
        6: [ // Коды информатики
            { points: 5, text: 'Задача на логическое мышление\n\nКоты знают информатику. Все коты любят музыку.\n\nКакое из следующих утверждений является истинным:\n\n1️⃣ Все, кто знают информатику, любят музыку.\n2️⃣ Информатику знают только коты.\n3️⃣ Коты, которые знают информатику, не любят музыку.\n4️⃣ Некоторые знатоки информатики любят музыку.\n5️⃣ Все знатоки информатики не любят музыку.\n6️⃣ Коты, которые любят музыку, не знают информатику.', answer: '4️⃣ Некоторые знатоки информатики любят музыку.', image: 'img/algorithm.jpg' },
            { points: 10, text: '🔵ОН был назван в честь марки кофе, которая, в свою очередь, получила наименование одноимённого острова.', answer: 'язык программирования Java', image: 'img/database.jpg' },
            { points: 15, text: '🔵ЕЁ считают первым программистом в истории и неофициально именуют «матерью всех программистов».', answer: 'Ада Лавлейс', image: 'img/programming_language.jpg' },
            { points: 20, text: 'Его создателем считается Масахиро Хара. Сам термин является зарегистрированным товарным знаком японской компании «Denso»', answer: 'Quick Response code — код быстрого отклика; сокр. QR code)', image: 'img/ntt.jpg' },
        ],
        7: [ // Чёрный ящик
            { points: 5, text: 'В каком году начал функционировать техникум?', answer: '1955', image: 'img/black_box.jpeg' },
            { points: 10, text: 'Вставьте пропущенное число вместо x:\n\nx февраля 1955 года к учёбе в машиностроительном техникуме приступило x групп.', answer: '7', image: 'img/system.jpeg' },
            { points: 15, text: 'Сколько специальностей в колледже в настоящее время?', answer: '9', image: 'img/feedback.jpeg' },
            { points: 20, text: 'Сколько директоров руководило техникумом и колледжем за 70 лет?', answer: '6', image: 'img/elements.jpeg' },
        ]
    };
  
    if (categoryIndex !== null) {
        categoryTitle.textContent = categories[categoryIndex];
        loadQuestions(questionsData[categoryIndex]);
    }

    function loadQuestions(questions) {
        questionsDiv.innerHTML = "";
        questions.forEach((question, index) => {
            const questionButton = document.createElement("button");
            questionButton.classList.add("question");
            questionButton.textContent = `${question.points} баллов`;
            questionButton.dataset.index = index;

            if (localStorage.getItem(`question_${categoryIndex}_${index}`) === "answered") {
                questionButton.style.backgroundColor = "gray";
            }

            questionButton.addEventListener("click", () => {
                openQuestion(question, questionButton);
            });

            questionsDiv.appendChild(questionButton);
        });
    }

    function openQuestion(question, button) {
        questionText.textContent = question.text;
        questionImage.src = question.image;
        answerText.style.display = "none";
        showAnswerBtn.style.display = "block";
        answerText.textContent = question.answer; // Записываем ответ в переменную для отображения
        answerText.dataset.answer = question.answer; // Сохраняем ответ для кнопки

        questionModal.style.display = "flex";
        button.style.backgroundColor = "gray";
        localStorage.setItem(`question_${categoryIndex}_${button.dataset.index}`, "answered");

        startTimer();
    }

    function startTimer() {
        let minutes = 0;
        let seconds = timeLeft;

        timerDisplay.textContent = `Осталось: ${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;

        timer = setInterval(() => {
            if (seconds === 0 && minutes === 0) {
                clearInterval(timer);
                showAnswerBtn.style.display = "block";
            } else {
                if (seconds === 0) {
                    minutes--;
                    seconds = 59;
                } else {
                    seconds--;
                }
                timerDisplay.textContent = `Осталось: ${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
            }
        }, 1000);
    }

    showAnswerBtn.addEventListener("click", () => {
        clearInterval(timer);
        answerText.style.display = "block";
        showAnswerBtn.style.display = "none"; // Скрываем кнопку после показа ответа
    });

    closeQuestionBtn.addEventListener("click", () => {
        questionModal.style.display = "none";
        clearInterval(timer);
        timerDisplay.style.display = "none";
    });

    document.getElementById("backToCategories").addEventListener("click", () => {
        window.location.href = "index.html";
    });

    document.getElementById("resetQuestions").addEventListener("click", () => {
        localStorage.clear();
        document.querySelectorAll(".question").forEach(btn => btn.style.backgroundColor = "");
    });
});