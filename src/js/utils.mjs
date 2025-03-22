let headerLoaded = false; // Variable para saber si el header ya ha sido cargado
let footerLoaded = false; // Variable para saber si el footer ya ha sido cargado

// wrapper for querySelector...returns matching element
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}
// or a more concise version if you are into that sort of thing:
// export const qs = (selector, parent = document) => parent.querySelector(selector);

// retrieve data from localstorage
export function getLocalStorage(key) {
  const value = localStorage.getItem(key);
  // Si el valor no existe o es inválido, devolvemos un array vacío
  if (!value) {
    return [];
  }
  try {
    const parsedValue = JSON.parse(value);
    // Si el valor parseado no es un array, devolvemos un array vacío
    if (!Array.isArray(parsedValue)) {
      return [];
    }
    return parsedValue;
  } catch (e) {
    return [];
  }
}
// save data to local storage
export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}
// set a listener for both touchend and click
export function setClick(selector, callback) {
  qs(selector).addEventListener("touchend", (event) => {
    event.preventDefault();
    callback();
  });
  qs(selector).addEventListener("click", callback);
}
// return the parameters from the URL
export function getParam(param) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const product = urlParams.get(param);
  return product;
}

export function renderListWithTemplate(templateFn, parentElement, list,
  position = "afterbegin", clear = false) {

  const htmlStrings = list.map(templateFn);

  // Optionally clear the parent element if 'clear' is true
  if (clear) {
    parentElement.innerHTML = "";
  }
  parentElement.insertAdjacentHTML(position, htmlStrings.join(""));


}
export function renderwithTemplate(template, parentElement, data, callback) {

  // Limpiar el contenido antes de insertar nuevo template
  parentElement.innerHTML = "";
  parentElement.innerHTML = template;

  if (callback) {
    callback(data)
  }

  // This line of code is duplicating header and footer
  parentElement.insertAdjacentHTML("afterbegin", template);

}
//This asynchronous function fetches the content of the HTML
export async function loadTemplate(path) {
  const res = await fetch(path);
  //The response is converted to text and returns the HTML content as a string
  const template = await res.text();
  return template;
}

//Load, Grab out of the DOM and Render the header and footer
export async function loadHeaderFooter() {
  // console.log("Cargando loadHeaderFooter");
  // Cargar el header solo si no ha sido cargado antes
  if (!headerLoaded) {
    const headerTemplate = await loadTemplate("../partials/header.html");
    const headerElement = document.querySelector("#header");

    if (!headerElement.innerHTML.trim()) {
      renderwithTemplate(headerTemplate, headerElement);
    }
    headerLoaded = true; // Marcamos que el header ya fue cargado
  }
  // Llamar a updateCartCountInHeader después de cargar el header
  updateCartCountInHeader();  // Actualiza el contador después de cargar el header
  // Cargar el footer solo si no ha sido cargado antes
  if (!footerLoaded) {
    const footerTemplate = await loadTemplate("../partials/footer.html");
    const footerElement = document.querySelector("#footer");

    if (!footerElement.innerHTML.trim()) {
      renderwithTemplate(footerTemplate, footerElement);
    }
    footerLoaded = true; // Marcamos que el footer ya fue cargado
  }


}

// utils.js

export function updateCartCountInHeader() {
  const cartItems = getLocalStorage("so-cart") || [];
  const cartCount = cartItems.length; // Número de productos en el carrito

  const cartCountElement = document.getElementById("cartCount");

  if (cartCountElement) {
    cartCountElement.textContent = cartCount; // Actualiza el contador en el icono del carrito
  }
}


// Llamada al cargar la página para asegurar que el contador esté actualizado
document.addEventListener("DOMContentLoaded", function () {
  updateCartCountInHeader();
});
