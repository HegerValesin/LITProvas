// Array para armazenar as perguntas do quiz
let questions = [];
var lengthLocal;
const prova = JSON.parse(localStorage.getItem('prova'));;
let questProva = "";
let insertRespostaQuest = [];
let statusAtual = "";
let statusBtn = [];
let confirma ="";
var localStorageQuestions = JSON.parse(localStorage.getItem(`quest_${prova}`));
var ultQuest;
var btnSelectedOption;

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

const Modalprova = {
    open() {
        document.querySelector('.modal-aceite').classList.add('active')
        ultQuest = false;
    },

    close() {
        document.querySelector('.modal-aceite').classList.remove('active')
        console.log('confirma close',confirma,' index close ',currentQuestionIndex)
        if(ultQuest){
            console.log('pasou')
            showCurrentQuestion();
        }else {
            currentQuestionIndex = confirma;
            console.log('confirma closeElse',confirma,' index close ',currentQuestionIndex)
        };
    },

    aceite(resp) {
        if (resp === 'sim') {
            statusAtual = "Ainda não foi respondida";
            saveAnswer();
            showCurrentQuestion()
            if (currentQuestionIndex === lengthLocal-1) {
                nextButton.disabled = true;
                document.querySelector('.btproximo').classList.add('btnactive');
                document.querySelector('.btnfinalizar').classList.remove('btnactive')
            } else {
                document.querySelector('.btproximo').classList.remove('btnactive');
                document.querySelector('.btnfinalizar').classList.add('btnactive');
                nextButton.disabled = false;
            }
            if (currentQuestionIndex === 0) {
                previousButton.disabled = true;
            }else {
                previousButton.disabled = false;
            }
            setCustomMude(currentQuestionIndex)
           // loadAnswers()

        } else {
            return;
        }
        document.querySelector('.modal-aceite').classList.remove('active')
    },

    openFin(){
        document.querySelector('.modal-aceite').classList.add('active')
        document.querySelector('.fimModal').classList.add('fimdesativar')
        document.querySelector('.fimModals').classList.remove('fimdesativar')
        document.getElementById('text-modal').innerText = "Deseja finalizar sua prova?"
        type(currentQuestionIndex);
    },

    finalizar(event) {
        event.preventDefault();
        window.location.href = "../finalizar/finalizada.html";
    }
}

creatButtons();
showCurrentQuestion();

// Mostra a pergunta atual
function showCurrentQuestion() {
    // Obter a pergunta atual
    const currentQuestion = localStorageQuestions[currentQuestionIndex];
    lengthLocal = localStorageQuestions.length;
    // Renderiza o título da questão
    questionTextElement.innerHTML = `${currentQuestion.statement}`;

    // Renderiza as opções de resposta
    while (answerOptionsElement.firstChild) {
        answerOptionsElement.removeChild(answerOptionsElement.firstChild);
    }

    if (currentQuestion.type === 0) {
        document.querySelector('.prompt').classList.remove('active')
        answerOptionsElement.innerHTML = `<div id="type" style="display:none;">0</div><textarea id="answer" class="subjetiva" rows="15" cols="60"></textarea>`;
        newCkeditor(answer, 200);
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
        previousButton.disabled = true;
    }
    setCustomMude(currentQuestionIndex);
    renderQuestion()
}

const bntQuest = {
    muda(btnN) {
        confirma = currentQuestionIndex;
       type(--btnN)
    }
}

//crias os botões e tbm verifca se esta respondido ou não.
function creatButtons() {
    var cardbutton = document.getElementById("card-text");
    
    for (var i = 0; i < localStorageQuestions.length; i++) {
        var button = document.createElement("button");
        button.id = "btn-" + (i + 1);
        button.className = "bt-quiz";
        button.innerText = i + 1;

        button.onclick = (function(index) {
            return function() {
              bntQuest.muda(index);
            };
          })(i + 1);

        cardbutton.appendChild(button);
    };
}

// Adiciona o evento de click no botão "Voltar"

previousButton.addEventListener("click", () => {
    confirma = currentQuestionIndex;
    type(--currentQuestionIndex);
  });


// Adiciona o evento de click no botão "Proximo"
nextButton.addEventListener("click", function () {
    confirma = currentQuestionIndex;
    type(++currentQuestionIndex);
});

