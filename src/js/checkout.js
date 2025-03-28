import CheckoutProcess from "./CheckoutProcess.mjs"; // Importa la clase CheckoutProcess
import { loadHeaderFooter } from "./utils.mjs";

loadHeaderFooter();
// Asegura que el codigo se ejecute despues que el DOM este listo
document.addEventListener("DOMContentLoaded", () => {
  // Crea una nueva instancia de CheckoutProcess
  const checkoutProcess = new CheckoutProcess("so-cart", ".orderSummary"); // 'so-cart' es la clave en localStorage, '.orderSummary' es el selector para el contenedor donde se mostrarán los totales.

  // Inicializa el proceso de checkout
  checkoutProcess.init();

  // Select the checkout form
  const checkoutForm = document.querySelector("#checkoutForm");

  // Attach event listener for form submission
  checkoutForm.addEventListener("submit", (event) => {
    checkoutProcess.handleCheckoutFormSubmit(event);
  });
});
