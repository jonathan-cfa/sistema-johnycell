window.addEventListener('load',(event) =>{
    let campoData = document.getElementById('idata')
    let campoHora = document.getElementById('ihora')
    const data = new Date()

    const ano = data.getFullYear()
    const mes = String(data.getMonth() + 1).padStart(2, '0')
    const dia = String(data.getDate()).padStart(2, '0')

    const hora = String(data.getHours()).padStart(2,'0')
    const minuto = String(data.getMinutes()).padStart(2,'0')


    campoData.value = `${ano}-${mes}-${dia}`
    campoHora.value = `${hora}:${minuto}`
console.log(event)
})