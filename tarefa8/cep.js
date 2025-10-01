document.getElementById("cep").addEventListener("blur", (evento) => {
    const elemento = evento.target;
    const cepInformado = elemento.value;
    if(!(cepInformado.length === 8))
        return;

    fetch(`https://viacep.com.br/ws/${cepInformado}/json/`)
        .then(response => response.json())
        .then(data => {
            if(!data.erro){
                document.getElementById('logradouro').value = data.logradouro;
                document.getElementById('bairro').value = data.bairro;
                document.getElementById('cidade').value = data.localidade;
                document.getElementById('estado').value = data.uf;

                localStorage.setItem('endereco', JSON.stringify({
                    cep: cepInformado,
                    logradouro: data.logradouro,
                    bairro: data.bairro,
                    cidade: data.localidade,
                    estado: data.uf
                }));
            }else{
                alert("CEP não encontrado");
            }

        })
        .catch(error =>console.error( "Erro ao buscar o CEP: ", error));
        
})
const enderecoSalvo = JSON.parse(localStorage.getItem('endereco'));
