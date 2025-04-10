import { loadHeaderFooter, getParam } from "./utils.mjs";
import ProductList from "./ProductList.mjs";
import ExternalServices from "./ExternalServices.mjs";

loadHeaderFooter();
const searchTerm = getParam("search");
console.log("Search term recibido:", searchTerm); // <-- esto
//Create a new instance for search
const category = getParam("category");
// Create a instance of ProductData to recuperate the data
const dataSource = new ExternalServices();
// obtain the ul element from index with its class
const listElement = document.querySelector(".product-list");

const titleElement = document.querySelector(".title");

if (searchTerm) {
  titleElement.textContent = `Results for "${searchTerm}"`;
  const myList = new ProductList("search", dataSource, listElement);
  myList.searchInit(searchTerm);
} else if (category) {
  titleElement.textContent = category;
  const myList = new ProductList(category, dataSource, listElement);
  myList.init();
  
}
