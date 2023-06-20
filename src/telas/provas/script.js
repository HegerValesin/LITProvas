// Array para armazenar as perguntas do quiz
let questions = [];
const prova = JSON.parse(localStorage.getItem('prova'));
const lengthLocal = JSON.parse(localStorage.getItem(`length_${prova}`));
let questProva = "";
let insertRespostaQuest = [];
let statusAtual = "";
let statusBtn = [];
let confirma ="";
var ultQuest;
var btnSelectedOption;
var timeLimit = 3;

// Índice da pergunta atual
let currentQuestionIndex = 1;

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
    },

    close() {
        document.querySelector('.modal-aceite').classList.remove('active')
        currentQuestionIndex = confirma;
    },

    aceite(resp) {
        if (resp === 'sim') {
            statusAtual = "Ainda não foi respondida";
            saveAnswer();
            showCurrentQuestion()
            if (currentQuestionIndex === lengthLocal) {
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
    closeFim(){
        document.querySelector('.modalaceitefim').classList.remove('activefim')
        showCurrentQuestion();
    },

    openFim(){
        document.querySelector('.modalaceitefim').classList.add('activefim')
    },

    finalizar(event) {
        event.preventDefault();
        window.location.href = "../finalizar/finalizada.html";
    },
    topo(){
        window.scrollTo(0, 0);
    }
}
const bntQuest = {
    muda(btnN) {
        console.log("btnN", btnN)
        confirma = currentQuestionIndex;
       type(btnN)
    }
}
// Mostra a pergunta atual
function showCurrentQuestion() {
    const handler = new IndexedDBHandler(prova);
    handler.getQuestion(currentQuestionIndex)
        .then(question => {
        // Renderiza o título da questão
        questionTextElement.innerHTML = `${question.statement}`;
        // Renderiza as opções de resposta
        while (answerOptionsElement.firstChild) {
            answerOptionsElement.removeChild(answerOptionsElement.firstChild);
        }

        if (question.type === 0) {
            document.querySelector('.prompt').classList.remove('active')
            answerOptionsElement.innerHTML = `<div id="type" style="display:none;">0</div><textarea id="answer" class="subjetiva" rows="15" cols="60"></textarea>`;
            
        } else if (question.type === 1) {

            for (let i = 0; i < question.alternatives.alternative.length; i++) {
                const choice = question.alternatives.alternative[i];
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
        if (question.type === 0) {
            newCkeditor(answer, 200);
        }else {
            CKEDITOR.instances['answer'].destroy(true);
        }
        currentQuestionNumberElement.innerText = question.questionOrder;
        handler.getResposta(currentQuestionIndex).then(resposta => {
             // Atualiza o número da pergunta atual
            answeredStatusElement.innerText = resposta.status;
        });
        

        // Atualiza a pontuação atual (se houver)
        if (question.points != undefined) {
            currentPointsElement.innerText = question.points;
        } else {
            currentPointsElement.innerText = '';
        }
        loadAnswers();
        })
        .catch(error => {
            console.log('Erro ao obter a questão:', error);
        });
   
    if (currentQuestionIndex === 0) {
        previousButton.disabled = true;
    }
    setCustomMude(currentQuestionIndex);
}

//crias os botões e tbm verifca se esta respondido ou não.
function creatButtons() {
    var cardbutton = document.getElementById("card-text");
    //localStorage.setItem(`length_${prova}`, JSON.stringify(count));   
    const count = JSON.parse(localStorage.getItem(`length_${prova}`));
    for (var i = 0; i < count; i++) {
        
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

    const handler = new IndexedDBHandler(prova);
    handler.iniciandoTempoProva(timeLimit)
}

// Adiciona o evento de click no botão "Voltar"
previousButton.addEventListener("click", () => {
    confirma = currentQuestionIndex;
    window.scrollTo(0, 0);
    type(--currentQuestionIndex);
  });


// Adiciona o evento de click no botão "Proximo"
nextButton.addEventListener("click", function () {
    confirma = currentQuestionIndex;
    window.scrollTo(0, 0);
    type(++currentQuestionIndex);
    
});

//botões de questões
function setCustomMude(contIndex) {
    var btBeforeIndex = 0;
    var btActive = document.getElementById(`btn-${contIndex}`);

    const handler = new IndexedDBHandler(prova);
    handler.getRespostasAll()
        .then(respostas => {
            const cards = respostas;
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

    }).catch(error => {
            console.log('Erro ao obter a questão:', error);
        });
}

// Salvando os dados da resposta no localStorage
function saveAnswer(resp) {
    const answerOptions = document.querySelector('#answer-options');
    let answer;
    let type = false;
    if(answerOptions.querySelector("#type")?.textContent === '0'){
        //answer = CKEDITOR.instances.answer.getData();
        ultQuest=true
       type = true;
    }     
    // obtenha o número da questão atual e o valor da pontuação
    const currentQuestion = parseInt(document.querySelector('#current-question').textContent);
    if(resp === undefined) {
        answer = "";
    }else {
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
    const handler = new IndexedDBHandler(prova);
    handler.getResposta(currentQuestionIndex)
        .then(resposta => {
        let numeroQuestion = parseInt(document.querySelector('#current-question').textContent);
        console.log("resposta", resposta, '/', resposta.alternative);
        if (numeroQuestion === resposta.question) { // se houver uma resposta salva
            setAnswer(resposta.alternative); // preencher a resposta da questão anterior com a resposta salva
        }
        })
        .catch(error => {
            console.log('Erro ao obter a questão:', error);
        });
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
    console.log("answers", answers)
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
    const handler = new IndexedDBHandler(prova);
    handler.updateResposta(data)
        .then(respostas => {
            if (data.type){
               // CKEDITOR.instances['answer'].destroy(true);
            }
        }).catch(error => {
            console.log('Erro ao obter a questão:', error);
        });   
}

//verifica se a função é dicertativa ou multipla escolha
function type(index){
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
        if (currentQuestionIndex === lengthLocal) {
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
        if (currentQuestionIndex === 1 || currentQuestionIndex === 0) {
            previousButton.disabled = true;
            nextButton.disabled = false;
            if(currentQuestionIndex === 0){
                currentQuestionIndex = 1
            }
        }
        setCustomMude(currentQuestionIndex)
        loadAnswers()
    }
}

document.addEventListener('DOMContentLoaded', function() {
    var closeButtonProva = document.getElementById('closeButtonProva');
    var acceptButtonProva = document.getElementById('acceptButtonProva');
    var finButtonProva = document.getElementById('finButtonProva');
    var closeFinButtonProva = document.getElementById('closeFinButtonProva');
    var topoButtonprova = document.getElementById('back-to-top');
    var btfinalizar = document.getElementById('btfinalizar');
    
    closeButtonProva?.addEventListener('click', () => {
        Modalprova.close()
      });
    finButtonProva?.addEventListener('click', () => {
        Modalprova.finalizar(event)
      });
  
    topoButtonprova?.addEventListener('click', () => {
      Modalprova.topo()
    });

    acceptButtonProva?.addEventListener('click', () => {
        Modalprova.aceite('sim')
    });
    closeFinButtonProva?.addEventListener('click', () => {
        Modalprova.closeFim()
    });

    btfinalizar?.addEventListener('click', () => {
        Modalprova.openFim()
      });
  
  });

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
creatButtons();
showCurrentQuestion();