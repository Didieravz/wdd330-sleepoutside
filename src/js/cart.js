import ShoppingCart from "./ShoppingCart.mjs"; // Asegúrate de importar el nuevo módulo
import { loadHeaderFooter } from "./utils.mjs";

// Cargar el header y footer dinámicamente
loadHeaderFooter();

// Seleccionar el contenedor donde se mostrarán los productos del carrito
const cartContainer = document.querySelector(".product-list");

// Crear una nueva instancia de la clase ShoppingCart
const shoppingCart = new ShoppingCart(cartContainer);

// Renderizar los contenidos del carrito
shoppingCart.renderCartContents();
