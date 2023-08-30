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