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
            }else{
                alert("CEP não encontrado");
            }

        })
        .catch(error =>console.error( "Erro ao buscar o CEP: ", error));
        
})
// Função para salvar os dados no localStorage
function salvarDadosFormulario() {
    const campos = ['cep', 'logradouro', 'bairro', 'cidade', 'estado'];
    campos.forEach(campo => {
        const valor = document.getElementById(campo).value;
        localStorage.setItem(campo, valor);
    });
}

// Adiciona evento de input para salvar os dados conforme o usuário digita
document.querySelectorAll('#cep, #logradouro, #bairro, #cidade, #estado')
    .forEach(elemento => {
        elemento.addEventListener('input', salvarDadosFormulario);
    });

// Função para restaurar os dados do localStorage
function restaurarDadosFormulario() {
    const campos = ['cep', 'logradouro', 'bairro', 'cidade', 'estado'];
    campos.forEach(campo => {
        const valorSalvo = localStorage.getItem(campo);
        if (valorSalvo) {
            document.getElementById(campo).value = valorSalvo;
        }
    });
}

// Executa ao carregar a página
window.addEventListener('DOMContentLoaded', restaurarDadosFormulario);