var livros = [];

function CadastraLivro() {
    let nome = document.getElementById("nome").value;
    let autor = document.getElementById("autor").value;
    let numeroPaginas = document.getElementById("numero-paginas").value;
    let genero = document.getElementById("genero").value;

    let livro = {
        nome,
        autor,
        numeroPaginas,
        genero
    }
    livros.push(livro);
}

function ListarLivros() {

    let tabelaLivros = document.getElementById("tabela-livros");
    if(tabelaLivros){
        tabelaLivros.remove();
    }

    let divTabela = document.getElementById("tabela");
    

    var table = document.createElement("table");
    table.setAttribute("id", "tabela-livros");

    divTabela.appendChild(table);
    var trHead = document.createElement("tr");
    table.appendChild(trHead);

    let thNome = document.createElement("th");
    thNome.textContent = "Nome";
    trHead.appendChild(thNome);
    
    let thAutor = document.createElement("th");
    thAutor.textContent = "Autor";
    trHead.appendChild(thAutor);

    let thNumeroDePaginas = document.createElement("th");
    thNumeroDePaginas.textContent = "Número de Páginas";
    trHead.appendChild(thNumeroDePaginas);

    let thGenero = document.createElement("th");
    thGenero.textContent = "Gênero";
    trHead.appendChild(thGenero);

    livros.map(livro => {
        var tr = document.createElement("tr");
        document.getElementById("tabela-livros").appendChild(tr);

        var tdNome = document.createElement("td");
        tdNome.textContent = livro.nome;
        tr.appendChild(tdNome);

        var tdAutor = document.createElement("td");
        tdAutor.textContent = livro.autor;
        tr.appendChild(tdAutor);

        var tdNumeroPaginas = document.createElement("td");
        tdNumeroPaginas.textContent = livro.numeroPaginas;
        tr.appendChild(tdNumeroPaginas);

        var tdGenero = document.createElement("td");
        tdGenero.textContent = livro.genero;
        tr.appendChild(tdGenero);

    });
}