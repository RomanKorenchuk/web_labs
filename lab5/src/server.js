const express = require('express');
const cors = require('cors');
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));  // Тепер правильно - після створення app

// Початкові дані
let banks = [
    { id: 1, name: "ПриватБанк", clients: 15000000, loans: 5000000 },
    { id: 2, name: "Ощадбанк", clients: 12000000, loans: 3500000 },
    { id: 3, name: "Укрексімбанк", clients: 8000000, loans: 2000000 },
    { id: 4, name: "Райффайзен Банк", clients: 5000000, loans: 1500000 },
    { id: 5, name: "Укргазбанк", clients: 7000000, loans: 1800000 },
    { id: 6, name: "Креді Агриколь Банк", clients: 3000000, loans: 900000 },
    { id: 7, name: "ПУМБ", clients: 4000000, loans: 1200000 },
    { id: 8, name: "Сенс Банк", clients: 2500000, loans: 800000 }
];

// GET - отримати всі банки (з підтримкою пошуку та сортування)
app.get('/api/banks', (req, res) => {
    let result = [...banks];
    
    // Пошук за назвою
    const search = req.query.search;
    if (search) {
        result = result.filter(bank => 
            bank.name.toLowerCase().includes(search.toLowerCase())
        );
    }
    
    // Сортування
    const sortBy = req.query.sortBy;
    if (sortBy) {
        switch(sortBy) {
            case 'name':
                result.sort((a, b) => a.name.localeCompare(b.name));
                break;
            case 'clients':
                result.sort((a, b) => b.clients - a.clients);
                break;
            case 'loans':
                result.sort((a, b) => b.loans - a.loans);
                break;
        }
    }
    
    res.json(result);
});

// GET - отримати один банк
app.get('/api/banks/:id', (req, res) => {
    const bank = banks.find(b => b.id === parseInt(req.params.id));
    if (!bank) return res.status(404).json({ error: 'Банк не знайдено' });
    res.json(bank);
});

// POST - створити банк
app.post('/api/banks', (req, res) => {
    const newBank = {
        id: banks.length > 0 ? Math.max(...banks.map(b => b.id)) + 1 : 1,
        name: req.body.name,
        clients: req.body.clients,
        loans: req.body.loans
    };
    banks.push(newBank);
    res.status(201).json(newBank);
});

// PUT - оновити банк
app.put('/api/banks/:id', (req, res) => {
    const bankIndex = banks.findIndex(b => b.id === parseInt(req.params.id));
    if (bankIndex === -1) return res.status(404).json({ error: 'Банк не знайдено' });
    
    banks[bankIndex] = {
        ...banks[bankIndex],
        name: req.body.name,
        clients: req.body.clients,
        loans: req.body.loans
    };
    
    res.json(banks[bankIndex]);
});

// DELETE - видалити банк
app.delete('/api/banks/:id', (req, res) => {
    const bankIndex = banks.findIndex(b => b.id === parseInt(req.params.id));
    if (bankIndex === -1) return res.status(404).json({ error: 'Банк не знайдено' });
    
    const deletedBank = banks.splice(bankIndex, 1)[0];
    res.json({ message: 'Банк видалено', bank: deletedBank });
});

app.listen(3000, () => {
    console.log('🚀 Сервер запущено на http://localhost:3000');
    console.log('📊 API доступне за: http://localhost:3000/api/banks');
    console.log('🔍 Параметри пошуку: ?search=назва');
    console.log('📈 Параметри сортування: ?sortBy=name|clients|loans');
});