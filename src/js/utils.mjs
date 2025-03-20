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
    // Si hay un error al parsear, devolvemos un array vacío
    console.error("Error parsing localStorage value", e);
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

  // Iterate over the list and apply the template function to render each item
  // list.forEach(item => {
  //   // console.log("items de utils.js", item); // línea para ver qué datos estás obteniendo
  //   const html = templateFn(item);
  //   parentElement.insertAdjacentHTML(position, html);
  // });

}
export function renderwithTemplate(template, parentElement, data,callback) {

  //const htmlStrings = list.map(template);
  parentElement.innerHTML = template;

  if (callback) {
    callback(data)
  }
  parentElement.insertAdjacentHTML(position, htmlStrings.join(""));

  // Iterate over the list and apply the template function to render each item
  // list.forEach(item => {
  //   // console.log("items de utils.js", item); // línea para ver qué datos estás obteniendo
  //   const html = templateFn(item);
  //   parentElement.insertAdjacentHTML(position, html);
  // });

}
 export async function loadTemplate(path){
  const res = await fetch(path);
  const template = await res.text();
  return template;
 }

 export async function loadHeaderFooter(){
  const headerTemplate = await loadTemplate("../partials/header.html");
  const headerElement = document.querySelector("#header");

  const footerTemplate = await loadTemplate("../partials/footer.html");
  const footerElement = document.querySelector("#footer");

  renderwithTemplate(headerTemplate,headerElement);
  renderwithTemplate(footerTemplate,footerElement);

 }