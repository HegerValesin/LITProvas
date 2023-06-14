const ModalAp = {
    open() {
        document.querySelector('.modal-aceite').classList.add('active')
    },
    close() {
        document.querySelector('.modal-aceite').classList.remove('active')
    },
    aceite(event) {
        event.preventDefault();
        window.location.href = "../provas/prova.html"; 
    }
}

fetch('../../../public/exam.json')
  .then(response => response.json())
  .then(data => {
    // Aqui você pode acessar os dados do seu arquivo JSON
    const exam = data.exam;
    let bottomcontainer = document.querySelector(".bottom-container");

    // Encontre os elementos HTML onde você deseja inserir as informações
    const date = exam.date;
    const initialTime = exam.initialTime;
    const endTime = exam.endTime;
    const tentativas = 1;
    var localStorageprova = JSON.parse(localStorage.getItem("prova"));
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
                <p class="tentativas">Esse questionário foi aberto em, ${date}, ${initialTime}</p>
                <p class="tentativas">O questionário será fechado em, ${date}, ${endTime}</p>

                <button onclick="ModalAp.open()">Tentar responder o questionário agora</button>
    `
    let divs = document.createElement("div");
    divs.innerHTML = apresetacao;
    bottomcontainer.append(divs);
  }).catch(error => console.error("Erro ao ler o arquivo JSON:", error));

  async function criarstorage(){
     
}

function getQuestionlLength(prova, questaoJSON) {
  const request = indexedDB.open(`prova_${prova}`, 1);
  const handler = new IndexedDBHandler(prova);
    handler.getQuestionLength(questaoJSON);
  request.onerror = function(event) {
    console.log('Erro ao abrir o banco de dados IndexedDB.');
  };
}