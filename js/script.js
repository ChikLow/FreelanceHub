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
    <div class="card" style="width: 45%; padding: 10px; border: 1px solid #ccc;">
  <div class="row g-0">
    <!-- Left Section: Image and Title -->
    <div class="col-md-6 d-flex flex-column align-items-start">
      <img style="width:400px;border:1px solid grey;border-radius:10px" src="${product.img}" class="img-fluid mb-3" alt="...">
      <h5 class="card-title">${product.title}</h5>
    </div>
    <!-- Right Section: Description and Price -->
    <div class="col-md-6 d-flex flex-column align-items-end text-end">
      <p class="card-text fw-bold">Price: ${product.price}$</p>
      <p class="card-text">${product.description}</p>
    </div>
  </div>
  <!-- Bottom Section: Button -->
  <div class="d-flex justify-content-center mt-3">
    <button class="btn btn-primary add-cart-btn" style="width: 45%; height: 55px;" data-product='${JSON.stringify(product)}'>
      Go somewhere
    </button>
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
  if (product_list) {
    products.forEach(function (product) {
      product_list.innerHTML += getCard(product);
    })
    let addBtn_list = document.querySelectorAll(".add-cart-btn")
    addBtn_list.forEach(function (btn) {
      btn.addEventListener("click", addToCart);
    })
  }
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
                <div class="col-2"><h4>${product.price}$</h4></div>
            </div>
        </div>
    `
}

cart_list.innerHTML = ""

if (cart_list) {
  cart_list.innerHTML = ''

  for (let key in cart.items) {
    cart_list.innerHTML += getCartItem(cart.items[key])
  }

  if (cart.items.length > 0) {
    cart.list.innerHTML += ''
  }

}

if (Object.keys(cart.items).length > 0) {
  cart_buttons.classList.remove("d-none")
}

let cartCleanBtn = document.querySelector(".cart-clean")

cartCleanBtn?.addEventListener("click", function (event) {
  document.cookie = `cart=''; max-age=0; path=/`;
  cart_list.innerHTML = "no orders"
  cart_buttons.classList.remove("d-none")
})