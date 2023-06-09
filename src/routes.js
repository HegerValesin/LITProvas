class IndexedDBHandler {
    constructor(prova) {
      this.prova = prova;
      this.dbName = `prova_${prova}`;
    }
    getQuestionAll() {
      return new Promise((resolve, reject) => {
        const request = indexedDB.open(this.dbName, 1);
  
        request.onsuccess = function(event) {
          const db = event.target.result;
          const transaction = db.transaction('question', 'readonly');
          const objectStore = transaction.objectStore('question');
  
          const getAllRequest = objectStore.getAll();
  
          getAllRequest.onsuccess = function(event) {
            const questions = getAllRequest.result;
              
            resolve(questions);
          };
  
          getAllRequest.onerror = function(event) {
            reject(new Error('Erro ao obter a questão.'));
          };
        };
  
        request.onerror = function(event) {
          reject(new Error('Erro ao abrir o banco de dados IndexedDB.'));
        };
      });
    }
     
    getQuestion(index) {
      return new Promise((resolve, reject) => {
        const request = indexedDB.open(this.dbName, 1);
  
        request.onsuccess = function(event) {
          const db = event.target.result;
          const transaction = db.transaction('question', 'readonly');
          const objectStore = transaction.objectStore('question');
          const questionOrder = index;
  
          const getRequest = objectStore.get(questionOrder);
  
          getRequest.onsuccess = function(event) {
            const question = getRequest.result;
            if (question) {
              resolve(question);
            } else {
              reject(new Error('Questão não encontrada.'));
            }
          };
  
          getRequest.onerror = function(event) {
            reject(new Error('Erro ao obter a questão.'));
          };
        };
  
        request.onerror = function(event) {
          reject(new Error('Erro ao abrir o banco de dados IndexedDB.'));
        };
      });
    }
    topo(){
      window.scrollTo(0, 0);
    }
  }
  