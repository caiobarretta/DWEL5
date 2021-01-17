var url = "http://www.geonames.org/childrenJSON";

var dropdownEstados = document.getElementById("estados");
CarregaGeonameSelect(dropdownEstados, "3469034");

function CarregaGeonameSelect(dropdown, geonameId) {

    fetch(url + "?geonameId=" + geonameId)
        .then(response => response.json())
        .then((json) => {

            json.geonames.map(line => {
                let option = document.createElement("option");
                option.text = line.toponymName;
                option.setAttribute("value", line.geonameId);
                dropdown.add(option);
            });
        })
        .catch((erro) => {
            alert("Ocorreu um erro: " + erro);
        });
}

function carregaCidades() {
    let dropdownCidades = document.getElementById("cidades");
    var length = dropdownCidades.options.length;
    for (i = length - 1; i >= 0; i--) {
        dropdownCidades.options[i] = null;
    }
    CarregaGeonameSelect(dropdownCidades, dropdownEstados.value);
}