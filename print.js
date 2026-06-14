window.addEventListener('load', (event) => {
    let campoData = document.getElementById('idata')
    let campoHora = document.getElementById('ihora')
    const campoCliente = document.getElementById('icliente')
    const campoOs = document.getElementById('ios')
    const campoAparelho = document.getElementById('iaparelho')
    const campoDefeito = document.getElementById('idefeito')
    const campoSenha = document.getElementById('isenha')
    const campoTelefone = document.getElementById('itelefone')
    const campoCusto = document.getElementById('icusto')
    const campoImei = document.getElementById('iimei')
    const markLiga = document.getElementById(`iliga`)
    const markTela = document.getElementById('itela')
    const markVibra = document.getElementById('ivibra')
    const markMarcas = document.getElementById('imarcas')
    const markChip = document.getElementById('ichip')
    const markSd = document.getElementById('isd')

    const data = new Date()

    const ano = data.getFullYear()
    const mes = String(data.getMonth() + 1).padStart(2, '0')
    const dia = String(data.getDate()).padStart(2, '0')

    const hora = String(data.getHours()).padStart(2, '0')
    const minuto = String(data.getMinutes()).padStart(2, '0')

    campoData.value = `${ano}-${mes}-${dia}`
    campoHora.value = `${hora}:${minuto}`
    campoOs.value = Number(localStorage.UltimaOs)+1

    //Envio de mensagem por whatsapp
    const botaoZap = document.querySelector('#contatar')
    botaoZap.addEventListener('click', zapzap)
    function zapzap() {

        const defeito = campoDefeito.value
        const aparelho = campoAparelho.value
        const cliente = campoCliente.value
        const os = campoOs.value
        const telefone = campoTelefone.value.replace(/\D/g, '')
        const custo = Number(campoCusto.value).toFixed(2).replace('.', ',')

        if (telefone.length !== 11) {
            alert('Verifique o numero e tente novamente!')
            return
        } else if (os.length === 0) {
            alert('A ordem de serviço precisa de um número')
            return
        } else if (cliente.length === 0) {
            alert('Digite o nome do cliente')
            return
        } else if (defeito.length === 0) {
            alert('O campo "Defeito" deve ser preenchido')
            return
        } else if (aparelho.length === 0) {
            alert('Informe qual o aparelho!')
            return
        } else if (custo.length === 0) {
            alert('Informe o valor da O.S.')
            return
        } else {
            const texto = `
Olá *${cliente}*,
sua O.S. de *Nº: ${os}* foi registrada no dia ${dia}/${mes}/${ano} as ${campoHora.value}h 
*Aparelho:* ${aparelho} 
*Defeito:* ${defeito}
*Valor do Serviço: R$${custo}*
Qualquer duvida, pode chamar por aqui.`

            const textCod = encodeURIComponent(texto)
            const enviarZap = `https://wa.me/55${telefone}?text=${textCod}`
           /*  localStorage.UltimaOs = os */
            window.open(enviarZap, '_blank')
        }//fim do if
    }//fim da função whatsapp

    const botaoPrint = document.getElementById('primir')
    botaoPrint.addEventListener('click', imprimir)
    function imprimir() {
        const ros = document.getElementById('ros')
        const rdata = document.getElementById('rdata')
        const rhora = document.getElementById('rhora')
        const rcliente = document.getElementById('rcliente')
        const rcontato = document.getElementById('rcontato')
        const raparelho = document.getElementById('raparelho')
        const rimei = document.getElementById('rimei')
        const rliga = document.getElementById('rliga')
        const rtela = document.getElementById('rtela')
        const rvibra = document.getElementById('rvibra')
        const rchip = document.getElementById('rchip')
        const rsd = document.getElementById('rsd')
        const rdefeito = document.getElementById('rdefeito')
        const rsenha = document.getElementById('rsenha')
        const rcusto = document.getElementById('rcusto')

        const os = campoOs.value
        const cliente = campoCliente.value
        const telefone = campoTelefone.value.replace(/\D/g, '')
        const aparelho = campoAparelho.value
        const defeito = campoDefeito.value
        const senha = campoSenha.value
        const custo = Number(campoCusto.value).toFixed(2).replace('.', ',')
        const imei = campoImei.value

        //preenchimento do form no print
        ros.innerHTML = `O.S. Nº: ${os}`
        rdata.innerHTML = `Data: ${dia}/${mes}/${ano}`
        rhora.innerHTML = `Hora: ${hora}:${minuto}`
        rcliente.innerHTML = `Cliente: ${cliente}`
        rcontato.innerHTML = `Contato: ${telefone}`
        raparelho.innerHTML = `Aparelho: ${aparelho}`

        if (os.length === 0 || cliente.length === 0 || telefone.length === 0 || aparelho.length === 0 || defeito.length === 0 || !campoCusto.value.trim()) {
            alert('Preencha todos os campos obrigatórios')
            return
        } else {
            if (imei.length === 0) {
                rimei.innerHTML = `IMEI:Não informado`
            } else {
                rimei.innerHTML = `IMEI: ${imei}`
            } if (markLiga.checked) {
                rliga.innerHTML = `Aparelho liga?  NÃO`
            } else {
                rliga.innerHTML = `Aparelho liga?  SIM`
            } if (markTela.checked) {
                rtela.innerHTML = `Tela Quebrada? SIM`
            } else {
                rtela.innerHTML = `Tela Quebrada? NÃO`
            } if (markVibra.checked) {
                rvibra.innerHTML = `Aparelho vibrando? SIM`
            } else {
                rvibra.innerHTML = `Aparelho vibrando? NÃO`
            } if (markChip.checked) {
                rchip.innerHTML = `Deixou Chip? SIM`
            } else {
                rchip.innerHTML = `Deixou Chip? NÃO`
            } if (markSd.checked) {
                rsd.innerHTML = `Deixou Cartão SD? SIM`
            } else {
                rsd.innerHTML = `Deixou Cartão SD? NÃO`
            }
            rsenha.innerHTML = `Senha do Aparelho: ${senha}`
            rdefeito.innerHTML = `Defeito: ${defeito}`
            rcusto.innerHTML = `Custo do Serviço: R${custo}`
            /* localStorage.UltimaOs = os */
            
            window.print()
        }
    } // Fim da função imprimir
}//fim da função load
)