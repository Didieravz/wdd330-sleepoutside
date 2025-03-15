import ProductData from "./ProductData.js";
import ProductList from "./ProductList.js";

const productData = new ProductData("tents"); // Fetch from tents.json
const productList = new ProductList("tents", productData);

productList.displayProducts();
