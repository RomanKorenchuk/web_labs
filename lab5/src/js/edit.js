document.addEventListener('DOMContentLoaded', async function() {
    const form = document.getElementById('editBankForm');
    
    // Отримання ID банку з URL
    const urlParams = new URLSearchParams(window.location.search);
    const bankId = parseInt(urlParams.get('id'));

    console.log('🔄 Отримано ID банку:', bankId);

    // Перевірка коректності ID
    if (isNaN(bankId)) {
        alert('Невірний банк для редагування');
        window.location.href = 'index.html';
        return;
    }

    try {
        console.log('📥 Завантаження даних банку...');
        
        // Завантажуємо дані банку з API
        const bank = await getBankById(bankId);
        console.log('✅ Отримано дані банку:', bank);
        
        // Заповнюємо форму даними
        document.getElementById('editBankId').value = bank.id;
        document.getElementById('editBankName').value = bank.name;
        document.getElementById('editClientsCount').value = bank.clients;
        document.getElementById('editLoansCount').value = bank.loans;
        
        console.log('✅ Форма заповнена даними');
        
    } catch (error) {
        console.error('❌ Помилка завантаження даних:', error);
        alert('Не вдалося завантажити дані банку: ' + error.message);
        window.location.href = 'index.html';
        return;
    }

    // Обробка відправлення форми
    form.addEventListener('submit', async function(event) {
        event.preventDefault();
        
        console.log('🔄 Відправлення форми...');
        
        const name = document.getElementById('editBankName').value.trim();
        const clients = parseInt(document.getElementById('editClientsCount').value);
        const loans = parseInt(document.getElementById('editLoansCount').value);
        const id = parseInt(document.getElementById('editBankId').value);

        console.log('📋 Дані форми:', { name, clients, loans, id });

        // Валідація даних
        if (name.length < 2) {
            alert('Назва банку повинна містити щонайменше 2 символи');
            return;
        }

        if (isNaN(clients) || isNaN(loans) || clients < 0 || loans < 0) {
            alert('Кількість клієнтів та кредитів має бути додатнім числом');
            return;
        }

        try {
            console.log('🔄 Оновлення банку через API...');
            
            // Оновлення банку через API
            const updatedBank = new Bank(name, clients, loans, id);
            await updateBank(id, updatedBank);

            alert('Дані банку успішно оновлено!');
            window.location.href = 'index.html';
            
        } catch (error) {
            console.error('❌ Помилка оновлення:', error);
            // Більш інформативне повідомлення про помилку
            if (error.message.includes('Серверна помилка')) {
                alert('Помилка сервера. Перевірте, чи запущений сервер на localhost:3000');
            } else {
                alert('Не вдалося оновити дані банку: ' + error.message);
            }
        }
    });
});