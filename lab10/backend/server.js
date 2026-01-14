const express = require('express');
const cors = require('cors');
// uuid нам тут не критичний для читання даних, але залишимо для сумісності
const { v4: uuidv4 } = require('uuid');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// Логування всіх запитів (щоб ти бачив у терміналі, що відбувається)
app.use((req, res, next) => {
  console.log(`📡 [${new Date().toLocaleTimeString()}] ${req.method} ${req.originalUrl}`);
  next();
});

// === ДАНІ (MOCK DATA) ===
const banks = [
  {
    id: 1,
    name: "ПриватБанк",
    clients: 20500000,
    loansIssued: 1580000,
    established: 1992,
    rating: 4.8,
    score: 98,
    logo: "🏦",
    description: "Найбільший роздрібний банк України з найширшою мережею відділень",
    products: ["споживчі кредити", "іпотека", "автокредити", "кредитні картки", "депозити", "страхування", "мобільний банкінг"],
    website: "https://privatbank.ua",
    phone: "3700"
  },
  {
    id: 2,
    name: "Ощадбанк",
    clients: 18200000,
    loansIssued: 1250000,
    established: 1991,
    rating: 4.6,
    score: 95,
    logo: "🏛️",
    description: "Державний ощадний банк з найбільшою філіальною мережею",
    products: ["споживчі кредити", "іпотека", "пенсійні рахунки", "молодіжні програми", "соціальні кредити", "держпрограми"],
    website: "https://www.oschadbank.ua",
    phone: "0-800-210-800"
  },
  {
    id: 3,
    name: "Укрексімбанк",
    clients: 850000,
    loansIssued: 620000,
    established: 1992,
    rating: 4.7,
    score: 92,
    logo: "🌍",
    description: "Державний експортно-імпортний банк України",
    products: ["експортні кредити", "гарантії", "міжнародні розрахунки", "валютні операції", "торгове фінансування"],
    website: "https://www.eximb.com",
    phone: "0-800-300-590"
  },
  {
    id: 4,
    name: "Райффайзен Банк",
    clients: 1200000,
    loansIssued: 890000,
    established: 1992,
    rating: 4.5,
    score: 88,
    logo: "🇦🇹",
    description: "Міжнародний банк з європейськими стандартами обслуговування",
    products: ["кредити для бізнесу", "інвестиції", "корпоративні рішення", "private banking", "міжнародні операції"],
    website: "https://www.raiffeisen.ua",
    phone: "0-800-500-500"
  },
  {
    id: 5,
    name: "УКРГАЗБАНК",
    clients: 950000,
    loansIssued: 720000,
    established: 1993,
    rating: 4.3,
    score: 85,
    logo: "⛽",
    description: "Універсальний комерційний банк з державною участю",
    products: ["енергетичні кредити", "корпоративні кредити", "розрахунково-касове обслуговування", "депозити", "гарантії"],
    website: "https://www.ukrgasbank.com",
    phone: "0-800-300-330"
  },
  {
    id: 6,
    name: "Креді Агріколь Банк",
    clients: 780000,
    loansIssued: 580000,
    established: 1994,
    rating: 4.4,
    score: 87,
    logo: "🌾",
    description: "Французький банк з акцентом на агробізнес та міжнародні операції",
    products: ["агрокредити", "фермерські програми", "зелені кредити", "міжнародне фінансування", "експортні операції"],
    website: "https://credit-agricole.ua",
    phone: "0-800-500-085"
  },
  {
    id: 7,
    name: "УКРСИББАНК",
    clients: 650000,
    loansIssued: 450000,
    established: 1990,
    rating: 4.2,
    score: 83,
    logo: "🏢",
    description: "Універсальний комерційний банк з іноземним капіталом",
    products: ["корпоративні кредити", "роздрібні кредити", "депозити", "карткові продукти", "інвестиції"],
    website: "https://www.ukrsibbank.com",
    phone: "0-800-300-230"
  },
  {
    id: 8,
    name: "ПУМБ",
    clients: 550000,
    loansIssued: 380000,
    established: 1991,
    rating: 4.1,
    score: 80,
    logo: "💼",
    description: "Універсальний комерційний банк для бізнесу та приватних клієнтів",
    products: ["бізнес-кредити", "роздрібні кредити", "депозити", "рахункове обслуговування", "міжнародні операції"],
    website: "https://www.pumb.ua",
    phone: "0-800-500-500"
  }
];

