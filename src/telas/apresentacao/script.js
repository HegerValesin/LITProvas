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
        var request = indexedDB.open(`prova_${exam.id}`, 1);

        request.onupgradeneeded = function(event){
            var db =  event.target.result;
            var objectStore = db.createObjectStore('question', { keyPath: 'questionOrder' });
            objectStore.createIndex('type', 'type', { unique: false });
            objectStore.createIndex('points', 'points', { unique: false });
            objectStore.createIndex('statement', 'statement', { unique: false });

            objectStore.transaction.oncomplete = function(event) {
            var transaction = db.transaction('question', 'readwrite');
            var questoesObjectStore = transaction.objectStore('question');

            for (let questao of questaoJSON) {
                var request = questoesObjectStore.add(questao);
                request.onsuccess = function(event) {
                  console.log('Questão adicionada com sucesso ao IndexedDB.');
                 
                };
                request.onerror = function(event) {
                  console.log('Erro ao adicionar questão ao IndexedDB.');
                };
              }
            }
        }
        request.onerror = function(event) {
          console.log('Erro ao abrir o banco de dados IndexedDB.');
        };
        
        request.onsuccess = function(event) {
          var db = event.target.result;
          console.log('Banco de dados IndexedDB aberto com sucesso.');
        
          // Aqui você pode realizar outras operações com o banco de dados, se necessário.
        }
      };
    let prova = JSON.parse(localStorage.getItem('prova'));
    getQuestionLength(prova)
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

  })
  .catch(error => console.error("Erro ao ler o arquivo JSON:", error));

  async function criarstorage(){
     
}

function getQuestionLength(prova) {
  const request = indexedDB.open(`prova_${prova}`, 1);
  
   request.onsuccess = function(event) {
    const db = event.target.result;
    const transaction = db.transaction('question', 'readonly');
    const objectStore = transaction.objectStore('question');
    const countRequest = objectStore.count();

    countRequest.onsuccess = function(event) {
      var count = countRequest.result;
      localStorage.setItem(`length_${prova}`, JSON.stringify(count));
      let get = JSON.parse(localStorage.getItem(`res_${prova}`));
      if (!get){
        let getnew = [];
        var cont = 0;
        for(i = 0; i < count; i++){
          cont = cont + 1;
            getnew.push({question: cont, alternative: "", status: "Ainda não Respondida"});
        }
        localStorage.setItem(`res_${prova}`, JSON.stringify(getnew));
    }
     
    };

    countRequest.onerror = function(event) {
      console.log('Erro ao obter o número de questões.');
    };
  };

  request.onerror = function(event) {
    console.log('Erro ao abrir o banco de dados IndexedDB.');
  };
}