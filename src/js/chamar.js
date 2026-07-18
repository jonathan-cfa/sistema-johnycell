const campo = {
    cClient: document.querySelector('#iclient'),
    cNumber: document.querySelector('#inumber'),
    cMenseger: document.querySelector('#imenseger'),
};

const btn = {
    sendButton: document.querySelector('#btn-send')
};

const camp = [
        campo.cClient,
        campo.cNumber,
        campo.cMenseger,
    ];

function verificationCamps(){ //verificar campos vazios
    if(camp.some(item =>item.value.trim().length === 0)){
        alert('[ERRO:]Preencha todos os campos obrigatórios!!');
        return false;
    }else if(campo.cNumber.value.length !== 11){
        alert(`[ERRO]: Preencha o número completo 8499999-9999`)
        return false
    }
    return true;
}

function menseger(){
    const numberClient = campo.cNumber.value.trim().replace(/\D/g,'')
    const textCampo = campo.cMenseger.value
    const mensegerReady = `Olá ${campo.cClient.value}, ${textCampo}`
    const link = `https://wa.me/55${numberClient}?text=${encodeURIComponent(mensegerReady)}`
    window.open(link, '_blank');
    camp.some(item => item.value === '');
    campo.cClient.focus();
}

function sendMenseger(){

    if (!verificationCamps()){
        return;
    }else{
        menseger();
        camp.some(item => item.value = '')
    }
} btn.sendButton.addEventListener('click',sendMenseger);

