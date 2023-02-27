// Array para armazenar as perguntas do quiz
let questions = [];

// Índice da pergunta atual
let currentQuestionIndex = 0;

// Criando uma array para armazenar as respostas do usuário
const userAnswers = [];

// Elementos do HTML que serão atualizados
const questionTextElement = document.getElementById('qtext');
const answerOptionsElement = document.getElementById('answer-options');
const nextButton = document.getElementById('nextbutton');
const currentQuestionNumberElement = document.getElementById('current-question');
const answeredStatusElement = document.getElementById('answered-status');
const currentPointsElement = document.getElementById('current-points');
const previousButton = document.getElementById("previousbutton");

// Carrega as perguntas do arquivo exam.json
fetch('../../../public/exam.json')
    .then(response => response.json())
    .then(data => {
        questions = data.exam.questions.question.map(question => question);

        console.log(questions);
        creatButtons();
        showCurrentQuestion();
        renderQuestion();
    });

// Mostra a pergunta atual
function showCurrentQuestion() {
    // Obter a pergunta atual
    const currentQuestion = questions[currentQuestionIndex];


    // Renderiza o título da questão
    questionTextElement.innerHTML = `${currentQuestion.statement}`;

    // Renderiza as opções de resposta
    while (answerOptionsElement.firstChild) {
        answerOptionsElement.removeChild(answerOptionsElement.firstChild);
    }


    if (currentQuestion.type === 0) {
        document.querySelector('.prompt').classList.remove('active')
        answerOptionsElement.innerHTML = `<textarea id="answer" class="subjetiva" rows="15" cols="60"></textarea>`;
    } else if (currentQuestion.type === 1) {

        for (let i = 0; i < currentQuestion.alternatives.alternative.length; i++) {
            const choice = currentQuestion.alternatives.alternative[i];
            const newAnswerOption = document.createElement('div');
            newAnswerOption.classList.add('r' + choice.alternativeOrder % 2);

            newAnswerOption.innerHTML = `
                <input type="radio" name="answer" id="${choice.alternativeOrder}" value="${choice.alternativeOrder}" />
                <label for="${choice.alternativeOrder}">${choice.alternativeText}</label>
            `;
            document.querySelector('.prompt').classList.add('active')
            answerOptionsElement.appendChild(newAnswerOption);
        }
    }
    setCustomMude(currentQuestionIndex);
}

function creatButtons() {
    var cardbutton = document.getElementById("card-text");

    for (var i = 0; i < questions.length; i++) {
        var button = document.createElement("button");
        button.id = "btn-" + (i + 1);
        button.className = "bt-quiz";
        button.innerText = i + 1;

        /*button.onclick = function() {

        }*/
        cardbutton.appendChild(button);
    };


}

// Adiciona o evento de click no botão "Voltar"
const prevButton = document.querySelector('#previousbutton');
prevButton.addEventListener("click", () => {

    const selectedOption = document.querySelector('input[name="answer"]:checked');
    if (!selectedOption) {
        var consfirmar = confirm("Selecione uma opção!");
        if (consfirmar) {
            currentQuestionIndex--;
            showCurrentQuestion();
            showPrevisiousQuestion();
            if (currentQuestionIndex === 0) {
                prevButton.disabled = true;
            }
            nextButton.disabled = false;
        }
    } else {
        currentQuestionIndex--;
        showCurrentQuestion();
        showPrevisiousQuestion();
        if (currentQuestionIndex === 0) {
            prevButton.disabled = true;
        }
        nextButton.disabled = false;
    }
});


// Adiciona o evento de click no botão "Proximo"
nextButton.addEventListener("click", function () {

    const selectedOption = document.querySelector('input[name="answer"]:checked');
    if (!selectedOption) {
        var consfirmar = confirm("Selecione uma opção!");
        if (consfirmar) {
            currentQuestionIndex++;
            showCurrentQuestion()
            renderQuestion()
            if (currentQuestionIndex === questions.length - 1) {
                nextButton.disabled = true;
            }
            prevButton.disabled = false;
            setCustomMude(currentQuestionIndex)
        } else {
            return;
        }
    } else {
        currentQuestionIndex++;
        showCurrentQuestion()
        renderQuestion()
        if (currentQuestionIndex === questions.length - 1) {
            nextButton.disabled = true;
        }
        prevButton.disabled = false;
        setCustomMude(currentQuestionIndex)
    }
});

