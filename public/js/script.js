fetch('../../../public/exam.json')
  .then(response => response.json())
  .then(data => {
    // Aqui você pode acessar os dados do seu arquivo JSON
    const exam = data.exam;
    let topcontainer = document.querySelector(".top-container");

    // Encontre os elementos HTML onde você deseja inserir as informações
    const programElement = exam.program;
    const subjectElement = exam.subject;
    const semestreElement = exam.semestre;
    const anoperiodo = exam.anoperiodo;

    let temas = ` <div>[<label>${programElement}</label>]
    {${semestreElement}} (${anoperiodo}) - ${subjectElement} </div>`

    //Criando o elemento div
    let div = document.createElement("div");

    div.innerHTML = temas;

    topcontainer.append(div);
  })
  .catch(error => console.error("Erro ao ler o arquivo JSON:", error));
