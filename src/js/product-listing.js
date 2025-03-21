import { loadHeaderFooter, getParam } from "./utils.mjs";
import ProductList from "./ProductList.mjs";
import ProductData from "./ProductData.mjs";

loadHeaderFooter();

const category = getParam("category");
// Create a instance of ProductData to recuperate the data
const dataSource = new ProductData();
console.log("data recuperada", dataSource);
// obtain the ul element from index with its class
const element = document.querySelector(".product-list");

//create a new instance of ProductList
const list = new ProductList(category, dataSource, element);
// Call the init metod from ProductList
list.init();