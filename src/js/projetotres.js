const campo = {
    // Buttons
    btnGenerateOs: document.querySelector('#btn-osgenerate'),
    btnClientList: document.querySelector('#btn-oslist'),
    btnNewService: document.querySelector('#btn-new-service'),
    // Sector
    sectorList: document.querySelector('.services-list'),
    sectorGenerateOs: document.querySelector('.coleta-dados'),
    sectorStatus: document.querySelector('#status-msg'),
    sectorTotalOs: document.querySelector('#total-os'),
    // Fields
    cClients: document.querySelector('#iclient'),
    cDevice: document.querySelector('#idevice'),
    cDefect: document.querySelector('#idefect'),
    cValue: document.querySelector('#ivalue'),
};

let osData = []; //array responsavel por armazenar as O.S.
let ultimaOs = 0

function validations(camp) { //Verifica se algum campo ficou vazio
    return camp.value.length === 0;
}

function pushToArray(id,client, devi, def, val,status) { //preenche o objeto com todas as os (base de dados)
    osData.push({
        id:id, client: client, device: devi, defect: def, valor: val, status: status
    })
}

function generateOs() { // cria a OS em si
    const cRequired = [campo.cClients, campo.cDevice, campo.cDefect, campo.cValue];
    if (cRequired.some(validations)) {
        let errorMsg = campo.sectorStatus.innerHTML = `<p> [ERRO]:Preencha todos os campos!!<p>`
        errorMsg = campo.sectorStatus.style.color = 'red'
        limparCampo()
        return;
    } else {
        pushToArray(ultimaOs+= 1,campo.cClients.value, campo.cDevice.value, campo.cDefect.value, campo.cValue.value,'Em análise')
        const creat = document.createElement('p');
        textOs(campo.sectorList);
        campo.sectorList.appendChild(creat)
        campo.sectorTotalOs.innerHTML = `<strong>Total de O.S:</strong> ${osData.length}`
        let sucessMsg = campo.sectorStatus.innerHTML = `<p> [SUCESSO]:Ordem de Serviço registrada!!<p>`
        sucessMsg = campo.sectorStatus.style.color = 'green'
        
        limparCampo()

    }
} campo.btnGenerateOs.addEventListener('click', generateOs);

function newOs() {// Botão para ir para o gerador de OS
    campo.sectorList.style.display = 'none';
    campo.sectorGenerateOs.style.display = 'block';
} campo.btnNewService.addEventListener('click', newOs);

function goToList() { // Botão que fecha o Gerador e vai para lista de clientes
    campo.sectorList.style.display = 'block';
    campo.sectorGenerateOs.style.display = 'none';
} campo.btnClientList.addEventListener('click', goToList);

function textOs(vari) {// cria o texto que vai exibir as ordens na lista
    const posOs = osData.at(-1)
    vari.innerHTML +=
        `
    <strong>ID:</strong> ${posOs.id} <br>
    <strong>Cliente:</strong>${posOs.client} <br>
    <strong>Aparelho:</strong> ${posOs.device} <br>
    <strong>Defeito:</strong> ${posOs.defect} <br>
    <strong>Valor:</strong> R$${conversor(posOs.valor)} <br>
    <strong>STATUS:</strong> ${posOs.status}
    <hr>    
    `;
}

function conversor(string) {//  converte o valor para mostrar com decimais e virgula
    return Number(string).toFixed(2).replace('.', ',')
}

function limparCampo() { //limpa os campos e foca
    campo.cClients.value = ''
    campo.cDevice.value = ''
    campo.cDefect.value = ''
    campo.cValue.value = ''
    campo.cClients.focus()
}