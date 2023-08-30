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
        txtSharedItem.removeAttribute('disabled', 'disabled');
        txtPriceItemShared.removeAttribute('disabled', 'disabled');

    }
}

function clientsSharedItem() {
    let txtSharedItem = document.getElementById('sharedItems');
    let txtPriceItemShared = document.getElementById('priceShared');
    let txtClientName = document.getElementById('clientsSharedNames');


    if (txtClientName.value.trim() === '') {
        alert('Por favor digite a informação necessária');
    } else {
        let clientName = txtClientName.value.toUpperCase();
        clientShared.push(clientName);


        listOfClientsShared();
        txtSharedItem.setAttribute('disabled', 'disabled');
        txtPriceItemShared.setAttribute('disabled', 'disabled');
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
    let txtSharedItem = document.getElementById('sharedItems');
    let sharedItems = txtSharedItem.value.toUpperCase();

    for (let client of clientShared) {
        infoShared.innerHTML += `<br><p>${client} foi adicionado(a) com sucesso ao item ${sharedItems}</p>`;

    }


}