function quizProximo() {
    currentQuestionIndex++;
    showCurrentQuestion()
    renderQuestion()
    if (currentQuestionIndex === questions.length - 1) {
        nextButton.disabled = true;
        setCustomMude(currentQuestionIndex)
    }
    prevButton.disabled = false;
    setCustomMude(currentQuestionIndex)
}


function renderQuestion() {
    // Atualiza o número da pergunta atual
    currentQuestionNumberElement.innerText = `${currentQuestionIndex + 1}`;

    // Atualiza o status da pergunta (respondida ou não)
    const currentQuestion = questions[currentQuestionIndex];
    const isAnswered = null;
    answeredStatusElement.innerText = isAnswered ? 'Respondida' : 'Ainda não Respondida';

    // Atualiza a pontuação atual (se houver)
    if (currentQuestion.points !== undefined) {
        currentPointsElement.innerText = `${currentQuestion.points}`;
    } else {
        currentPointsElement.innerText = '';
    }

}

function showPrevisiousQuestion() {
    let correnteQestionInd = parseFloat(document.getElementById('current-question').innerText);

    currentQuestionNumberElement.innerText = `${correnteQestionInd - 1}`;

    // Atualiza o status da pergunta (respondida ou não)
    const currentQuestion = questions[currentQuestionIndex];
    const isAnswered = 1;
    answeredStatusElement.innerText = isAnswered ? 'Respondida' : 'Ainda não Respondida';
    // Atualiza a pontuação atual (se houver)
    if (currentQuestion.points !== undefined) {
        currentPointsElement.innerText = `${currentQuestion.points}`;
    } else {
        currentPointsElement.innerText = '';
    }
}

console.log(currentQuestionIndex)

function setCustomMude(contIndex) {

    var btafter = contIndex + 1;
    console.log(btafter);
    var btBeforeIndex = contIndex;
    console.log(btBeforeIndex)
    var btBefore = document.getElementById(`btn-${btBeforeIndex}`)
    var btActive = document.getElementById(`btn-${btafter}`);


    if (btActive) {
        btActive.classList.add("bt-quiz-active");

    }

    if (btBefore) {
        btBefore.classList.add("bt-quiz-x")
        btBefore.classList.remove("bt-quiz-active")
    }

}


////////////////////////////////////////////////////////
/*
  

function storeAnswer(answer) {
    // Armazena a resposta em algum lugar (por exemplo, em um objeto ou array)
    console.log(answer);
}

function finishQuiz() {
    // Finaliza o questionário
    alert('Parabéns, você finalizou o questionário!');
    // Aqui você pode enviar as respostas para o servidor, ou fazer o que quiser com elas.
}

function renderQuestion() {
    // Atualiza o número da pergunta atual
    currentQuestionNumberElement.innerText = `${currentQuestionIndex + 1}`;

    // Atualiza o status da pergunta (respondida ou não)
    const currentQuestion = questions[currentQuestionIndex];
    const isAnswered = getAnswer() !== null;
    answeredStatusElement.innerText = isAnswered ? 'Ainda não Respondida' : 'Respondida';

    // Atualiza a pontuação atual (se houver)
    if (currentQuestion.points !== undefined) {
        currentPointsElement.innerText = `${currentQuestion.points}`;
    } else {
        currentPointsElement.innerText = '';
    }
    // Renderiza a pergunta atual
    showCurrentQuestion();
}

function showPrevisiousQuestion() {
    currentQuestionNumberElement.innerText = `${currentQuestionIndex--}`;
    
     // Atualiza o status da pergunta (respondida ou não)
     const currentQuestion = questions[currentQuestionIndex];
     const isAnswered = getAnswer() !== null;
     answeredStatusElement.innerText = isAnswered ? 'Ainda não Respondida' : 'Respondida';
      // Atualiza a pontuação atual (se houver)
     if (currentQuestion.points !== undefined) {
         currentPointsElement.innerText = `${currentQuestion.points}`;
     } else {
         currentPointsElement.innerText = '';
     }
      // Renderiza a pergunta atual
     showCurrentQuestion();
}
*/