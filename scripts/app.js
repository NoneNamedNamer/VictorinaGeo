const headElem = document.getElementById("head");
const buttonsElem = document.getElementById("buttons");

//Класс, который представляет сам тест
class Quiz
{
	constructor(type, questions, results)
	{
		//Тип теста: 1 - классический тест с правильными ответами, 2 - тест без правильных ответов
		this.type = type;

		//Массив с вопросами
		this.questions = questions;

		//Массив с возможными результатами
		this.results = results;

		//Количество набранных очков
		this.score = 0;

		//Номер результата из массива
		this.result = 0;

		//Номер текущего вопроса
		this.current = 0;
	}

	Click(index)
	{
		//Добавляем очки
		let value = this.questions[this.current].Click(index);
		this.score += value;

		let correct = -1;

		//Если было добавлено хотя одно очко, то считаем, что ответ верный
		if(value >= 1)
		{
			correct = index;
		}
		else
		{
			//Иначе ищем, какой ответ может быть правильным
			for(let i = 0; i < this.questions[this.current].answers.length; i++)
			{
				if(this.questions[this.current].answers[i].value >= 1)
				{
					correct = i;
					break;
				}
			}
		}

		this.Next();

		return correct;
	}

	//Переход к следующему вопросу
	Next()
	{
		this.current++;
		
		if(this.current >= this.questions.length) 
		{
			this.End();
		}
	}

	//Если вопросы кончились, этот метод проверит, какой результат получил пользователь
	End()
	{
		for(let i = 0; i < this.results.length; i++)
		{
			if(this.results[i].Check(this.score))
			{
				this.result = i;
			}
		}
	}
} 

//Класс, представляющий вопрос
class Question 
{
	constructor(text, answers)
	{
		this.text = text; 
		this.answers = answers; 
	}

	Click(index) 
	{
		return this.answers[index].value; 
	}
}

//Класс, представляющий ответ
class Answer 
{
	constructor(text, value) 
	{
		this.text = text; 
		this.value = value; 
	}
}

//Класс, представляющий результат
class Result 
{
	constructor(text, value)
	{
		this.text = text;
		this.value = value;
	}

	//Этот метод проверяет, достаточно ли очков набрал пользователь
	Check(value)
	{
		if(this.value <= value)
		{
			return true;
		}
		else 
		{
			return false;
		}
	}
}

//Массив с результатами
const results = 
[
	new Result("Вы очень плохо разбираетесь в географии - 0", 0),
	new Result("Вы плохо разбираетесь в географии - 1", 1),
	new Result("Вы не очень хорошо разбираетесь в географии - 2 балла", 2),
	new Result("Вы недостаточно образованный географ - 3 балла", 3),
	new Result("Вы средний географ - 4 балла", 4),
	new Result("Вы средний географ - 5 баллов", 5),
	new Result("Вы хороший географ - 6 баллов", 6),
	new Result("Чуть-чуть не хватило - 7/8", 7),
	new Result("Вы молодец - максимальный балл", 8)
];

