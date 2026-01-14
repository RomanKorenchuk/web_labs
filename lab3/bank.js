class Bank {
    constructor(name, clients, loans) {
        this.name = name;
        this.clients = clients;
        this.loans = loans;
    }
}

const banks = [
    new Bank("ПриватБанк", 15000000, 5000000),
    new Bank("Ощадбанк", 12000000, 3500000),
    new Bank("Укрексімбанк", 8000000, 2000000),
    new Bank("Райффайзен Банк", 5000000, 1500000),
    new Bank("Укргазбанк", 7000000, 1800000),
    new Bank("Креді Агриколь Банк", 3000000, 900000),
    new Bank("ПУМБ", 4000000, 1200000),
    new Bank("Сенс Банк", 2500000, 800000)
];