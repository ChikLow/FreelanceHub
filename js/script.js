// Оголошуємо асинхронну функцію для отримання продуктів з сервера
async function getProducts() {
  // Виконуємо запит до файлу "store_db.json" та очікуємо на відповідь
  let response = await fetch("db.json")
  // Очікуємо на отримання та розпакування JSON-даних з відповіді
  let products = await response.json()
  // Повертаємо отримані продукти
  return products
};

// Функція для отримання значення кукі за ім'ям
function getCookieValue(cookieName) {
  // Розділяємо всі куки на окремі частини
  const cookies = document.cookie.split(';')
  // Шукаємо куки з вказаним ім'ям
  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i].trim() // Видаляємо зайві пробіли
    // Перевіряємо, чи починається поточне кукі з шуканого імені
    if (cookie.startsWith(cookieName + '=')) {
      // Якщо так, повертаємо значення кукі
      return cookie.substring(cookieName.length + 1) // +1 для пропуску "="
    }
  }
  // Якщо кукі з вказаним іменем не знайдено, повертаємо порожній рядок 
  return ''
}


let product_list = document.querySelector(".product-list")

function getCard(product) {
  return `
    <div class="card" style="width: 95%;">
                <img src="${product.img}" class="card-img-top" alt="...">
                <div class="card-body">
                  <h5 class="card-title">${product.title}</h5>
                  <p class="card-text">price:${product.price}</p>
                  <p class="card-text">${product.description}</p>
                  <button class="btn btn-primary add-cart-btn" data-product='${JSON.stringify(product)}'>Go somewhere</button>
                </div>
              </div>
    `
}

class ShoppingCart {
  constructor() {
    this.items = {}
    this.loadCartFromCookies()
  }

  // Зберігання кошика в кукі
  saveCartToCookies() {
    let cartJSON = JSON.stringify(this.items);
    document.cookie = `cart=${cartJSON}; max-age=${60 * 60 * 24 * 7}; path=/`;
  }


  // Завантаження кошика з кукі
  loadCartFromCookies() {
    let cartCookie = getCookieValue('cart');
    if (cartCookie && cartCookie !== '') {
      this.items = JSON.parse(cartCookie);
    }
  }

  addItem(product) {
    if (this.items[product.id]) {
      this.items[product.id].quantity += 1
    } else {
      this.items[product.id] = product
      this.items[product.id].quantity = 1
    }
    this.saveCartToCookies()
  }

}

let cart = new ShoppingCart()

function addToCart(event) {
  let data = event.target.getAttribute("data-product");
  let product = JSON.parse(data);
  console.log(product);
  cart.addItem(product)
  console.log(cart.items);
}

getProducts().then(function (products) {
  if (product_list){
  products.forEach(function (product) {
    product_list.innerHTML += getCard(product);
  })
  let addBtn_list = document.querySelectorAll(".add-cart-btn")
  addBtn_list.forEach(function (btn) {
    btn.addEventListener("click", addToCart);
  })}
})

//comment

let cart_list = document.querySelector(".cart_list")

function getCartItem(product) {
  return `
    <div class="card my-2">
            <div class="row m-2 ">
                <div class="col-2">
                    <img src="${product.img}" class="img-fluid">
                </div>
                <div class="col-6"><h5>${product.title}</h5></div>
                <div class="col-2">${product.quantity}</div>
                <div class="col-2"><h4>${product.price}</h4></div>
            </div>
        </div>
    `
}

cart_list.innerHTML = ""

for (let key in cart.items){
  cart_list.innerHTML+= getCartItem(cart.items[key])
}