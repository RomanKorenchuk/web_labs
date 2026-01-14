const bankList = document.getElementById('bankList');
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const sortSelect = document.getElementById('sortSelect');
const sortBtn = document.getElementById('sortBtn');
const totalClients = document.getElementById('totalClients');
const totalLoans = document.getElementById('totalLoans');
const resetBtn = document.getElementById('resetBtn');

function displayBanks(banksArray) {
    bankList.innerHTML = '';
    
    banksArray.forEach((bank, index) => {
        const bankCard = document.createElement('div');
        bankCard.className = 'bank-card';
        bankCard.innerHTML = `
            <button class="edit-btn" onclick="editBank(${index})">Редагувати</button>
            <h3>${bank.name}</h3>
            <p><strong>Клієнти:</strong> ${bank.clients.toLocaleString()}</p>
            <p><strong>Кредити:</strong> ${bank.loans.toLocaleString()}</p>
        `;
        bankList.appendChild(bankCard);
    });
    
    updateStats(banksArray);
}

function editBank(index) {
    window.location.href = `edit.html?index=${index}`;
}

function updateStats(banksArray) {
    const totalClientsCount = banksArray.reduce((sum, bank) => sum + bank.clients, 0);
    const totalLoansCount = banksArray.reduce((sum, bank) => sum + bank.loans, 0);
    
    totalClients.textContent = totalClientsCount.toLocaleString();
    totalLoans.textContent = totalLoansCount.toLocaleString();
}

function searchBanks() {
    const searchTerm = searchInput.value.toLowerCase().trim();
    const banks = getBanks();
    
    let filteredBanks;
    
    if (searchTerm === '') {
        filteredBanks = banks;
    } else {
        filteredBanks = banks.filter(bank => 
            bank.name.toLowerCase().includes(searchTerm)
        );
    }
    
    applySorting(filteredBanks);
}

function sortBanks() {
    const banks = getBanks();
    const searchTerm = searchInput.value.toLowerCase().trim();
    
    let banksToSort;
    
    if (searchTerm === '') {
        banksToSort = banks;
    } else {
        banksToSort = banks.filter(bank => 
            bank.name.toLowerCase().includes(searchTerm)
        );
    }
    
    applySorting(banksToSort);
}

function applySorting(banksArray) {
    const sortBy = sortSelect.value;
    let sortedBanks = [...banksArray];
    
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

displayBanks(getBanks());

function resetData() {
    const shouldReset = confirm('Ви впевнені, що хочете скинути всі дані до початкового стану? Ця дія незворотна.');
    
    if (shouldReset) {
        const initialBanks = resetToInitialData();
        displayBanks(initialBanks);
        alert('Дані успішно скинуті до початкового стану!');
    }
}

resetBtn.addEventListener('click', resetData);
sortSelect.addEventListener('change', sortBanks);
