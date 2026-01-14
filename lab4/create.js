document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('createBankForm');
    const modal = document.getElementById('modal');
    const modalTitle = document.getElementById('modalTitle');
    const modalMessage = document.getElementById('modalMessage');
    const modalOk = document.getElementById('modalOk');
    const closeBtn = document.querySelector('.close');

    // Функція для показу модального вікна
    function showModal(title, message, type = 'info') {
        modalTitle.textContent = title;
        modalMessage.textContent = message;
        modal.className = 'modal ' + type;
        modal.style.display = 'block';
    }

    // Закриття модального вікна
    closeBtn.addEventListener('click', function() {
        modal.style.display = 'none';
    });

    modalOk.addEventListener('click', function() {
        modal.style.display = 'none';
    });

    // Закриття модального вікна при кліку поза ним
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });

    // Обробка відправлення форми
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        
        const name = document.getElementById('bankName').value.trim();
        const clients = parseInt(document.getElementById('clientsCount').value);
        const loans = parseInt(document.getElementById('loansCount').value);

        // Валідація даних
        if (name.length < 2) {
            showModal('Помилка', 'Назва банку повинна містити щонайменше 2 символи');
            return;
        }

        if (clients < 0 || loans < 0) {
            showModal('Помилка', 'Кількість клієнтів та кредитів не може бути від\'ємною');
            return;
        }

        if (clients > 100000000 || loans > 100000000) {
            showModal('Помилка', 'Значення занадто великі. Максимальне значення: 100,000,000');
            return;
        }

        // Створення нового банку
        const newBank = new Bank(name, clients, loans);
        addBank(newBank);

        showModal('Успіх', 'Банк успішно створено!');
        
        // Очищення форми
        form.reset();
    });
});