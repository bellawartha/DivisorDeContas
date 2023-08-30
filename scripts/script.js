// Adição de clientes e itens
let clients = [];
let items = [];
let clientShared = [];

// Inputs
let txtClient = document.getElementById('clientName');
let txtItem = document.getElementById('consumedItems');
let txtPrice = document.getElementById('itemPrice');

// Resultados
let divResults = document.getElementById('containerResults');
let clientTotalAmount = document.getElementById('clientTotalAmount');
let clientTotalAmount10 = document.getElementById('clientTotalAmount10');
let resultShared = document.getElementById('infosResultsShared');

let infoShared = document.createElement('div');
let resultAdd = document.createElement('div');

resultShared.appendChild(infoShared);
divResults.appendChild(resultAdd);

function calcClient() {
    clientTotalAmount.innerHTML = '';
    clientTotalAmount10.innerHTML = ' ';

    let resultClient = document.createElement('div');
    let resultClient10 = document.createElement('div');
    clientTotalAmount.appendChild(resultClient);
    clientTotalAmount10.appendChild(resultClient10);

    for (let client of clients) {
        let tot = client.calcTotalClient();
        resultClient.innerHTML += `<p> Total de ${client.nome}: R$ ${tot}</p>`;
    }


    for (let client of clients) {
        let tot = client.calcTotalClient10();
        resultClient10.innerHTML += `<p> Total de ${client.nome} com os 10%: R$ ${tot}</p>`;
    }

    itemsPerClient();
}