const API_URL = 'http://localhost:3000/api/banks';

// Клас Банк
class Bank {
    constructor(name, clients, loans, id = null) {
        this.id = id;
        this.name = name;
        this.clients = clients;
        this.loans = loans;
    }
}

// GET - отримати всі банки (з підтримкою параметрів)
async function getBanks(search = '', sortBy = '') {
    try {
        console.log('📡 Запит до API для отримання банків');
        
        // Створюємо параметри запиту
        const params = new URLSearchParams();
        if (search) {
            params.append('search', search);
        }
        if (sortBy) {
            params.append('sortBy', sortBy);
        }
        
        const url = params.toString() ? `${API_URL}?${params.toString()}` : API_URL;
        console.log('🔗 URL запиту:', url);
        
        const response = await fetch(url);
        
        if (!response.ok) {
            throw new Error(`Помилка сервера: ${response.status}`);
        }
        
        const banksData = await response.json();
        console.log(`✅ Отримано ${banksData.length} банків`);
        
        return banksData.map(bank => new Bank(bank.name, bank.clients, bank.loans, bank.id));
    } catch (error) {
        console.error('❌ Помилка отримання банків:', error);
        alert('Не вдалося завантажити дані банків. Перевірте, чи запущений сервер.');
        return [];
    }
}

// GET - отримати банк по ID
async function getBankById(id) {
    try {
        console.log(`📡 Запит банку з ID: ${id}`);
        const response = await fetch(`${API_URL}/${id}`);
        
        if (!response.ok) {
            if (response.status === 404) {
                throw new Error('Банк не знайдено');
            }
            throw new Error(`Помилка сервера: ${response.status}`);
        }
        
        const bankData = await response.json();
        return new Bank(bankData.name, bankData.clients, bankData.loans, bankData.id);
    } catch (error) {
        console.error('❌ Помилка отримання банку:', error);
        throw error;
    }
}

// POST - створити банк
async function addBank(newBank) {
    try {
        console.log('📡 Створення нового банку:', newBank.name);
        
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: newBank.name,
                clients: newBank.clients,
                loans: newBank.loans
            })
        });
        
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Помилка створення банку');
        }
        
        const createdBank = await response.json();
        console.log('✅ Банк успішно створено:', createdBank.name);
        
        return new Bank(createdBank.name, createdBank.clients, createdBank.loans, createdBank.id);
    } catch (error) {
        console.error('❌ Помилка створення банку:', error);
        throw error;
    }
}

// PUT - оновити банк
async function updateBank(id, updatedBank) {
    try {
        console.log(`📡 Оновлення банку з ID: ${id}`);
        
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: updatedBank.name,
                clients: updatedBank.clients,
                loans: updatedBank.loans
            })
        });
        
        // Перевіряємо Content-Type перед парсингом JSON
        const contentType = response.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
            const text = await response.text();
            console.error('❌ Сервер повернув не JSON:', text.substring(0, 100));
            throw new Error('Серверна помилка: очікувався JSON відповідь');
        }
        
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Помилка оновлення банку');
        }
        
        const bankData = await response.json();
        console.log('✅ Банк успішно оновлено:', bankData.name);
        
        return new Bank(bankData.name, bankData.clients, bankData.loans, bankData.id);
    } catch (error) {
        console.error('❌ Помилка оновлення банку:', error);
        throw error;
    }
}

// DELETE - видалити банк
async function deleteBank(id) {
    try {
        console.log(`📡 Видалення банку з ID: ${id}`);
        
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'DELETE'
        });
        
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Помилка видалення банку');
        }
        
        await response.json();
        console.log('✅ Банк успішно видалено');
        
        return true;
    } catch (error) {
        console.error('❌ Помилка видалення банку:', error);
        throw error;
    }
}