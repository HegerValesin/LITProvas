class IndexedDBHandler {
    constructor(prova) {
      this.prova = prova;
      this.dbName = `prova_${prova}`;
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
  
    getQuestionLength() {
      return new Promise((resolve, reject) => {
        
      });
    }
  }
  