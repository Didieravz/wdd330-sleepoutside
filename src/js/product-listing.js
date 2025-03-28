import { loadHeaderFooter, getParam } from "./utils.mjs";
import ProductList from "./ProductList.mjs";
import ExternalServices from "./ExternalServices.mjs";

loadHeaderFooter();

const category = getParam("category");
// Create a instance of ProductData to recuperate the data
const dataSource = new ExternalServices();
// obtain the ul element from index with its class
const listElement = document.querySelector(".product-list");

//create a new instance of ProductList
const myList = new ProductList(category, dataSource, listElement);
// Call the init method from ProductList
myList.init();
