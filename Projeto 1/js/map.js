
var requestURLBares = "http://localhost:3000/bares";
var mymap = InitializeMap();
LoadAllData(requestURLBares);

document.addEventListener('readystatechange', event => {
    if (event.target.readyState === "complete") {
        LoadSpotlight(requestURLBares, 3);
        LoadFavoritos();
    }
});



function SearchMap() {
    let search = document.getElementById("search-map-input").value;
    if (!search) {
        alert("Entre com um valor válido para pesquisar.");
        return;
    }
    FindData(requestURLBares, search);
}

function ReloadMap(data) {
    mymap.off();
    mymap.remove();
    mymap = InitializeMap();
    LoadMap(data);
}

function InitializeMap() {
    return L.map('mapid').setView([-22.9, -47.0516], 13);
}

function LoadMap(bares) {

    L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiY2Fpb2F1Z3VzdG9iYXJyZXR0YSIsImEiOiJja2l0NHJuZmEwemk0MzRwNHFwbzk3MWtiIn0.WxTrFco5m2HaFxjqSZKxpw',
        {
            attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
            maxZoom: 18,
            id: 'mapbox/streets-v11',
            tileSize: 512,
            zoomOffset: -1,
            accessToken: 'your.mapbox.access.token'
        }).addTo(mymap);

    bares.map((bar) => {
        var marker = L.marker([bar.lat, bar.long], { title: bar.nome });
        var info = `<b>${bar.nome}</b><br>${bar.descricao ? bar.descricao : bar.nome}<br>Endereço:${bar.endereco}<br>`;
        if (bar.fb) {
            info += `<a href="${bar.fb}">Facebook</a>`;
        }
        if (bar.insta) {
            info += `<a href="${bar.insta}">Instagram</a>`;
        }
        info += `<a href="javascript:favoritar('${bar.nome}', ${bar.id})">Favoritar</a>`;
        marker.bindPopup(info);
        marker.addTo(mymap);
    });
}


function LoadAllData(requestURL) {
    let request = new XMLHttpRequest();
    request.open('GET', requestURL);
    request.responseType = 'json';
    request.send();
    request.onload = function () {
        LoadMap(request.response);
    }

}

function RetornaPropriedadeTipoPesquisa(tipoPesquisa, bar) {
    if (tipoPesquisa === "nome") {
        return bar.nome;
    }
    if (tipoPesquisa === "endereco") {
        return bar.endereco;
    }
    if (tipoPesquisa === "descricao") {
        return bar.descricao;
    }
    alert("Valor do tipo de pesquisa inválido.");
}

function FindData(requestURL, search) {
    var data = [];
    let request = new XMLHttpRequest();
    request.open('GET', requestURL);
    request.responseType = 'json';
    request.send();
    request.onload = function () {
        bares = request.response;
        let tipoPesquisa = document.getElementById("search-map-select");
       bares.map((bar) => {
            let variavelPesquisa = RetornaPropriedadeTipoPesquisa(tipoPesquisa.value, bar);
            if (variavelPesquisa) {
                if (variavelPesquisa.toUpperCase().includes(search.toUpperCase())) {
                    data.push(bar);
                }
            }
        });
        ReloadMap(data);
    }
}

function LoadSpotlight(requestURL, qtd) {
    let listId = [];
    do {
        let idRandom = getRandomInt(1, 10);
        if (!listId.includes(idRandom)) {
            listId.push(idRandom);
        }
    } while (listId.length < qtd);
    let request = new XMLHttpRequest();
    request.open('GET', requestURL);
    request.responseType = 'json';
    request.send();
    request.onload = function () {
        let bares = request.response;
        let counter = 1;
        bares.map((bar) => {
            if (listId.includes(bar.id) && counter <= qtd) {
                let img = document.getElementById(`spotlight-img-${counter}`).src = `img/${bar.nome}.jpg`;
                counter++;
            }
        });
    }
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

function favoritar(nome, id) {
    let divDocument = document.getElementById(`favorites-div-img-${id}`);
    if (divDocument)
        return;

    var div = document.createElement("div");
    div.setAttribute("id", `favorites-div-img-${id}`);
    div.setAttribute("style", ' height:150px; width: 20%; float: left;');
    document.getElementById("favorites-img").appendChild(div);

    var linkClose = document.createElement("a");
    linkClose.setAttribute("class", "material-icons");
    linkClose.setAttribute("id", `favorites-img-${id}-close`);
    linkClose.setAttribute("style", 'margin-left: 90%;');
    linkClose.setAttribute("href", `javascript:removerFavoritos(${id})`);
    linkClose.textContent = "minimize";
    div.appendChild(linkClose);

    var img = document.createElement("img");
    img.setAttribute("id", `favorites-img-${id}`);
    img.setAttribute("src", `img/${nome}.jpg`);
    img.setAttribute("margin-right", "10px");
    img.setAttribute("height", "150px");
    img.setAttribute("width", "100%");
    img.setAttribute("alt", nome);
    div.appendChild(img);

    let favorito = {
        id: id,
        nome: nome
    };

    let listFavoritosRaw = window.localStorage.getItem('listFavoritos');
    let listFavoritos = JSON.parse(listFavoritosRaw);
    if (!listFavoritos) {
        listFavoritos = []
        listFavoritos.push(favorito);
    }
    else {
        listFavoritos.push(favorito);
    }

    window.localStorage.setItem('listFavoritos', JSON.stringify(listFavoritos));
}

function removerFavoritos(id) {
    let divDocument = document.getElementById(`favorites-div-img-${id}`);
    let newListFavoritos = [];
    if (divDocument) {
        divDocument.remove();
        let listFavoritos = JSON.parse(window.localStorage.getItem('listFavoritos'));
        listFavoritos.map((fav) => {
            if (fav.id != id) {
                newListFavoritos.push(fav);
            }
        });
        window.localStorage.setItem('listFavoritos', JSON.stringify(newListFavoritos));

    }
}

function LoadFavoritos() {
    let listFavoritos = JSON.parse(window.localStorage.getItem('listFavoritos'));
    if (!listFavoritos)
        return;

    listFavoritos.map((fav) => {
        favoritar(fav.nome, fav.id);
    });
}