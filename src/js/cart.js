import ShoppingCart from "./ShoppingCart.mjs"; // Asegúrate de importar el nuevo módulo/Make sure to import the new module.
import { loadHeaderFooter } from "./utils.mjs";

// Cargar el header y footer dinámicamente/Load the header and footer dynamically
loadHeaderFooter();

// Seleccionar el contenedor donde se mostrarán los productos del carrito/Select the container where the cart products will be displayed.
const cartContainer = document.querySelector(".product-list");

// Crear una nueva instancia de la clase ShoppingCart/Create a new instance of the ShoppingCart class
const shoppingCart = new ShoppingCart(cartContainer);

// Renderizar los contenidos del carrito/Render the cart contents.
shoppingCart.renderCartContents();

const buttonCheckOut = document.querySelector(".checkout-btn");
buttonCheckOut.classList.remove("hide");

buttonCheckOut.addEventListener("click", (event) => {
    event.preventDefault();
    // Redirect to the checkout page
    window.location.href = "../checkout/index.html"; // Redirige a la página de checkout
});
