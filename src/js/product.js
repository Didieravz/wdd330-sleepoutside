import { getParam, loadHeaderFooter } from "./utils.mjs";
import ProductData from "./ProductData.mjs";
// Import aditional functions
import ProductDetails from "./ProductDetails.mjs";
// import { loadHeaderFooter } from "./utils.mjs";

//Load teh header and footer
loadHeaderFooter();

const dataSource = new ProductData("tents");
// Obtener el ID del producto de la URL utilizando la función getParam
const productId = getParam("product");

//New instance of product details
const product = new ProductDetails(productId, dataSource);

// call the metod init from ProductDetails
// Llamar al método init() para inicializar todo
product.init();
