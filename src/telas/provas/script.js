// Array para armazenar as perguntas do quiz
let questions = [];

// Índice da pergunta atual
let currentQuestionIndex = 0;

// Elementos do HTML que serão atualizados
const questionTextElement = document.getElementById('question-text');
const answerOptionsElement = document.getElementById('answer-options');
const nextButton = document.getElementById('next-button');
const currentQuestionNumberElement = document.getElementById('current-question');
const answeredStatusElement = document.getElementById('answered-status');
const currentPointsElement = document.getElementById('current-points');

// Carrega as perguntas do arquivo exam.json
fetch('../../../public/exam.json')
    .then(response => response.json())
    .then(data => {
        questions = data.exam.questions.question.map(question => question);

        console.log(questions);
        showCurrentQuestion();
    });

// Mostra a pergunta atual
function showCurrentQuestion() {
    // Obter a pergunta atual
    const currentQuestion = questions[currentQuestionIndex];

    console.log(currentQuestion);
    // Renderiza o título da questão
    const questionTitle = document.querySelector('.qtext');
    questionTitle.innerHTML = `${currentQuestion.statement}`;

    // Renderiza as opções de resposta
    const answerOptions = document.querySelector('.answer');
    answerOptions.innerHTML = '';
    if (currentQuestion.type === 0) {
        // Questão subjetiva (text)
        answerOptions.innerHTML = `<textarea id="answer" class="subjetiva"></textarea>`;
    } else if (currentQuestion.type === 1) {
        // Questão de múltipla escolha
        currentQuestion.alternatives.alternative.forEach((answer) => {
            console.log(answer.alternativeText)
            const newAnswerOption = document.createElement('div');
            newAnswerOption.classList.add('r' + answer.alternativeOrder % 2);

            newAnswerOption.innerHTML = `
      <input type="radio" name="answer" id="${answer.alternativeOrder}" value="${answer.alternativeOrder}" />
      <label for="${answer.alternativeOrder}">${answer.alternativeText}</label>
    `;

            answerOptions.appendChild(newAnswerOption);
        });
    }

    // Adiciona o evento de click no botão "Próximo"
    const nextButton = document.querySelector('#next-button');
    nextButton.addEventListener('click', () => {
        // Verifica se a questão foi respondida corretamente
        const answer = getAnswer();
        if (answer === null) {
            alert('Por favor, responda a questão antes de prosseguir.');
            return;
        }

        // Armazena a resposta
        storeAnswer(answer);

        // Passa para a próxima questão ou finaliza o questionário
        currentQuestionIndex++;
        if (currentQuestionIndex < questions.length) {
            renderQuestion();
        } else {
            finishQuiz();
        }
    });


}


function getAnswer() {
    const currentQuestion = questions[currentQuestionIndex];
    if (currentQuestion.type === 0) {
        // Questão subjetiva
        console.log("click01")
        const answerTextarea = document.querySelector('#answer');
        return answerTextarea.value.trim() !== '' ? answerTextarea.value : null;
    } else if (currentQuestion.type === 1) {
        // Questão de múltipla escolha
        console.log("click02")
        const answerRadioButtons = document.querySelectorAll('input[type=radio]');
        for (let i = 0; i < answerRadioButtons.length; i++) {
            if (answerRadioButtons[i].checked) {
                return answerRadioButtons[i].value;
            }
        }
        return null;
    }
}

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
