const Modal = {
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