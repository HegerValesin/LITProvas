class IndexedDBHandler {
    constructor(prova) {
      this.prova = prova;
      this.dbName = `prova_${prova}`;
    }
    pushQuestion(questaoJSON){
      return new Promise((resolve, reject) => {
        const request = indexedDB.open(this.dbName, 1);

        request.onupgradeneeded = async function(event){
          var db =  event.target.result;
          var objectStore = db.createObjectStore('question', { keyPath: 'questionOrder' });
          objectStore.createIndex('questionId', 'questionId', { unique: false });
          objectStore.createIndex('type', 'type', { unique: false });
          objectStore.createIndex('points', 'points', { unique: false });
          objectStore.createIndex('statement', 'statement', { unique: false });

          //respostas
          var objectStoreRes = db.createObjectStore('respostas', { keyPath: 'question' });
          objectStoreRes.createIndex('questionId', 'questionId', { unique: false });
          objectStoreRes.createIndex('alternative', 'alternative', { unique: false });
          objectStoreRes.createIndex('status', 'status', { unique: false });

          objectStore.transaction.oncomplete = function(event) {
          var transaction = db.transaction('question', 'readwrite');
          var questoesObjectStore = transaction.objectStore('question');

          for (let questao of questaoJSON) {
              var request = questoesObjectStore.add(questao);
              request.onerror = function(event) {
                console.log('Erro ao adicionar questão ao IndexedDB.');
              };
            }
          }
      }
      request.onerror = function(event) {
        console.log('Erro ao abrir o banco de dados IndexedDB.');
      };
     // getQuestionLength();
      });
    }
    getQuestionLength(questaoJSON){
      return new Promise((resolve, reject) => {
        const provas = JSON.parse(localStorage.getItem('prova'))
        const request = indexedDB.open(this.dbName, 1);
        request.onsuccess = function(event) {
          const db = event.target.result;
          const transaction = db.transaction('question', 'readonly');
          const objectStore = transaction.objectStore('question');
          const countRequest = objectStore.count();
      
          countRequest.onsuccess = function(event) {
            var count = countRequest.result;
            localStorage.setItem(`length_${provas}`, JSON.stringify(count));
            resolve(count);
          }
        }
        request.onerror = function(event) {
          reject(new Error('Erro ao abrir o banco de dados IndexedDB.'));
        };
        
      }).then(count => {
        const handler = new IndexedDBHandler(); // Ajuste conforme sua implementação
        return handler.pushRespostas(questaoJSON);
      }).catch(error => {
        console.error('Erro:', error);
        throw error; // Rejeita a promessa e passa o erro para a próxima captura
      });
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
    pushRespostas(questaoJSON) {
      return new Promise((resolve, reject) => {
        const provas = JSON.parse(localStorage.getItem('prova'));
        const request = indexedDB.open(`prova_${provas}`, 1);
    
        request.onsuccess = function(event) {
          const db = event.target.result;
          const transaction = db.transaction('respostas', 'readwrite');
          const objectStore = transaction.objectStore('respostas');
          const countRequest = objectStore.count();
    
          countRequest.onsuccess = function(event) {
            const countRespostas = countRequest.result;
            
            if (countRespostas === 0) {
              const count = JSON.parse(localStorage.getItem(`length_${provas}`));
    
              const addPromises = [];
              for (let i = 0; i < count; i++) {
                const addPromise = new Promise((resolveAdd, rejectAdd) => {
                  const addRequest = objectStore.add({
                    question: i + 1,
                    questionId: questaoJSON[i].questionId,
                    alternative: '',
                    status: 'Ainda não Respondida'
                  });
    
                  addRequest.onsuccess = function(event) {
                    resolveAdd();
                  };
    
                  addRequest.onerror = function(event) {
                    rejectAdd(new Error('Erro ao adicionar resposta.'));
                  };
                });
                addPromises.push(addPromise);
              }
    
              Promise.all(addPromises)
                .then(() => {
                  console.log('Respostas adicionadas com sucesso.');
                  resolve();
                })
                .catch(error => {
                  console.error('Erro ao adicionar respostas:', error);
                  reject(error);
                });
            } else {
              console.log('Já existem respostas cadastradas.');
              resolve();
            }
          };
        };
    
        request.onerror = function(event) {
          reject(new Error('Erro ao abrir o banco de dados IndexedDB.'));
        };
      });
    }
    getResposta(index) {
      return new Promise((resolve, reject) => {
        const request = indexedDB.open(this.dbName, 1);
  
        request.onsuccess = function(event) {
          const db = event.target.result;
          const transaction = db.transaction('respostas', 'readonly');
          const objectStore = transaction.objectStore('respostas');
          const questionOrder = index;
  
          const getRequest = objectStore.get(questionOrder);
  
          getRequest.onsuccess = function(event) {
            const resposta = getRequest.result;
            if (resposta) {
              resolve(resposta);
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
    getRespostasAll() {
      return new Promise((resolve, reject) => {
        const request = indexedDB.open(this.dbName, 1);
  
        request.onsuccess = function(event) {
          const db = event.target.result;
          const transaction = db.transaction('respostas', 'readonly');
          const objectStore = transaction.objectStore('respostas');
  
          const getAllRequest = objectStore.getAll();
  
          getAllRequest.onsuccess = function(event) {
            const respostas = getAllRequest.result;
              
            resolve(respostas);
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
    updateResposta(newData) {
      return new Promise((resolve, reject) => {
        const request = indexedDB.open(`prova_${newData.prova}`, 1);
    
        request.onsuccess = function(event) {
          const db = event.target.result;
          const transaction = db.transaction('respostas', 'readwrite');
          const objectStore = transaction.objectStore('respostas');
    
          const getRequest = objectStore.get(newData.questao);
    
          getRequest.onsuccess = function(event) {
            const resposta = getRequest.result;
            if (resposta) {
              // Atualize os dados da questão conforme necessário
              resposta.alternative = newData.resposta;
              resposta.status = newData.status;
    
              const updateRequest = objectStore.put(resposta);
              updateRequest.onsuccess = function(event) {
                console.log('Questão atualizada com sucesso.');
                resolve();
              };
              updateRequest.onerror = function(event) {
                console.log('Erro ao atualizar a questão.');
                reject();
              };
            } else {
              console.log('Questão não encontrada.');
              reject();
            }
          };
    
          getRequest.onerror = function(event) {
            console.log('Erro ao obter a questão.');
            reject();
          };
        };
    
        request.onerror = function(event) {
          console.log('Erro ao abrir o banco de dados IndexedDB.');
          reject();
        };
      });
    }
    
    topo(){
      window.scrollTo(0, 0);
    }
  }
  