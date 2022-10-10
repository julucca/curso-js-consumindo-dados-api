async function buscaEndereco(cep) {
    var mensagemErro = document.getElementById("erro");
    mensagemErro.innerHTML = "";
    try {
        var consultaCEP = await fetch(`https://viacep.com.br/ws/${cep}/json/`)
        var consultaCEPConvertida = await consultaCEP.json();

        if (consultaCEPConvertida.erro) {
            mensagemErro.innerHTML = `<p>Este CEP não existe. Tente novamente.</p>`
        } else {
            var logradouro = document.getElementById("endereco");
            var bairro = document.getElementById("bairro");
            var cidade = document.getElementById("cidade");
            var estado = document.getElementById("estado");

            logradouro.value = consultaCEPConvertida.logradouro;
            bairro.value = consultaCEPConvertida.bairro;
            cidade.value = consultaCEPConvertida.localidade;
            estado.value = consultaCEPConvertida.uf;
            
            console.log(consultaCEPConvertida);
            return consultaCEPConvertida;
        }

    } catch(erro) {
        if(cep != /^[0-9]{5}?-[0-9]{3}$/){
            mensagemErro.innerHTML = `<p>Formato inválido. Insira o CEP novamente. Um CEP válido contém 8 números, sem espaço e letras.</p>`
            console.log(erro)
        }
    }
}

var cep = document.getElementById("cep");
cep.addEventListener("focusout", () => buscaEndereco(cep.value));