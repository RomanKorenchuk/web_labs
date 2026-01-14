const bankList = document.getElementById('bankList');
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const sortSelect = document.getElementById('sortSelect');
const sortBtn = document.getElementById('sortBtn');
const totalClients = document.getElementById('totalClients');
const totalLoans = document.getElementById('totalLoans');
const resetBtn = document.getElementById('resetBtn');

// Глобальна змінна для банків
let banks = [];

// Функція для відображення банків
function displayBanks(banksArray = banks) {
    bankList.innerHTML = '';
    
    banksArray.forEach((bank) => {
        const bankCard = document.createElement('div');
        bankCard.className = 'bank-card';
        bankCard.innerHTML = `
            <h3>${bank.name}</h3>
            <p><strong>Клієнти:</strong> ${bank.clients.toLocaleString()}</p>
            <p><strong>Кредити:</strong> ${bank.loans.toLocaleString()}</p>
            <div class="bank-actions">
                <button class="edit-btn" onclick="editBank(${bank.id})">Редагувати</button>
                <button class="delete-btn" onclick="deleteBank(${bank.id}, '${bank.name}')">🗑️ Видалити</button>
            </div>
        `;
        bankList.appendChild(bankCard);
    });
    
    updateStats(banksArray);
}

// Функція для редагування банку
function editBank(id) {
    console.log('Перехід до редагування банку з ID:', id);
    window.location.href = `edit.html?id=${id}`;
}

// Функція для видалення банку
async function deleteBank(id, bankName) {
    const shouldDelete = confirm(`Ви впевнені, що хочете видалити банк "${bankName}"?`);
    
    if (shouldDelete) {
        try {
            await deleteBankFromAPI(id);
            // Оновлюємо список банків
            await loadBanksFromAPI();
            alert('Банк успішно видалено!');
        } catch (error) {
            alert('Помилка: ' + error.message);
        }
    }
}

// Функція для видалення через API
async function deleteBankFromAPI(id) {
    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'DELETE'
        });
        
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Помилка видалення банку');
        }
        
        await response.json();
        return true;
    } catch (error) {
        console.error('Помилка:', error);
        throw error;
    }
}

// Функція для оновлення статистики
function updateStats(banksArray) {
    const totalClientsCount = banksArray.reduce((sum, bank) => sum + bank.clients, 0);
    const totalLoansCount = banksArray.reduce((sum, bank) => sum + bank.loans, 0);
    
    totalClients.textContent = totalClientsCount.toLocaleString();
    totalLoans.textContent = totalLoansCount.toLocaleString();
}

// Функція пошуку банків
async function searchBanks() {
    const searchTerm = searchInput.value.trim();
    const sortBy = sortSelect.value;
    
    try {
        // Створюємо параметри запиту
        const params = new URLSearchParams();
        if (searchTerm) {
            params.append('search', searchTerm);
        }
        if (sortBy) {
            params.append('sortBy', sortBy);
        }
        
        const url = `${API_URL}?${params.toString()}`;
        console.log('🔍 Запит до API:', url);
        
        const response = await fetch(url);
        
        if (!response.ok) {
            throw new Error(`Помилка сервера: ${response.status}`);
        }
        
        const filteredBanks = await response.json();
        const banksData = filteredBanks.map(bank => new Bank(bank.name, bank.clients, bank.loans, bank.id));
        
        displayBanks(banksData);
    } catch (error) {
        console.error('Помилка пошуку:', error);
        alert('Не вдалося виконати пошук: ' + error.message);
    }
}

// Функція сортування
async function sortBanks() {
    const searchTerm = searchInput.value.trim();
    const sortBy = sortSelect.value;
    
    try {
        // Створюємо параметри запиту
        const params = new URLSearchParams();
        if (searchTerm) {
            params.append('search', searchTerm);
        }
        if (sortBy) {
            params.append('sortBy', sortBy);
        }
        
        const url = `${API_URL}?${params.toString()}`;
        console.log('📈 Запит до API:', url);
        
        const response = await fetch(url);
        
        if (!response.ok) {
            throw new Error(`Помилка сервера: ${response.status}`);
        }
        
        const sortedBanks = await response.json();
        const banksData = sortedBanks.map(bank => new Bank(bank.name, bank.clients, bank.loans, bank.id));
        
        displayBanks(banksData);
    } catch (error) {
        console.error('Помилка сортування:', error);
        alert('Не вдалося відсортувати дані: ' + error.message);
    }
}

// Функція для скидання даних до початкового стану
async function resetToInitialData() {
    const shouldReset = confirm('Ви впевнені, що хочете скинути всі дані до початкового стану? Ця дія незворотна.');
    
    if (shouldReset) {
        try {
            // Отримуємо поточні банки
            const currentBanks = await getBanks();
            
            // Видаляємо всі банки по черзі
            for (const bank of currentBanks) {
                await deleteBankFromAPI(bank.id);
            }
            
            // Додаємо початкові банки
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
            
            for (const bank of initialBanks) {
                await addBank(bank);
            }
            
            // Оновлюємо відображення
            await loadBanksFromAPI();
            alert('Дані успішно скинуті до початкового стану!');
            
        } catch (error) {
            alert('Помилка: ' + error.message);
        }
    }
}

// Функція для завантаження банків з API
async function loadBanksFromAPI() {
    try {
        banks = await getBanks();
        displayBanks();
    } catch (error) {
        alert('Не вдалося завантажити дані: ' + error.message);
    }
}

// Обробники подій
searchBtn.addEventListener('click', searchBanks);
sortBtn.addEventListener('click', sortBanks);
searchInput.addEventListener('input', searchBanks);
sortSelect.addEventListener('change', sortBanks);

// Початкове відображення банків при завантаженні сторінки
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Завантаження головної сторінки...');
    
    // Додаємо обробник для кнопки скидання
    if (resetBtn) {
        resetBtn.addEventListener('click', resetToInitialData);
    }
    
    // Завантажуємо банки з API
    loadBanksFromAPI();
});