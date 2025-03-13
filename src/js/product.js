import { setLocalStorage } from "./utils.mjs";
import ProductData from "./ProductData.mjs";
import { getParam } from "./utils.mjs";
// Import aditional functions
import ProductDetails from "./ProductDetails.mjs";

const dataSource = new ProductData("tents");
// Obtener el ID del producto de la URL utilizando la función getParam
const productId = getParam("product");
console.log("we show the idProduct: ", productId); // debería mostrar '880RR' si la URL es correcta.

//New instance of product details
const productDetails = new ProductDetails(productId, dataSource);

// call the metod init from ProductDetails
// Llamar al método init() para inicializar todo
productDetails.init();

// add to cart button event handler
// async function addToCartHandler(e) {
//   const product = await dataSource.findProductById(e.target.dataset.id);
//   addProductToCart(product);
// }

// add listener to Add to Cart button ctr+k ctr+c --> commet ; ctr+k ctr+u
// document
//   .getElementById("addToCart")
//   .addEventListener("click", addToCartHandler);
