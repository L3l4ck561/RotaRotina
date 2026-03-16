const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const backup = async () => {
    let valeuCopy = localStorage.getItem("tarefas");

    if (valeuCopy.length) {
        navigator.clipboard.writeText(valeuCopy)
    }

    await delay(100);

    let valuePaste = prompt("Cole suas tarefas aqui, ou, salve colando em outro arquivo:");

    if (valuePaste !== null && valuePaste !== "") {
        localStorage.setItem("meuValor", valuePaste);
    }
}