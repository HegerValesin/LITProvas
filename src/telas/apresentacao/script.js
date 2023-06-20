var dataP, initialTime, endTime, timeLimit, 
    horaIP, horaFP, tempoGP, aluno, 
    tempoADD, statusFinal, localStorageprova;

fetch('../../../public/exam.json')
  .then(response => response.json())
  .then(data => {
    // Aqui você pode acessar os dados do seu arquivo JSON
    const exam = data.exam;
    let bottomcontainer = document.querySelector(".bottom-container");
    // Encontre os elementos HTML onde você deseja inserir as informações
    dataP = exam.date;
    initialTime = exam.initialTime;
    endTime = exam.endTime;
    const tentativas = 1;
    timeLimit = exam.timeLimit;
    localStorageprova = JSON.parse(localStorage.getItem("prova"));
    var questaoJSON = data.exam.questions.question;

    if(exam.id != localStorageprova) {
        indexedDB.deleteDatabase(`prova_${localStorageprova}`);
        localStorage.clear();
        localStorage.setItem('prova', JSON.stringify(exam.id));
        const handler = new IndexedDBHandler(exam.id);
        handler.pushQuestion(questaoJSON)
      };
    let provas = JSON.parse(localStorage.getItem('prova'));
    getQuestionlLength(provas, questaoJSON)
    //Apresentação de condições da prova
    let apresetacao = `
                <p class="termo"> Termo de Aceite </p>
                <p> Declaro que não farei uso de materiais de consulta, não solicitarei ajuda de outra pessoa, não
                    compartilharei nenhum link recebido e não utilizarei de nenhum meio fraudulento para relaização
                    dessa prova</p>
                <p class="termo"> Aceito os termos ao clicar no botão abaixo.</p>
                <p class="tentativas"> Tentativas permitidas: ${tentativas} </p>
                <p class="tentativas">Esse questionário foi aberto em, ${dataP}, ${initialTime}</p>
                <p class="tentativas">O questionário será fechado em, ${dataP}, ${endTime}</p>                
    `
    let divs = document.createElement("div");
    divs.innerHTML = apresetacao;
    bottomcontainer.append(divs);
  }).catch(error => console.error("Erro ao ler o arquivo JSON:", error));

function getQuestionlLength(prova, questaoJSON) {
  const request = indexedDB.open(`prova_${prova}`, 1);
  const handler = new IndexedDBHandler(prova);
    handler.getQuestionLength(questaoJSON);
  request.onerror = function(event) {
    console.log('Erro ao abrir o banco de dados IndexedDB.');
  };
}

const ModalAp = {
  open() {
      document.querySelector('.modal-aceite').classList.add('active')
  },
  close: () => {
      document.querySelector('.modal-aceite').classList.remove('active')
  },
  accept: () => {
    let data = {
      dataP, 
      initialTime, 
      endTime,
      timeLimit,
      horaIP,
      horaFP,
      tempoGP,
      aluno,
      tempoADD,
      statusFinal: 'Inicido',
      localStorageprova: JSON.parse(localStorage.getItem("prova"))
  }
  console.log("Autenticação 01",data)
  const handler = new IndexedDBHandler(localStorageprova);
    handler.tempoProva(data);
    event.preventDefault();
    window.location.href = "../provas/prova.html"; 
  }
}

document.addEventListener('DOMContentLoaded', function() {
  var acceptButton = document.getElementById('acceptButton');
  var closeButton = document.getElementById('closeButton');
  var openButton = document.getElementById('openButton');
  
    acceptButton?.addEventListener('click', () => {
      ModalAp.accept();
    });
    closeButton?.addEventListener('click', () => {
      ModalAp.close();
    });

  openButton?.addEventListener('click', () => {
    console.log("openButton")
    ModalAp.open();
  });

});
