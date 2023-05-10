// Array para armazenar as perguntas do quiz
var prova = JSON.parse(localStorage.getItem('prova'));
var localStorageQuestions = JSON.parse(localStorage.getItem(`quest_${prova}`));
let respostaQuest = JSON.parse(localStorage.getItem(`res_${prova}`));
console.log(respostaQuest)
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
            console.log("REsposta igual",(respostaQuest[i].alternative -1), j)
            alternativesHTML += `
            <label class="altFinal" >
              <input type="radio"  checked  value="${localStorageQuestions[i].alternatives.alternative[j].alternativeOrder}">
              ${localStorageQuestions[i].alternatives.alternative[j].alternativeText}
            </label>
          `;
          }else {
            console.log("REsposta não",(respostaQuest[i].alternative -1), j)
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
      <p style="background-color: white">${respostaQuest[i].alternative}</p>
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


/*   
<div class="quiz">
        <div class="quiz-formulario">
          <div class="qtext" id="qtext"></div>
          <div class="ablock">
            <div class="prompt active">Escolha uma opção:</div>
            <div class="answer" id="answer-options">
           
            </div>
          </div>
        </div>
    </div>*/