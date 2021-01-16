function processaVotacao() {

    var numeroEleitoresMunicipio = parseInt(document.getElementById("numero-eleitores-municipio").value);
    if (isNaN(numeroEleitoresMunicipio) || numeroEleitoresMunicipio < 0) {
        alert("Valor do número de eleitores do município inválido");
        return;
    }

    var numeroCadeirasExistemCamaraCidade = parseInt(document.getElementById("numero-cadeiras-existem-camara-cidade").value);
    if (isNaN(numeroCadeirasExistemCamaraCidade) || numeroCadeirasExistemCamaraCidade < 0) {
        alert("Valor do número de cadeiras que existem na câmara da cidade inválido");
        return;
    }

    var numeroAbstencoes = parseInt(document.getElementById("numero-abstencoes").value);
    if (isNaN(numeroAbstencoes) || numeroAbstencoes < 0) {
        alert("Valor do Número de abstenções inválido");
        return;
    }

    var numeroVotosBranco = parseInt(document.getElementById("numero-votos-branco").value);
    if (isNaN(numeroVotosBranco) || numeroVotosBranco < 0) {
        alert("Valor do número de votos em branco inválido");
        return;
    }

    var numeroVotosNulos = parseInt(document.getElementById("numero-votos-nulos").value);
    if (isNaN(numeroVotosNulos) || numeroVotosNulos < 0) {
        alert("Valor do número de votos nulos inválido");
        return;
    }

    var numeroVotosPartidoRecebeu = parseInt(document.getElementById("numero-votos-partido-recebeu").value);
    if (isNaN(numeroVotosPartidoRecebeu) || numeroVotosPartidoRecebeu < 0) {
        alert("Valor do número de votos que o partido recebeu");
        return;
    }

    var nomePartido = document.getElementById("nome-partido").value;
    if (!nomePartido) {
        alert("Entre com o nome do partido.");
        return;
    }

    //Número de votos válidos =  Número de eleitores - (Número de abstenções + Número de votos em branco + Número de votos nulos).
    let numeroVotosValidos = numeroEleitoresMunicipio - (numeroAbstencoes + numeroVotosBranco + numeroVotosNulos);

    //Quociente eleitoral = Número de votos válidos / Número de cadeiras que existem na câmara da cidade.
    let quocienteEleitoral = numeroVotosValidos / numeroCadeirasExistemCamaraCidade;

    //Número de eleitos =  Número de votos obtidos por todos os candidatos do partido /  Quociente eleitoral;
    let numeroDeEleitos = numeroVotosPartidoRecebeu / quocienteEleitoral;

    let mensagem = "";
    numeroDeEleitos =  Math.round(numeroDeEleitos);
    if (numeroDeEleitos > 0)
        mensagem = "O partido " + nomePartido + " elegeu " + numeroDeEleitos + " vereadores(as)";
    else
        mensagem = "O partido " + nomePartido + " não elegeu vereadores(as)";

    document.getElementById("numero-de-eleitos").value = mensagem;
}