//Массив с вопросами
const questions = 
[

	new Question("Викторина ''География''!", 
	[
		new Answer("Начать", 0),
	]),

	new Question("Самая северная столица на планете Земля?", 
	[
		new Answer("Санкт-Петербург", 0),
		new Answer("Хельсинки", 0),
		new Answer("Осло", 0),
		new Answer("Рейкьявик", 1)
	]),

	new Question("Правильный ответ - Рейкьявик. (64°09′ с. ш.)", 
	[
		new Answer("Далее", 0),
	]),

	new Question("Как называется самый северный континент на Земле?", 
	[
		new Answer("Антарктида", 0),
		new Answer("Арктика", 0),
		new Answer("Евразия", 1),
		new Answer("Северная Америка", 0)
	]),

	new Question("Правильный ответ - Евразия", 
	[
		new Answer("Далее", 0),
	]),

	new Question("Самый большой остров в мире?", 
	[
		new Answer("Британия", 0),
		new Answer("Гренландия", 1),
		new Answer("Новая Зеландия", 0),
		new Answer("Шри-Ланка", 0)
	]),

	new Question("Правильный ответ - Гренландия (2 166 086 км²)", 
	[
		new Answer("Далее", 0),
	]),

	new Question("Самое глубокое озеро в мире?", 
	[
		new Answer("Каспийское море", 0),
		new Answer("Онежское", 0),
		new Answer("Виктория", 0),
		new Answer("Байкал", 1)
	]),

	new Question("Правильный ответ - Байкал (1642 м)", 
	[
		new Answer("Далее", 0),
	]),

	new Question("Самая длинная река?", 
	[
		new Answer("Амазонка", 0),
		new Answer("Янцзы", 0),
		new Answer("Нил", 1),
		new Answer("Волга", 0)
	]),

	new Question("Правильный ответ - Нил (5600 км)", 
	[
		new Answer("Далее", 0),
	]),

	new Question("Самая высокая гора в мире?", 
	[
		new Answer("Мауна Кеа", 0),
		new Answer("Эверест", 0),
		new Answer("Килиманджаро", 0),
		new Answer("Чимборасо", 1)
	]),

	new Question("Правильный ответ - Чимборасо", 
	[
		new Answer("Далее", 0),
	]),

	new Question("Страна с самыми большими запасами урана?", 
	[
		new Answer("Австралия", 1),
		new Answer("Казахстан", 0),
		new Answer("Россия", 0),
		new Answer("Южно африканская республика", 0)
	]),

	new Question("Правильный ответ - Австралия", 
	[
		new Answer("Далее", 0),
	]),

	new Question("Где была зарегистрирована самая высокая температура?", 
	[
		new Answer("Долина смерти, США", 1),
		new Answer("Сан-Паулу", 0),
		new Answer("Оймякон", 0),
		new Answer("Кейптаун", 0)
	]),

	new Question("Правильный ответ - Долина смерти, США (+56,7 °C)", 
	[
		new Answer("Далее", 0),
	]),

	new Question("Понравилась ли вам викторина?", 
	[
		new Answer("Да", 0),
		new Answer("Может быть лучше!", 0),
	]),
];

//Сам тест
const quiz = new Quiz(1, questions, results);

Update();

//Обновление теста
function Update()
{
	//Проверяем, есть ли ещё вопросы
	if(quiz.current < quiz.questions.length) 
	{
		//Если есть, меняем вопрос в заголовке
		headElem.innerHTML = quiz.questions[quiz.current].text;

		//Удаляем старые варианты ответов
		buttonsElem.innerHTML = "";

		//Создаём кнопки для новых вариантов ответов
		for(let i = 0; i < quiz.questions[quiz.current].answers.length; i++)
		{
			let btn = document.createElement("button");
			btn.className = "button";

			btn.innerHTML = quiz.questions[quiz.current].answers[i].text;

			btn.setAttribute("index", i);

			buttonsElem.appendChild(btn);
		}

		//Вызываем функцию, которая прикрепит события к новым кнопкам
		Init();
	}
	else
	{
		//Если это конец, то выводим результат
		buttonsElem.innerHTML = "";
		headElem.innerHTML = quiz.results[quiz.result].text;
	}
}

function Init()
{
	//Находим все кнопки
	let btns = document.getElementsByClassName("button");

	for(let i = 0; i < btns.length; i++)
	{
		//Прикрепляем событие для каждой отдельной кнопки
		//При нажатии на кнопку будет вызываться функция Click()
		btns[i].addEventListener("click", function (e) { Click(e.target.getAttribute("index")); });
	}
}

function Click(index) 
{
	//Получаем номер правильного ответа
	let correct = quiz.Click(index);

	//Находим все кнопки
	let btns = document.getElementsByClassName("button");


	//Делаем кнопки серыми
	for(let i = 0; i < btns.length; i++)
	{
		btns[i].className = "button button_passive";
	}

	//Если это тест с правильными ответами, то мы подсвечиваем правильный ответ зелёным, а неправильный - красным
	if(quiz.type == 1)
	{
		if(correct >= 0)
		{
			btns[correct].className = "button button_correct";
		}

		if(index != correct && btns.length >= 3) 
		{
			btns[index].className = "button button_wrong";
		} 

	}

	else
	{
		//Иначе просто подсвечиваем зелёным ответ пользователя
		btns[index].className = "button button_correct";
	}

	//Ждём секунду и обновляем тест
	setTimeout(Update, 1000);
}