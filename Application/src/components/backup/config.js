export const backup = async () => {
    let valuePaste = prompt("Cole suas tarefas aqui, ou, salve colando em outro arquivo:");

    if (valuePaste !== null && valuePaste !== "") {
        if(valuePaste == 'false' || valuePaste == 'true')return;
        localStorage.setItem("tarefas", valuePaste);
        location.reload();

    } else {
        let valeuCopy = localStorage.getItem("tarefas");

        if (valeuCopy.length) {
            navigator.clipboard.writeText(valeuCopy)
        }
    }
}