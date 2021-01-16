function salvaOrcamento() {

    let descricao = document.getElementById("descricao").value;
    if (!descricao) {
        alert("Entre com um valor para a Descrição.");
        return;
    }

    let valor = parseInt(document.getElementById("valor").value);
    if (isNaN(valor) || valor < 0) {
        alert("Valor de entrada é inválido");
        return;
    }

    let tipo = document.getElementById("tipo-orcamento").value;
    if (tipo == "saida")
        valor *= -1;

    AdicionarOrcamento(descricao, valor, tipo);
    CalcularTotais(valor, tipo);

}

function AdicionarOrcamento(descricao, valor, tipo) {

    var tr = document.createElement("tr");
    document.getElementById("tabela-financeira-table").appendChild(tr);

    var tdDescricao = document.createElement("td");
    tdDescricao.textContent = descricao
    tr.appendChild(tdDescricao);

    var tdValor = document.createElement("td");
    tdValor.textContent = valor;
    tr.appendChild(tdValor);

    var tdTipo = document.createElement("td");
    tdTipo.textContent = tipo;
    tr.appendChild(tdTipo);

    var tdAcao = document.createElement("td");
    var inputDelete = document.createElement("input");
    inputDelete.setAttribute("type", "submit");
    inputDelete.setAttribute("value", "Excluir");
    inputDelete.setAttribute("onclick", 'RemoverOrcamento(this, "'+tipo+'", '+valor+',)');
    inputDelete.setAttribute("style", "width: 100%; float: none;");
    tdAcao.appendChild(inputDelete);
    tr.appendChild(tdAcao);
}

function RemoverOrcamento(e, tipo, valor) {
    valor *= -1;
    CalcularTotais(valor, tipo);
    e.parentElement.parentElement.remove();
}

function CalcularTotais(valor, tipo){
    let labelTotalSaida = document.getElementById("total-saida");
    let labelTotalEntrada = document.getElementById("total-entrada");
    if(tipo == "saida"){
        let totalSaida = parseInt(labelTotalSaida.textContent);
        totalSaida += valor;
        labelTotalSaida.textContent = totalSaida;
    }
    if(tipo == "entrada"){
        let totalEntrada = parseInt(labelTotalEntrada.textContent);
        totalEntrada += valor;
        labelTotalEntrada.textContent = totalEntrada;
    }
    let labelTotalOrcamento = document.getElementById("total-orcamento");
    labelTotalOrcamento.textContent = parseInt(labelTotalSaida.textContent) + parseInt(labelTotalEntrada.textContent);
}