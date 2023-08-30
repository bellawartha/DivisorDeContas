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
