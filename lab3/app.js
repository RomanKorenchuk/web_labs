const bankList = document.getElementById('bankList');
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const sortSelect = document.getElementById('sortSelect');
const sortBtn = document.getElementById('sortBtn');
const totalClients = document.getElementById('totalClients');
const totalLoans = document.getElementById('totalLoans');

function displayBanks(banksArray) {
    bankList.innerHTML = '';
    
    banksArray.forEach(bank => {
        const bankCard = document.createElement('div');
        bankCard.className = 'bank-card';
        bankCard.innerHTML = `
            <h3>${bank.name}</h3>
            <p><strong>Клієнти:</strong> ${bank.clients.toLocaleString()}</p>
            <p><strong>Кредити:</strong> ${bank.loans.toLocaleString()}</p>
        `;
        bankList.appendChild(bankCard);
    });
    
    updateStats(banksArray);
}

function updateStats(banksArray) {
    const totalClientsCount = banksArray.reduce((sum, bank) => sum + bank.clients, 0);
    const totalLoansCount = banksArray.reduce((sum, bank) => sum + bank.loans, 0);
    
    totalClients.textContent = totalClientsCount.toLocaleString();
    totalLoans.textContent = totalLoansCount.toLocaleString();
}

function searchBanks() {
    const searchTerm = searchInput.value.toLowerCase().trim();
    
    if (searchTerm === '') {
        displayBanks(banks);
        return;
    }
    
    const filteredBanks = banks.filter(bank => 
        bank.name.toLowerCase().includes(searchTerm)
    );
    
    displayBanks(filteredBanks);
}

function sortBanks() {
    const sortBy = sortSelect.value;
    let sortedBanks = [...banks];
    
    switch(sortBy) {
        case 'name':
            sortedBanks.sort((a, b) => a.name.localeCompare(b.name));
            break;
        case 'clients':
            sortedBanks.sort((a, b) => b.clients - a.clients);
            break;
        case 'loans':
            sortedBanks.sort((a, b) => b.loans - a.loans);
            break;
    }
    
    displayBanks(sortedBanks);
}

searchBtn.addEventListener('click', searchBanks);
sortBtn.addEventListener('click', sortBanks);

searchInput.addEventListener('keyup', (event) => {
    if (event.key === 'Enter') {
        searchBanks();
    }
});

displayBanks(banks);