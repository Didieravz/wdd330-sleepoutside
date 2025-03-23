import ProductData from "./ProductData.mjs";
import { getParam, loadHeaderFooter } from "./utils.mjs";
// Import aditional functions
import ProductDetails from "./ProductDetails.mjs";

//Load the header and footer
loadHeaderFooter();

const dataSource = new ProductData("tents");
// Obtener el ID del producto de la URL utilizando la función getParam/Get the product ID from the URL using the getParam function.
const productId = getParam("product");

//New instance of product details
const productDetails = new ProductDetails(productId, dataSource);

// call the metod init from ProductDetails
// Llamar al método init() para inicializar todo/Call the init() method to initialize everything
productDetails.init();
