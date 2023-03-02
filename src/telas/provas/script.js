// Array para armazenar as perguntas do quiz
let questions = [];
let insertRespostaQuest = [];

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

        // console.log(questions);
        creatButtons();
        showCurrentQuestion();
        renderQuestion();
        loadAnswers()
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
        answerOptionsElement.innerHTML = `<div id="type" style="display:none;">0</div><textarea id="answer" class="subjetiva" rows="15" cols="60"></textarea>`;
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
    if (currentQuestionIndex === 0) {
        prevButton.disabled = true;
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

        cardbutton.appendChild(button);
    };


}

// Adiciona o evento de click no botão "Voltar"
const prevButton = document.querySelector('#previousbutton');
prevButton.addEventListener("click", () => {

    const pb_AnswerOptions = document.querySelector('#answer-options');
    const pb_quizType = pb_AnswerOptions.querySelector("#type")?.textContent === '0';
    const selectedOption = pb_quizType ? pb_AnswerOptions.querySelector('#answer').value : pb_AnswerOptions.querySelector('input[name="answer"]:checked')?.value;

    console.log("selectedOption", selectedOption)
    if (!selectedOption) {
        var consfirmar = confirm("Você não selecionou nenhuma opção!");
        if (consfirmar) {
            saveAnswer();
            currentQuestionIndex--;
            showCurrentQuestion();
            showPrevisiousQuestion();

            if (currentQuestionIndex === 0) {
                prevButton.disabled = true;
            }
            nextButton.disabled = false;
            loadAnswers()
        }
    } else {
        saveAnswer();
        currentQuestionIndex--;
        showCurrentQuestion();
        showPrevisiousQuestion();

        if (currentQuestionIndex === 0) {
            prevButton.disabled = true;
        }
        nextButton.disabled = false;
        loadAnswers()
    }
    console.log("Voltar")
});


// Adiciona o evento de click no botão "Proximo"
nextButton.addEventListener("click", function () {

    const ael_AnswerOptions = document.querySelector('#answer-options');
    const ael_quizType = ael_AnswerOptions.querySelector("#type")?.textContent === '0';
    const selectedOption = ael_quizType ? ael_AnswerOptions.querySelector('#answer').value : ael_AnswerOptions.querySelector('input[name="answer"]:checked')?.value;

    if (!selectedOption) {
        var consfirmar = confirm("Você não selecionou nenhuma opção!");
        if (consfirmar) {
            saveAnswer();
            currentQuestionIndex++;
            showCurrentQuestion()
            renderQuestion()
            if (currentQuestionIndex === questions.length - 1) {
                nextButton.disabled = true;
            }
            prevButton.disabled = false;
            setCustomMude(currentQuestionIndex)
            loadAnswers()

        } else {
            return;
        }
    } else {
        saveAnswer()
        currentQuestionIndex++;
        showCurrentQuestion()
        renderQuestion()
        if (currentQuestionIndex === questions.length - 1) {
            nextButton.disabled = true;
        }
        prevButton.disabled = false;
        setCustomMude(currentQuestionIndex);
        loadAnswers()
    }
    console.log("proximo")
});

function renderQuestion() {
    // Atualiza o número da pergunta atual
    currentQuestionNumberElement.innerText = `${currentQuestionIndex + 1}`;

    // Atualiza o status da pergunta (respondida ou não) - new: verificar se tem resposta no localstorage.
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

//botões de questões
function setCustomMude(contIndex) {

    var btafter = contIndex + 1;
    var btBeforeIndex = contIndex;
    
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

// Salvando os dados da resposta no localStorage
function saveAnswer() {
    const answerOptions = document.querySelector('#answer-options');
    const quizType = answerOptions.querySelector("#type")?.textContent === '0';
    const answer = quizType ? answerOptions.querySelector('#answer').value : answerOptions.querySelector('input[name="answer"]:checked')?.value;
    
    // obtenha o número da questão atual e o valor da pontuação
    const currentQuestion = parseInt(document.querySelector('#current-question').textContent);
    const examName = '171717';

    let data = {
        prova: examName,
        questao: currentQuestion,
        resposta: answer
    }
    storage(data);
}

// Carregando os dados das respostas do localStorage
function loadAnswers() {
    const examName = '171717';
    let numeroQuestion = parseInt(document.querySelector('#current-question').textContent);
    let get = JSON.parse(localStorage.getItem(examName));
    console.log("get",get)

    if (get){
    let respostaSalva = get.filter(item => item.question == numeroQuestion);

    if (respostaSalva) { // se houver uma resposta salva
        setAnswer(respostaSalva[0].alternative); // preencher a resposta da questão anterior com a resposta salva
    }
}
}

// Removendo os dados das respostas do localStorage
function clearAnswers() {
    const quizCode = document.getElementById("quizCode").value;
    for (let i = 0; i < quiz.length; i++) {
        localStorage.removeItem(`quizData-${quizCode}-question${i}`);
    }
}

function setAnswer(answers) {
    const sa_AnswerOptions = document.querySelector('#answer-options');
    const sa_quizType = sa_AnswerOptions.querySelector("#type")?.textContent === '0';
    const sa_SelectedOption = sa_quizType ? sa_AnswerOptions.querySelector('#answer') : sa_AnswerOptions.querySelector('input[name="answer"]:checked');
    if (sa_SelectedOption) {
        sa_AnswerOptions.querySelector('#answer').value = answers;;
    }else {
        // Resposta de múltipla escolha
        const answerRadio = sa_AnswerOptions.querySelector(`input[value="${parseInt(answers)}"]`);
        if (answerRadio) {
          answerRadio.checked = true;
        }
      }
}

function storage(data) {

    let get = JSON.parse(localStorage.getItem(data.prova));
    let newQuestion = get.filter(item => item.question == data.questao);

    if (newQuestion.length != 0){

        let storagequest = get.map(items => {
            if(items.question == data.questao){
                return {question: items.question, alternative: data.resposta}
            }
            return {question: items.question, alternative: items.alternative}
        })

        localStorage.setItem(`${data.prova}`, JSON.stringify(storagequest));
    }else {
        get.push({question: data.questao, alternative: data.resposta});
        localStorage.setItem(`${data.prova}`, JSON.stringify(get));
    }
}