const loanProducts = [
  {
    id: 1,
    name: "Споживчий кредит 'На мрію'",
    bankId: 1,
    bankName: "ПриватБанк",
    interestRate: 15.5,
    maxAmount: 500000,
    term: "до 5 років",
    category: "consumer",
    image: "💰",
    description: "Кредит на будь-які потреби з мінімальними документами та швидким рішенням",
    features: ["Без застави", "Мінімум документів", "Онлайн-оформлення", "Гроші за 1 день", "Страхування"],
    inStock: true,
    popularity: 95
  },
  {
    id: 2,
    name: "Іпотека 'Молода сім'я'",
    bankId: 2,
    bankName: "Ощадбанк", 
    interestRate: 12.0,
    maxAmount: 5000000,
    term: "до 20 років",
    category: "mortgage",
    image: "🏠",
    description: "Іпотечний кредит з державною підтримкою для молодих сімей",
    features: ["Молода сім'я", "Стабільна ставка", "Страхування", "Відстрочка платежу", "Держпідтримка"],
    inStock: true,
    popularity: 92
  },
  {
    id: 3,
    name: "Автокредит 'Комфорт+'",
    bankId: 1,
    bankName: "ПриватБанк",
    interestRate: 13.5,
    maxAmount: 1000000,
    term: "до 7 років",
    category: "auto",
    image: "🚗",
    description: "Кредит на купівлю нового або вживаного авто зі страхуванням КАСКО",
    features: ["Перший внесок 20%", "Страхування КАСКО", "Швидке схвалення", "Обслуговування авто", "Гарантія"],
    inStock: true,
    popularity: 88
  },
  {
    id: 4,
    name: "Кредитна картка 'Platinum'", 
    bankId: 4,
    bankName: "Райффайзен Банк",
    interestRate: 28.0,
    maxAmount: 100000,
    term: "безстроково",
    category: "cards",
    image: "💳",
    description: "Преміальна кредитна картка з кешбеком та пріоритетним обслуговуванням",
    features: ["Кешбек 5%", "Ліміт 100 000 грн", "Безкоштовне обслуговування", "Мобільний банкінг", "Страхування"],
    inStock: true,
    popularity: 85
  },
  {
    id: 5,
    name: "Бізнес-кредит 'Стартап'",
    bankId: 4,
    bankName: "Райффайзен Банк",
    interestRate: 16.0,
    maxAmount: 2000000,
    term: "до 5 років",
    category: "business",
    image: "💼",
    description: "Фінансування для малого та середнього бізнесу на розвиток",
    features: ["Для бізнесу", "Інвестиції в обладнання", "Консультації", "Гнучкий графік", "Менторство"],
    inStock: true,
    popularity: 82
  },
  {
    id: 6,
    name: "Експортний кредит 'Global'",
    bankId: 3,
    bankName: "Укрексімбанк",
    interestRate: 10.5,
    maxAmount: 10000000,
    term: "до 7 років",
    category: "business",
    image: "📦",
    description: "Кредит для експортних операцій з державними гарантіями",
    features: ["Льготні умови", "Держгарантії", "Консультації", "Валютне обслуговування", "Страхування"],
    inStock: true,
    popularity: 90
  },
  {
    id: 7,
    name: "Агрокредит 'Урожай'",
    bankId: 6,
    bankName: "Креді Агріколь Банк",
    interestRate: 11.0,
    maxAmount: 3000000,
    term: "до 10 років",
    category: "agriculture",
    image: "🚜",
    description: "Спеціальна програма фінансування для аграрного сектору",
    features: ["Сезонне фінансування", "Льготні умови", "Агроконсультації", "Страхування врожаю", "Техніка"],
    inStock: true,
    popularity: 87
  },
  {
    id: 8,
    name: "Освітній кредит 'Майбутнє'",
    bankId: 2,
    bankName: "Ощадбанк",
    interestRate: 8.5,
    maxAmount: 300000,
    term: "до 10 років",
    category: "education",
    image: "🎓",
    description: "Кредит на навчання в Україні та за кордоном з державною підтримкою",
    features: ["Пільговий період", "Держпідтримка", "Для студентів", "Відстрочка на навчанні", "Стажування"],
    inStock: true,
    popularity: 89
  }
];

const categories = [
  { id: 1, name: "consumer", displayName: "Споживчі кредити" },
  { id: 2, name: "mortgage", displayName: "Іпотечні кредити" },
  { id: 3, name: "auto", displayName: "Автокредити" },
  { id: 4, name: "business", displayName: "Бізнес-кредити" }
];

