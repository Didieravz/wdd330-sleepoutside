import ProductData from "./ProductData.js";
import ProductList from "./ProductList.js";
import Alert from "./Alert.js";

const alertManager = new Alert("alerts.json");
alertManager.loadAlerts();

const productData = new ProductData("tents"); // Fetch from tents.json
const productList = new ProductList("tents", productData);

productList.displayProducts();
