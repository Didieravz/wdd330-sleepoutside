import ProductData from "./ProductData.mjs";
import { getParam } from "./utils.mjs";
// Import aditional functions
import ProductDetails from "./ProductDetails.mjs";

const dataSource = new ProductData("tents");
// Obtener el ID del producto de la URL utilizando la función getParam
const productId = getParam("product");

//New instance of product details
const productDetails = new ProductDetails(productId, dataSource);

// call the metod init from ProductDetails
// Llamar al método init() para inicializar todo
productDetails.init();
