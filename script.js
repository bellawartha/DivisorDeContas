// Definição da classe Cliente
class Client {
    constructor(nome) {
        this.nome = nome;
        this.itensConsumidos = [];
    }

    adicionarItem(item) {
        this.itensConsumidos.push(item);
    }

    calcTotalClient() {
        let valorTotal = 0;
        for (let item of this.itensConsumidos) {
            valorTotal += item.preco;
        }
        return valorTotal;
    }

    calcTotalClient10() {
        let valorTotal = this.calcTotalClient();
        valorTotal = valorTotal + valorTotal * 0.1;
        return valorTotal;
    }
}

// Definição da classe Item
class Item {
    constructor(nome, preco) {
        this.nome = nome;
        this.preco = preco;
    }
}

// Definição da classe Item compartilhado
class SharedItem {
    constructor(nome, preco) {
        this.nome = nome;
        this.preco = preco;
        this.clientsShared = [];
    }

    addClient(client) {
        this.clientsShared.push(client);
    }

    calcShared() {
        let priceShared = this.preco / this.clientsShared.length;
        return priceShared;
    }
}

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
let clientTotalAmount10 = document.getElementById ('clientTotalAmount10');
let resultShared = document.getElementById('infosResultsShared');

let infoShared = document.createElement('div');
let resultAdd = document.createElement('div');

resultShared.appendChild(infoShared);
divResults.appendChild(resultAdd);

// Funções itens individuais
function add() {
    if (txtItem.value.trim() === '' || txtClient.value.trim() === '' || txtPrice.value.trim() === '') {
        alert('Por favor digite as informações necessárias');
    } else {
        let txtClientValue = txtClient.value.toUpperCase();
        let existingClient = clients.find(client => client.nome == txtClientValue);

        if (existingClient) {
            // Cliente já existe, apenas adiciona o novo item
            let newItem = addItem();
            existingClient.adicionarItem(newItem);
            items.push(newItem);

        } else {
            // Cliente não existe, cria um novo cliente e adiciona o item
            let newClient = new Client(txtClientValue);
            let newItem = addItem();

            newClient.adicionarItem(newItem);
            clients.push(newClient);
            items.push(newItem);

        }
        itemsPerClient();
    }

    txtClient.value = '';
    txtClient.focus();
}

function addItem() {
    let txtItemValue = txtItem.value.toUpperCase();
    let txtPriceValue = Number(txtPrice.value);
    let newItem = new Item(txtItemValue, txtPriceValue);

    txtItem.value = '';
    txtPrice.value = '';
    return newItem;
}

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

// Funções itens compartilhados

function calcSharedItem() {
    let txtSharedItem = document.getElementById('sharedItems');
    let txtPriceItemShared = document.getElementById('priceShared');


    if (txtSharedItem.value.trim() === '' || txtPriceItemShared.value.trim() === '') {
        alert('Para calcular o valor de um item compartilhado você tem que preencher todas as informações corretamente');
    } else {
        infoShared.innerHTML = '';
        let sharedItems = txtSharedItem.value.toUpperCase();
        let priceItemShared = Number(txtPriceItemShared.value);


        let newSharedItem = new SharedItem(sharedItems, priceItemShared);
        let newClient;

        for (let client of clientShared) {
            newSharedItem.addClient(client);
        }

        let priceShared = newSharedItem.calcShared();


        for (let client of clientShared) {
            let existingClient = clients.find(Cname => Cname.nome == client)
            if (existingClient) {
                let newItem = new Item(sharedItems, priceShared);
                existingClient.adicionarItem(newItem);
            } else {
                newClient = new Client(client);
                clients.push(newClient);
                let newItem = new Item(sharedItems, priceShared);
                newClient.adicionarItem(newItem);
            }
        }


        infoShared.innerHTML = `<p><strong>Item compartilhado:</strong> ${sharedItems}</p>` +
            `<p><strong>Preço do item:</strong> R$ ${priceItemShared}</p>` +
            `<p><strong>Preço para cada pessoa:</strong> R$ ${priceShared}</p>` +
            '<p><strong>Pessoas que compartilharam:</strong></p>';

        for (let clientS of newSharedItem.clientsShared) {
            infoShared.innerHTML += `<p>${clientS}</p>`;
        }
        itemsPerClient();
        clientShared = [];
        txtSharedItem.value = '';
        txtPriceItemShared.value = '';
    }
}

function clientsSharedItem() {
    let txtClientName = document.getElementById('clientsSharedNames');
    let btnCalc = document.getElementById('calcSharedItem');


    if (txtClientName.value.trim() === '') {
        alert('Por favor digite a informação necessária');
    } else {
        let clientName = txtClientName.value.toUpperCase();
        clientShared.push(clientName);

        btnCalc.style.visibility = 'visible';

        listOfClientsShared();
    }

    txtClientName.value = '';
    txtClientName.focus();
}

function addSharedClients() {
    let txtSharedItem = document.getElementById('sharedItems');
    let txtPriceItemShared = document.getElementById('priceShared');
    let sharedItems = txtSharedItem.value.toUpperCase();
    let priceItemShared = Number(txtPriceItemShared.value);


    let newSharedItem = new SharedItem(sharedItems, priceItemShared);
    let newClient;

    for (let client of clientShared) {
        newSharedItem.addClient(client);
    }

    let priceShared = newSharedItem.calcShared();


    for (let client of clientShared) {
        newClient = new Client(client);
        clients.push(newClient);
        let newItem = new Item(sharedItems, priceShared);
        newClient.adicionarItem(newItem);
    }

}

function itemsPerClient() {

    resultAdd.innerHTML = '';

    for (let client of clients) {
        resultAdd.innerHTML += `<p><strong>Itens consumidos por ${client.nome}: <strong></p>`;
        for (let item of client.itensConsumidos) {
            resultAdd.innerHTML += `<p>${item.nome}: R$ ${item.preco}</p>`;
        }
    }
}

function listOfClientsShared() {
    infoShared.innerHTML = '';
    for (let client of clientShared) {
        infoShared.innerHTML += `<br><p>${client} foi adicionado(a) com sucesso</p>`;
    }

}



console.log(clientShared);
console.log(clients);
console.log(items);
