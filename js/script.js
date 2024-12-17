// Оголошуємо асинхронну функцію для отримання продуктів з сервера
async function getProducts() {
    // Виконуємо запит до файлу "store_db.json" та очікуємо на відповідь
    let response = await fetch("db.json")
    // Очікуємо на отримання та розпакування JSON-даних з відповіді
    let products = await response.json()
    // Повертаємо отримані продукти
    return products
    };
    
let product_list = document.querySelector(".product-list")

function getCard(product){
    return `
    <div class="card" style="width: 18rem;">
                <img src="img/${product.img}" class="card-img-top" alt="...">
                <div class="card-body">
                  <h5 class="card-title">${product.title}</h5>
                  <p class="card-text">price:${product.price}</p>
                  <p class="card-text">${product.description}</p>
                  <a href="#" class="btn btn-primary">Go somewhere</a>
                </div>
              </div>
    `
}

getProducts().then(function(products) {
    products.forEach(function(product) {
    product_list.innerHTML+=getCard(product);
    })
})