document.addEventListener("DOMContentLoaded", () => {
    const categoryIndex = localStorage.getItem("selectedCategory");
    const categoryTitle = document.getElementById("categoryTitle");
    const questionsDiv = document.getElementById("questions");
    const questionModal = document.getElementById("questionModal");
    const questionText = document.getElementById("questionText");
    const questionImage = document.getElementById("questionImage");
    const answerText = document.getElementById("answerText");
    const showAnswerButton = document.getElementById("showAnswer");


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
            { points: 5, text: 'Кому принадлежит высказывание: "Математику уже затем учить надо, что она ум в порядок приводит"?', answer: 'Михаилу Васильевичу Ломоносову', image: 'img/lomonosov.jpg' },
            { points: 10, text: 'Решите ребус: 3,1415... СЬ', answer: 'Подпись', image: 'img/rebus1.jpg' },
            { points: 15, text: 'Решите ребус: 5=1', answer: 'Не усложняйте задачу', image: 'img/rebus2.jpg' },
            { points: 20, text: 'Сколько раз надо сложить бумагу толщиной листа А4, чтобы она бы достигла Луны?', answer: 'Теорема Пифагора', image: 'img/luna.jpg' },
        ],
        1: [ // Биологическое разнообразие
            { points: 5, text: '🔵ТАК называется плод у мака, льна и хлопчатника.', answer: 'Процесс, при котором растения используют солнечный свет для производства пищи', image: 'img/photosynthesis.jpg' },
            { points: 10, text: 'Какое животное ученые используют  для учета количества клещей?', answer: 'Испарение', image: 'img/evaporation.jpg' },
            { points: 15, text: 'Какая часть растения отвечает за поглощение воды?', answer: 'Корни', image: 'img/roots.jpg' },
            { points: 20, text: 'Назовите животное, на пол потомства которого влияет температура?', answer: 'Совокупность живых существ и их окружающей среды', image: 'img/ecosystem.jpg' },
        ],
        2: [ // Химическая реакция
            { points: 5, text: '🔵В 1909 году химик Кикунаэ Икэда получил патент на ЕГО производство. Он получил название "адзи-но-мото" — "корень вкуса".', answer: 'Процесс, при котором вещества взаимодействуют, образуя новые вещества', image: 'img/chemical_reaction.jpg' },
            { points: 10, text: '🔵В честь ученого из какой страны назван пятый химический элемент бор?', answer: 'Процесс потери электронов атомами или ионами', image: 'img/oxidation.jpg' },
            { points: 15, text: 'Почему вода не горит?', answer: 'Углерод', image: 'img/carbon.jpeg' },
            { points: 20, text: '🔵Химическая формула ЭТОГО соединения является единственным палиндромом среди всех химических формул.', answer: 'Процесс ускорения химической реакции с помощью катализатора', image: 'img/catalysis.jpg' },
        ],
        3: [ // Ох уж эта физика
            { points: 5, text: 'Какая цепь нужна для поддержки груза?', answer: 'Взаимодействие, способное изменить движение объекта', image: 'img/force.jpg' },
            { points: 10, text: 'Из-за кого мы мало спим?', answer: 'Сила притяжения между телами с массой', image: 'img/gravity.jpg' },
            { points: 15, text: 'Что происходит с Эйфелевой башней летом?', answer: 'Ньютон', image: 'img/newton.jpg' },
            { points: 20, text: '⌛️ Почему в часе — 60 минут, а в минуте — 60 секунд?', answer: 'Свойство тел сохранять свое движение или покой', image: 'img/inertia.jpeg' },
        ],
        4: [ // По морям и океанам
            { points: 5, text: 'Какое полезное ископаемое дало название пасте карбонара?', answer: 'Юпитер', image: 'img/jupiter.jpg' },
            { points: 10, text: 'В какое море не впадает ни одной реки?', answer: 'Солнце', image: 'img/sun.jpg' },
            { points: 15, text: 'Существуют ли в мире территории, не принадлежащие ни одному государству?', answer: 'Плоскость орбиты Земли вокруг Солнца', image: 'img/ecliptic.jpg' },
            { points: 20, text: 'Какой самый продаваемый товар в мире?', answer: 'Сатурн', image: 'img/saturn.jpg' },
        ],
        5: [ // К звездам ввысь
            { points: 5, text: 'Как называется ближайшая к Земле звезда?', answer: 'Солнце', image: 'img/sun4.jpg' },
            { points: 10, text: 'Первая женщина космонавт Беларуси?', answer: 'Единица измерения расстояния в астрономии', image: 'img/light_year.jpg' },
            { points: 15, text: '🔵За ЭТОТ промежуток времени Юрий Гагарин пролетел вокруг Земли.', answer: 'Малое небесное тело, которое вращается вокруг Солнца', image: 'img/asteroid.jpg' },
            { points: 20, text: '🔵ЭТОЙ звезде мы обязаны словом "каникулы".', answer: 'Галактика Андромеды', image: 'img/andromeda.jpg' },
        ],
        6: [ // Коды информатики
            { points: 5, text: 'Задача на логическое мышление\n\nКоты знают информатику. Все коты любят музыку.\n\nКакое из следующих утверждений является истинным:\n\n1️⃣ Все, кто знают информатику, любят музыку.\n2️⃣ Информатику знают только коты.\n3️⃣ Коты, которые знают информатику, не любят музыку.\n4️⃣ Некоторые знатоки информатики любят музыку.\n5️⃣ Все знатоки информатики не любят музыку.\n6️⃣ Коты, которые любят музыку, не знают информатику.', answer: 'Пошаговая инструкция для выполнения задачи', image: 'img/algorithm.jpg' },
            { points: 10, text: '🔵ОН был назван в честь марки кофе, которая, в свою очередь, получила наименование одноимённого острова.', answer: 'Совокупность структурированных данных, хранящихся на компьютере', image: 'img/database.jpg' },
            { points: 15, text: '🔵ЕЁ считают первым программистом в истории и неофициально именуют «матерью всех программистов».', answer: 'Язык, с помощью которого создаются программы', image: 'img/programming_language.jpg' },
            { points: 20, text: 'Его создателем считается Масахиро Хара. Сам термин является зарегистрированным товарным знаком японской компании «Denso»', answer: 'Метод разработки программного обеспечения, основанный на использовании объектов', image: 'img/oop.jpg' },
        ],
        7: [ // Чёрный ящик
            { points: 5, text: 'В каком году начал функционировать техникум?', answer: 'Модель, которую невозможно наблюдать, но можно анализировать входы и выходы', image: 'img/black_box.jpeg' },
            { points: 10, text: 'Вставьте пропущенное число вместо x:\n\nx февраля 1955 года к учёбе в машиностроительном техникуме приступило x групп.', answer: 'Совокупность элементов, взаимодействующих друг с другом для достижения общей цели', image: 'img/system.jpeg' },
            { points: 15, text: 'Сколько специальностей в колледже в настоящее время?', answer: 'Процесс, при котором выход системы влияет на её вход', image: 'img/feedback.jpeg' },
            { points: 20, text: 'Сколько директоров руководило техникумом и колледжем за 70 лет?', answer: 'Элементы системы', image: 'img/elements.jpeg' },
        ]
    };
    if (categoryIndex !== null) {
        categoryTitle.textContent = categories[categoryIndex];
        loadQuestions(questionsData[categoryIndex]);
    }

    function loadQuestions(questions) {
        questionsDiv.innerHTML = "";

        questions.forEach((question) => {
            const questionButton = document.createElement("button");
            questionButton.classList.add("question");
            questionButton.textContent = `${question.points} баллов`;
            questionButton.dataset.points = question.points;

            if (localStorage.getItem(`answered_${categoryIndex}_${question.points}`)) {
                questionButton.classList.add("answered");
                questionButton.style.backgroundColor = "gray";
                questionButton.disabled = true;
            }

            questionButton.addEventListener("click", () => openQuestion(question, questionButton));
            questionsDiv.appendChild(questionButton);
        });
    }

    function openQuestion(question, button) {
        questionText.textContent = question.text;
        questionImage.src = question.image;
        answerText.textContent = `Ответ: ${question.answer}`;
        answerText.style.display = "none"; 

        questionModal.style.display = "flex";
        button.classList.add("answered");
        button.style.backgroundColor = "gray";
        button.disabled = true;

        localStorage.setItem(`answered_${categoryIndex}_${question.points}`, "true");
    }

    showAnswerButton.addEventListener("click", () => {
        answerText.style.display = "block";
    });

    document.getElementById("closeQuestion").addEventListener("click", () => {
        questionModal.style.display = "none";
    });

    document.getElementById("backToCategories").addEventListener("click", () => {
        window.location.href = "index.html";
    });
});