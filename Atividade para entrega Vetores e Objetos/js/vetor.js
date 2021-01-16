var animais = [];

function incluiAnimalInicio(){
    let animal = document.getElementById("inclui-animal-inicio");
    if(!animal.value){
        return;
    }
    animais.unshift(animal.value);
    imprimeLista();
}


function incluiAnimalFim(){
    let animal = document.getElementById("inclui-animal-fim");
    if(!animal.value){
        return;
    }
    animais.push(animal.value);
    imprimeLista();
}

function removeAnimalInicio(){
    animais.shift();
    imprimeLista();
}

function removeAnimalFim(){
    animais.pop();
    imprimeLista();
}

function exibeAnimalAleatorio(){
    let randomInt = getRandomInt(0, animais.length);
    imprimeAnimal(randomInt);
}


function imprimeLista(){
    let listaAnimais = document.getElementById("lista-animais");

    if(animais.length <= 0){
        listaAnimais.textContent = "Lista de animais vazia.";
        return;
    }

    listaAnimais.textContent = "";
    animais.map( animal =>{
        listaAnimais.textContent += animal + " ";
    });
}

function imprimeAnimal(codigoAnimal){
    let listaAnimais = document.getElementById("lista-animais");

    if(animais.length <= 0){
        listaAnimais.textContent = "Lista de animais vazia.";
        return;
    }

    listaAnimais.textContent = "Animal aleatório: " + animais[codigoAnimal];
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}