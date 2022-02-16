class Traveler {
    constructor(name) {
            this._name = name;
            this._food = 1; // Inicializada com 1
            this._isHealthy = true; // Boolean - default = true
        }
        // O principal objetivo do Traveler é racionar seus 
        // mantimentos através de caçadas e refeições para que
        // ele não fique doente durante sua viagem.

    get name() {
        return this._name;
    }

    set name(newName) {
        this._name = newName;
    }

    get food() {
        return this._food;
    }

    set food(newFood) {
        this._food = newFood;
    }

    get isHealthy() {
        return this._isHealthy;
    }

    set isHealthy(newIsHealthy) {
            this._isHealthy = newIsHealthy;
        }
        // Para racionar seus mantimentos, o Traveler poderá:

    // hunt(Caçar): Quando o Traveler sair para caçar, a 
    // quantidade de comida deve aumentar em 2.
    hunt() {
        this.food += 2;
    }

    // eat(Comer): Quando o Traveler tentar comer, caso a 
    // quantidade de comida for maior que 0, então o Traveler 
    // perde 1 comida, e continua saudável. Caso a quantidade 
    // for 0, então o Traveler não consegue comer e fica doente.
    eat() {
        if (this.food > 0) {
            this.food -= 1;
        } else {
            this.isHealthy = false;
        }
    }
}

class Wagon {
    constructor(capacity) {
        this._capacity = capacity;
        this._passageiros = []; // Array vazio
    }

    get capacity() {
        return this._capacity;
    }

    set capacity(newCapacity) {
        this._capacity = newCapacity;
    }

    get passageiros() {
        return this._passageiros;
    }

    set passageiros(newPassageiro) {
        this._passageiros.push(newPassageiro);
    }

    // O pricipal objetivo do Cocheiro (Piloto da carroça) 
    // é monitorar os assentos e estado de saúde de todos 
    // os viajantes para que ele possa decidir seguir viagem 
    // ou manter a quarentena.

    // Para monitorar seus assentos e seus viajantes, o cocheiro 
    // poderá:

    // getAvailableSeatCount: Retorna o número de assentos vazios,
    // determinado pela capacidade que foi estipulada quando a 
    // carroça foi criada comparado com o número de passageiros a 
    // bordo no momento.
    getAvailableSeatCount() {
            const assVazio = this.capacity - this.passageiros.length
            return assVazio
        }
        // join: Adicione um viajante à carroça se tiver espaço. 
        // Se a carroça já estiver cheia, não o adicione.
    join(newPassageiro) {
            if (this.getAvailableSeatCount() > 0) {
                this.passageiros = newPassageiro
            }
        }
        // shouldQuarantine: Retorna true se houver pelo menos uma 
        // pessoa não saudável na carroça. Retorna false se não 
        // houver.
    shouldQuarantine() {
        let quarentena = false;
        if (this.passageiros.filter(passageiro => passageiro.isHealthy === false).length > 0) {
            quarentena = true;
        }

        return quarentena;
    }

    // totalFood: Retorna o número total de comida de todos os 
    // ocupantes da carroça.
    totalFood() {
        let total = 0;
        this._passageiros.forEach((value) => {
            total += value.food
        });
        return total;
    }

}


//-----------------------TESTE -------------------------------
// Criar uma carroça que comporta 2 pessoas
let wagon = new Wagon(2);
// Criar três viajantes
let henrietta = new Traveler('Henrietta');
let juan = new Traveler('Juan');
let maude = new Traveler('Maude');

console.log(`${wagon.getAvailableSeatCount()} should be 2`);

wagon.join(henrietta);
console.log(`${wagon.getAvailableSeatCount()} should be 1`);

wagon.join(juan);
wagon.join(maude); // Não tem espaço para ela!
console.log(`${wagon.getAvailableSeatCount()} should be 0`);

henrietta.hunt(); // pega mais comida
juan.eat();
juan.eat(); // juan agora está com fome (doente)

console.log(`${wagon.shouldQuarantine()} should be true since juan is sick`);
console.log(`${wagon.totalFood()} should be 3`);