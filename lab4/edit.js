document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('editBankForm');
    const modal = document.getElementById('modal');
    const modalTitle = document.getElementById('modalTitle');
    const modalMessage = document.getElementById('modalMessage');
    const modalOk = document.getElementById('modalOk');
    const closeBtn = document.querySelector('.close');

    // Отримання індексу банку з URL
    const urlParams = new URLSearchParams(window.location.search);
    const bankIndex = parseInt(urlParams.get('index'));
    const banks = getBanks();

    // Перевірка коректності індексу
    if (isNaN(bankIndex) || bankIndex < 0 || bankIndex >= banks.length) {
        showModal('Помилка', 'Невірний банк для редагування', 'error');
        return;
    }

    // Заповнення форми даними банку
    const bank = banks[bankIndex];
    document.getElementById('editBankIndex').value = bankIndex;
    document.getElementById('editBankName').value = bank.name;
    document.getElementById('editClientsCount').value = bank.clients;
    document.getElementById('editLoansCount').value = bank.loans;

    // Функція для показу модального вікна
    function showModal(title, message) {
        modalTitle.textContent = title;
        modalMessage.textContent = message;
        modal.style.display = 'block';
    }

    // Закриття модального вікна
    closeBtn.addEventListener('click', function() {
        modal.style.display = 'none';
    });

    modalOk.addEventListener('click', function() {
        modal.style.display = 'none';
        if (modalTitle.textContent === 'Успіх') {
            window.location.href = 'index.html';
        }
    });

    // Закриття модального вікна при кліку поза ним
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
            if (modalTitle.textContent === 'Успіх') {
                window.location.href = 'index.html';
            }
        }
    });

    // Обробка відправлення форми
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        
        const name = document.getElementById('editBankName').value.trim();
        const clients = parseInt(document.getElementById('editClientsCount').value);
        const loans = parseInt(document.getElementById('editLoansCount').value);

        // Валідація даних
        if (name.length < 2) {
            showModal('Помилка', 'Назва банку повинна містити щонайменше 2 символи', 'error');
            return;
        }

        if (clients < 0 || loans < 0) {
            showModal('Помилка', 'Кількість клієнтів та кредитів не може бути від\'ємною', 'error');
            return;
        }

        if (clients > 100000000 || loans > 100000000) {
            showModal('Помилка', 'Значення занадто великі. Максимальне значення: 100,000,000', 'error');
            return;
        }

        // Оновлення банку
        const updatedBank = new Bank(name, clients, loans);
        const success = updateBank(bankIndex, updatedBank);

        if (success) {
            showModal('Успіх', 'Дані банку успішно оновлено!', 'success');
        } else {
            showModal('Помилка', 'Помилка при оновленні даних', 'error');
        }
    });
});