function renderQuestion() {
    // Atualiza o número da pergunta atual
    currentQuestionNumberElement.innerText = `${currentQuestionIndex + 1}`;

    // Atualiza o status da pergunta (respondida ou não) - new: verificar se tem resposta no localstorage.
    let getStatus = JSON.parse(localStorage.getItem("res_"+prova));
    const currentQuestion = localStorageQuestions[currentQuestionIndex];
    let questionStatus = getStatus.filter(item => item.question == currentQuestion.questionOrder);

    answeredStatusElement.innerText = questionStatus[0].status;

    // Atualiza a pontuação atual (se houver)
    if (currentQuestion.points !== undefined) {
        currentPointsElement.innerText = `${currentQuestion.points}`;
    } else {
        currentPointsElement.innerText = '';
    }
    loadAnswers();
}

//botões de questões
function setCustomMude(contIndex) {
    var btafter = contIndex + 1;
    var btBeforeIndex = 0;
    var btActive = document.getElementById(`btn-${btafter}`);
    const cards = JSON.parse(localStorage.getItem('res_'+prova));

    // Adiciona um evento de clique em cada card
    cards.forEach((card, index) => {
        btBeforeIndex = index + 1;
        var btBefore = document.getElementById(`btn-${btBeforeIndex}`)

      if (card.status === "Ainda não foi respondida"){
        btBefore.classList.add("bt-quiz-y")
        btBefore.classList.remove("bt-quiz-active")
      };
      if(card.status === "Respondida"){
        btBefore.classList.add("bt-quiz-x")
        btBefore.classList.remove("bt-quiz-active")
        btBefore.classList.remove("bt-quiz-y")
    };
    if(card.status === "Ainda não respondida"){
        btBefore.classList.remove("bt-quiz-active")
    };
    });
    if (btActive) {
        btActive.classList.add("bt-quiz-active");
    }

}

// Salvando os dados da resposta no localStorage
function saveAnswer(resp, typeQ) {
    console.log('resp1',resp);
    const answerOptions = document.querySelector('#answer-options');
    let answer;
    let type = false;
    if(answerOptions.querySelector("#type")?.textContent === '0'){
        //answer = CKEDITOR.instances.answer.getData();
        ultQuest=true
       type = true;
    } else {
       // answer = answerOptions.querySelector('input[name="answer"]:checked')?.value;
    };
    
    // obtenha o número da questão atual e o valor da pontuação
    const currentQuestion = parseInt(document.querySelector('#current-question').textContent);
    console.log('currentQuestion',currentQuestion)
    if(resp === undefined) {
        console.log('resposta',answer);
        answer = "";
    }else {
        console.log('resposta',answer);
        answer = resp;
    }
    let data = {
        prova: prova,
        questao: currentQuestion,
        resposta: answer,
        status:  statusAtual,
        type: type
    }
    storage(data);
    
}

