// Завантажуємо дані користувачів з localStorage або ініціалізуємо порожній об'єкт, якщо вони відсутні
let userData = JSON.parse(localStorage.getItem('userData')) || { users: [] };

// Обробник події для реєстрації
document.getElementById('registerForm')?.addEventListener('submit', function(event) {
    event.preventDefault(); // Запобігаємо перезавантаженню сторінки при відправці форми

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Перевірка, чи існує вже користувач з таким ім'ям
    const userExists = userData.users.some(user => user.username === username);

    if (userExists) {
        alert('Username already exists!'); // Якщо користувач з таким ім'ям уже існує
        return; // Зупиняємо виконання функції
    }

    // Додаємо нового користувача до масиву
    userData.users.push({ username, password });

    // Оновлюємо дані в localStorage
    localStorage.setItem('userData', JSON.stringify(userData));

    alert('Registration successful!'); // Повідомлення про успішну реєстрацію
    console.log(userData);  // Логуємо оновлені дані для перевірки
});

// Обробник події для логіну
document.getElementById('loginForm')?.addEventListener('submit', function(event) {
    event.preventDefault(); // Запобігаємо перезавантаженню сторінки при відправці форми

    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;

    // Перевірка, чи існує користувач з таким ім'ям і паролем
    const user = userData.users.find(user => user.username === username && user.password === password);

    if (user) {
        alert('Login successful!'); // Якщо логін успішний
        console.log('Logged in user:', user);  // Логуємо користувача
        // Перенаправлення або додаткові дії після успішного входу
    } else {
        alert('Invalid username or password!'); // Якщо логін або пароль невірні
    }
});
