import { loadHeaderFooter, getParam } from "./utils.mjs";
import ProductList from "./ProductList.mjs";
import ProductData from "./ProductData.mjs";

loadHeaderFooter();

const category = getParam("category");
// Create a instance of ProductData to recuperate the data
const dataSource = new ProductData();
// obtain the ul element from index with its class
const listElement = document.querySelector(".product-list");

//create a new instance of ProductList
const listing = new ProductList(category, dataSource, listElement);
// Call the init method from ProductList
listing.init();
