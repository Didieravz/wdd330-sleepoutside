import { getLocalStorage, loadHeaderFooter } from "./utils.mjs";

loadHeaderFooter();

function renderCartContents() {
  const cartItems = getLocalStorage("so-cart");
  const htmlItems = cartItems.map((item) => cartItemTemplate(item));
  document.querySelector(".product-list").innerHTML = htmlItems.join("");
}

function cartItemTemplate(item) {
  const newItem = `<li class="cart-card divider">
  <a href="#" class="cart-card__image">
    <img
      src="${item.Image}"
      alt="${item.Name}"
    />
  </a>
  <a href="#">
    <h2 class="card__name">${item.Name}</h2>
  </a>
  <p class="cart-card__color">${item.Colors[0].ColorName}</p>
  <p class="cart-card__quantity">qty: 1</p>
  <p class="cart-card__price">$${item.FinalPrice}</p>
</li>`;

  return newItem;
}

renderCartContents();


// import ShoppingCart from "./ShoppingCart.mjs"; // Asegúrate de importar el nuevo módulo
// import { loadHeaderFooter } from "./utils.mjs";

// // Cargar el header y footer dinámicamente
// loadHeaderFooter();

// // Seleccionar el contenedor donde se mostrarán los productos del carrito
// const cartContainer = document.querySelector(".product-list");

// // Crear una nueva instancia de la clase ShoppingCart
// const shoppingCart = new ShoppingCart(cartContainer);

// // Renderizar los contenidos del carrito
// shoppingCart.renderCartContents();





















