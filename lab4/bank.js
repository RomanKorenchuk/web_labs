class Bank {
    constructor(name, clients, loans) {
        this.name = name;
        this.clients = clients;
        this.loans = loans;
    }
}

// Функції для роботи з даними
function getBanks() {
    const banksData = localStorage.getItem('banks');
    if (banksData) {
        return JSON.parse(banksData);
    }
    
    // Початкові дані, якщо в localStorage немає
    const initialBanks = [
        new Bank("ПриватБанк", 15000000, 5000000),
        new Bank("Ощадбанк", 12000000, 3500000),
        new Bank("Укрексімбанк", 8000000, 2000000),
        new Bank("Райффайзен Банк", 5000000, 1500000),
        new Bank("Укргазбанк", 7000000, 1800000),
        new Bank("Креді Агриколь Банк", 3000000, 900000),
        new Bank("ПУМБ", 4000000, 1200000),
        new Bank("Сенс Банк", 2500000, 800000)
    ];
    saveBanks(initialBanks);
    return initialBanks;
}

function saveBanks(banks) {
    localStorage.setItem('banks', JSON.stringify(banks));
}

function addBank(newBank) {
    const banks = getBanks();
    banks.push(newBank);
    saveBanks(banks);
    return banks;
}

function updateBank(index, updatedBank) {
    const banks = getBanks();
    if (index >= 0 && index < banks.length) {
        banks[index] = updatedBank;
        saveBanks(banks);
        return true;
    }
    return false;
}

function resetToInitialData() {
    const initialBanks = [
        new Bank("ПриватБанк", 15000000, 5000000),
        new Bank("Ощадбанк", 12000000, 3500000),
        new Bank("Укрексімбанк", 8000000, 2000000),
        new Bank("Райффайзен Банк", 5000000, 1500000),
        new Bank("Укргазбанк", 7000000, 1800000),
        new Bank("Креді Агриколь Банк", 3000000, 900000),
        new Bank("ПУМБ", 4000000, 1200000),
        new Bank("Сенс Банк", 2500000, 800000)
    ];
    saveBanks(initialBanks);
    return initialBanks;
}