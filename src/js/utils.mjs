// wrapper for querySelector...returns matching element
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}
// or a more concise version if you are into that sort of thing:
// export const qs = (selector, parent = document) => parent.querySelector(selector);

// retrieve data from localstorage
export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
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

  // Optionally clear the parent element if 'clear' is true
  if (clear) {
    parentElement.innerHTML = "";
  }

  // Iterate over the list and apply the template function to render each item
  list.forEach(item => {
    // console.log("items de utils.js", item); // línea para ver qué datos estás obteniendo
    const html = templateFn(item);
    parentElement.insertAdjacentHTML(position, html);
  });

}
