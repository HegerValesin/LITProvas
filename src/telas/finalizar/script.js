// Array para armazenar as perguntas do quiz
var prova = JSON.parse(localStorage.getItem('prova'));
var localStorageQuestions = JSON.parse(localStorage.getItem(`quest_${prova}`));
let respostaQuest = JSON.parse(localStorage.getItem(`res_${prova}`));
//localStorageQuestions = JSON.parse(localStorage.getItem(questProva));


    let questaoProva = document.querySelector(".quiz-enun");
    let questionStorage = '';

    for (var i=0; i<localStorageQuestions.length; i++) {
      
      // Criar uma variável para armazenar o HTML das alternativas
      var alternativesHTML = '';
      
      // Percorrer o array de alternativas e gerar o HTML correspondente para cada uma delas
     // console.log("al",localStorageQuestions[i].alternatives.alternative[1].alternativeText)
     if (localStorageQuestions[i].type === 1){
      alternativesHTML +=`<div class="prompt active">Escolha uma opção:</div>`
      for (var j=0; j<localStorageQuestions[i].alternatives.alternative.length; j++) {
        
        if (respostaQuest[i].alternative != ''){
         
          if ((respostaQuest[i].alternative -1) === j){
            alternativesHTML += `
            <label class="altFinal" >
              <input type="radio"  checked  value="${localStorageQuestions[i].alternatives.alternative[j].alternativeOrder}">
              ${localStorageQuestions[i].alternatives.alternative[j].alternativeText}
            </label>
          `;
          }else {
            alternativesHTML += `
            <label class="altFinal" >
              <input type="radio" disabled="true" value="${localStorageQuestions[i].alternatives.alternative[j].alternativeOrder}">
              ${localStorageQuestions[i].alternatives.alternative[j].alternativeText}
            </label>
          `;
          }
        }else {
          alternativesHTML += `
          <label class="altFinal" >
            <input type="radio" disabled="true" value="${localStorageQuestions[i].alternatives.alternative[j].alternativeOrder}">
            ${localStorageQuestions[i].alternatives.alternative[j].alternativeText}
          </label>
        `;
        }
      }
    }else {
      alternativesHTML += `
      <div id="type" style="display:none;">0</div>
      <div class="resalt"><p >${respostaQuest[i].alternative}</p></div>
      `
    }
      // Adicionar o HTML das alternativas à string de HTML da questão
      var questionHTML = `
        <div class="geral">
          <div class="pontosquiz">
            <h3>Questão <span id="current-question">${localStorageQuestions[i].questionOrder}</span></h3>
            <div id="answered-status">${respostaQuest[i].status}</div>
            <div id="point-value">
              Vale <span id="current-points">${localStorageQuestions[i].points}</span> ponto(s).
            </div>
          </div>
          <div class="quiz">
            <div class="quiz-formulario">
              <div class="qtext" id="qtext"></div>
              ${localStorageQuestions[i].statement}
              <div class="ablock">
                
                ${alternativesHTML}         
                <div class="answer" id="answer-options"></div>
              </div>
            </div>
          </div> 
        </div>
      `;
      
      // Adicionar o HTML da questão à variável questionStorage
      questionStorage += questionHTML;
    }
    

    questaoProva.innerHTML += questionStorage

const ModalFim = {
      open() {
          document.querySelector('.modal-aceite').classList.add('active')
      },
  
      close() {
          document.querySelector('.modal-aceite').classList.remove('active')
      },
  
      aceite() {
        document.querySelector('.modal-aceite').classList.remove('active')
        document.querySelector('.modal-aceite-envia').classList.add('active')
      },

      retorna(event){
        event.preventDefault();

        window.location.href = "../provas/prova.html"; 
      },
      enviada(event){
        event.preventDefault();
        document.querySelector('.modal-aceite-envia').classList.remove('active')
        localStorage.clear();
        localStorage.clear();
        window.location.href = "../../../index.html"; 
      }
  
  }