// ========== МАРШРУТИ ==========

// Отримати всі банки (Базовий список)
app.get('/api/banks', (req, res) => {
  res.json(banks);
});

// ПОШУК БАНКІВ (Ось тут була можлива проблема, ми її фіксимо)
app.get('/api/banks/search', (req, res) => {
  try {
    const { q, minRating, sortBy } = req.query;
    console.log('🔍 Отримано запит на пошук банків:', req.query);

    let results = [...banks];
    
    // 1. Пошук за текстом
    if (q) {
      const searchTerm = q.toLowerCase().trim();
      results = results.filter(bank => 
        bank.name.toLowerCase().includes(searchTerm) // Тільки name!
      );
    }
    
    // 2. Фільтрація за рейтингом
    if (minRating) {
      const min = parseFloat(minRating);
      if (!isNaN(min)) {
        results = results.filter(bank => bank.rating >= min);
      }
    }
    
    // 3. Сортування
    if (sortBy) {
      switch(sortBy) {
        case 'rating':
          results.sort((a, b) => b.rating - a.rating);
          break;
        case 'name':
          results.sort((a, b) => a.name.localeCompare(b.name));
          break;
        case 'clients':
          results.sort((a, b) => b.clients - a.clients);
          break;
        case 'loans':
          results.sort((a, b) => b.loansIssued - a.loansIssued);
          break;
      }
    }
    
    console.log(`✅ Знайдено банків: ${results.length}`);
    res.json(results);

  } catch (error) {
    console.error('❌ Помилка при пошуку банків:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// ПОШУК КРЕДИТІВ
app.get('/api/loans/search', (req, res) => {
  try {
    const { q, category, sortBy } = req.query;
    console.log('🔍 Отримано запит на пошук кредитів:', req.query);

    let results = [...loanProducts];
    
    // 1. Пошук за текстом
    if (q) {
      const searchTerm = q.toLowerCase().trim();
      results = results.filter(loan => 
        loan.name.toLowerCase().includes(searchTerm)
      );
    }
    
    // 2. Фільтрація за категорією
    if (category && category !== 'all') {
      results = results.filter(loan => loan.category === category);
    }
    
    // 3. Сортування
    if (sortBy) {
      switch(sortBy) {
        case 'rate':
          results.sort((a, b) => a.interestRate - b.interestRate);
          break;
        case 'name':
          results.sort((a, b) => a.name.localeCompare(b.name));
          break;
        case 'popularity':
          results.sort((a, b) => b.popularity - a.popularity);
          break;
        case 'amount':
          results.sort((a, b) => b.maxAmount - a.maxAmount);
          break;
      }
    }
    
    console.log(`✅ Знайдено кредитів: ${results.length}`);
    res.json(results);

  } catch (error) {
    console.error('❌ Помилка при пошуку кредитів:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Отримати банк по ID
app.get('/api/banks/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const bank = banks.find(b => b.id === id);
  if (!bank) return res.status(404).json({ message: 'Bank not found' });
  res.json(bank);
});

// Отримати кредити конкретного банку
app.get('/api/banks/:id/loans', (req, res) => {
  const bankId = parseInt(req.params.id);
  const bankLoans = loanProducts.filter(loan => loan.bankId === bankId);
  res.json(bankLoans);
});

// Отримати всі кредити
app.get('/api/loans', (req, res) => {
  res.json(loanProducts);
});

// Отримати кредит по ID
app.get('/api/loans/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const loan = loanProducts.find(l => l.id === id);
  if (!loan) return res.status(404).json({ message: 'Loan not found' });
  res.json(loan);
});

// Отримати категорії
app.get('/api/categories', (req, res) => {
  res.json(categories);
});

// Отримати топ банки
app.get('/api/top-banks', (req, res) => {
  const topBanks = [...banks].sort((a, b) => b.rating - a.rating).slice(0, 3);
  res.json(topBanks);
});

// Отримати топ кредити
app.get('/api/top-loans', (req, res) => {
  const topLoans = [...loanProducts].sort((a, b) => a.interestRate - b.interestRate).slice(0, 3);
  res.json(topLoans);
});

// Запуск сервера
app.listen(PORT, () => {
  console.log(`\n🚀 СЕРВЕР ЗАПУЩЕНО НА ПОРТУ ${PORT}`);
  console.log(`👉 Backend URL: http://localhost:${PORT}`);
  console.log(`📝 Готовий приймати запити...\n`);
});