// Carregando os dados das respostas do localStorage
function loadAnswers() {
    let numeroQuestion = parseInt(document.querySelector('#current-question').textContent);
    let get = JSON.parse(localStorage.getItem('res_'+prova));
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

//coloca no html a resposta que vem do localstorage
function setAnswer(answers) {
    var sa_AnswerOptions = document.querySelector('#answer-options');
   if(sa_AnswerOptions.querySelector("#type")?.textContent === '0'){
        CKEDITOR.instances.answer.setData(answers);
   }else {
        // Resposta de múltipla escolha
        const answerRadio = sa_AnswerOptions.querySelector(`input[value="${parseInt(answers)}"]`);
        if (answerRadio) {
        answerRadio.checked = true;
        }
   };
   
}
//Insere as resposta no localStorage
function storage(data) {
    let get = JSON.parse(localStorage.getItem('res_'+data.prova));
    let newQuestion = get.filter(item => item.question == data.questao);

    if (newQuestion.length != 0){
        let storagequest = get.map(items => {
            if(items.question == data.questao){
                return {question: items.question, alternative: data.resposta, status: data.status}
            }
            return {question: items.question, alternative: items.alternative, status: items.status}
        })
        localStorage.setItem(`${"res_"+data.prova}`, JSON.stringify(storagequest));
    }else {
        get.push({question: data.questao, alternative: data.resposta, status: data.status});
        localStorage.setItem(`${"res_"+data.prova}`, JSON.stringify(get));
    }
    if (data.type){
        CKEDITOR.instances['answer'].destroy(true);
    }
}

//verifica se a função é dicertativa ou multipla escolha
function type(index){
    console.log('inicial',index)
    const btn_AnswerOptions = document.querySelector('#answer-options');
    
    if(btn_AnswerOptions.querySelector("#type")?.textContent === '0'){
        btnSelectedOption = CKEDITOR.instances.answer.getData()
    }else {
        btnSelectedOption = btn_AnswerOptions.querySelector('input[name="answer"]:checked')?.value;
    };

    if (!btnSelectedOption) {
        currentQuestionIndex = (index);
        Modalprova.open();
    } else {
        currentQuestionIndex = (index);
        statusAtual = "Respondida";
        saveAnswer(btnSelectedOption)
        showCurrentQuestion()
        if (currentQuestionIndex === lengthLocal-1) {
            document.querySelector('.btproximo').classList.add('btnactive');
            document.querySelector('.btnfinalizar').classList.remove('btnactive')
            nextButton.disabled = true;
            previousButton.disabled = false;
        } else {
            document.querySelector('.btproximo').classList.remove('btnactive');
            document.querySelector('.btnfinalizar').classList.add('btnactive');
            previousButton.disabled = false;
            nextButton.disabled = false;
        }
        if (currentQuestionIndex === 0) {
            previousButton.disabled = true;
            nextButton.disabled = false;
        }
        setCustomMude(currentQuestionIndex)
        loadAnswers()
    }
}

//criação do CKEDITO no textarea
function newCkeditor(id,height){
    return CKEDITOR.replace(id, {
        height: height,
        extraPlugins: 'uploadimage,image2, filebrowser, imageresize, mathjax, leaui_formula, liststyle, custom_list_styles_alpha, custom_list_styles_roman, justify',
        removePlugins: 'easyimage, cloudservices, image',
        mathJaxLib: '//cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.4/MathJax.js?config=TeX-AMS_HTML',
        toolbar : [
            { name: 'document', items: [ 'Source'] },
            { name: 'clipboard', items: [ 'Cut', 'Copy', 'Paste', 'PasteText', 'PasteFromWord', '-', 'Undo', 'Redo' ] },
            { name: 'basicstyles', items: [ 'Bold', 'Italic', 'Underline', 'Strike', 'Subscript', 'Superscript', '-', 'CopyFormatting', 'RemoveFormat' ] },
            { name: 'editing', items: [ 'Scayt' ] },
            { name: 'colors', items: [ 'TextColor', 'BGColor' ] },
            { name: 'paragraph', items: [
                'NumberedList', 'BulletedList',
                '-', 'Mathjax', 'LeauiFormula',
                '-',
                    { name: 'ListTypeAlpha', items: ['custom_list_styles_alpha'], label: 'Change List Type', command: 'changeListTypeAlpha'},
                    { name: 'ListTypeRoman', items: ['custom_list_styles_roman'], label: 'Change List Type', command: 'changeListTypeRoman'},
                '-', 'Outdent', 'Indent',
                '-', 'Blockquote', '-', 'JustifyLeft', 'JustifyCenter', 'JustifyRight', 'JustifyBlock',
                '-', 'BidiLtr', 'BidiRtl' ]
            },
            { name: 'insert', items: [  'Image' , 'Table' ,'Smiley', 'SpecialChar'] },
            { name: 'styles', items: [ 'Styles', 'Format', 'Font', 'FontSize' ] }
        ],
        
         stylesSet: [{
              name: 'Narrow image',
              type: 'widget',
              widget: 'image',
              attributes: {
                'class': 'image-narrow'
              }
            },
            {
              name: 'Wide image',
              type: 'widget',
              widget: 'image',
              attributes: {
                'class': 'image-wide'
              }
            }
          ],

          image2_alignClasses: ['image-align-left', 'image-align-center', 'image-align-right'],
          image2_disableResizer: true,
          removeButtons: 'PasteFromWord,Save,TextField,Textarea,Select,Button,ImageButton,HiddenField,CreatePlaceholder,Flash,SpecialChar,PageBreak,Iframe,About,Smiley,Form,Checkbox,Radio,Textarea,TextField',
            removeDialogTabs: 'image:advanced;link:advanced',
            entities_processNumerical : true,
    });		
}