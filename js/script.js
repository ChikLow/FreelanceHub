// Функція для отримання збережених акаунтів
function getAccounts() {
    const accounts = localStorage.getItem('accounts');
    return accounts ? JSON.parse(accounts) : [];
}

// Функція для збереження акаунтів
function saveAccounts(accounts) {
    localStorage.setItem('accounts', JSON.stringify(accounts));
}

// Реєстрація нового акаунта
document.getElementById('registerForm')?.addEventListener('submit', (e) => {
    e.preventDefault();

    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();

    if (!username || !password) {
        alert('Username and password are required!');
        return;
    }

    const accounts = getAccounts();

    // Перевірка на існування користувача
    if (accounts.some(account => account.username === username)) {
        alert('Username already exists!');
        return;
    }

    // Додавання нового користувача
    accounts.push({ username, password });
    saveAccounts(accounts);

    alert('Account registered successfully!');
    window.location.href = 'log_in.html';
});

// Авторизація користувача
document.getElementById('loginForm')?.addEventListener('submit', (e) => {
    e.preventDefault();

    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();

    if (!username || !password) {
        alert('Username and password are required!');
        return;
    }

    const accounts = getAccounts();

    // Перевірка на відповідність даних
    const user = accounts.find(account => account.username === username && account.password === password);

    if (user) {
        alert('Login successful!');
        window.location.href = 'index.html'; // Перенаправлення на головну сторінку
    } else {
        alert('Invalid username or password!');
    }
});
