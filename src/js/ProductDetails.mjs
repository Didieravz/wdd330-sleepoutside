import { getLocalStorage, setLocalStorage } from "./utils.mjs";

export default class ProductDetails {

  constructor(productId, dataSource) {
    this.productId = productId;
    this.product = {};
    this.dataSource = dataSource;
  }

  async init() {
    // use the datasource to get the details for the current product. findProductById will return a promise! use await or .then() to process it
    this.product = await this.dataSource.findProductById(this.productId);
    // the product details are needed before rendering the HTML
    this.renderProductDetails();
    // once the HTML is rendered, add a listener to the Add to Cart button
    // Notice the .bind(this). This callback will not work if the bind(this) is missing. Review the readings from this week on "this" to understand why.
    document
      .getElementById("add-to-cart")
      .addEventListener("click", this.addProductToCart.bind(this));
  }

  addProductToCart() {
    const cartItems = getLocalStorage("so-cart") || [];
    const existingItem = cartItems.find(item => item.Id === this.product.Id);
    if (existingItem) {
          existingItem.quantity += 1;
      } else {
        this.product.quantity = 1;
        cartItems.push(this.product);
      }
        
    setLocalStorage("so-cart", cartItems);
  }

  renderProductDetails() {
    document.querySelector(".product-detail").innerHTML = productDetailsTemplate(this.product);
  }
}

function productDetailsTemplate(product) {
  const originalPrice=product.SuggestedRetailPrice || product.FinalPrice //Se toma el precio original del producto. Si el producto no tiene un precio definido se una el FinalPrice
  const discountedPrice=product.FinalPrice; //El precio real que pagará el cliente
  const discount =originalPrice>discountedPrice
  
  ? Math.round(((originalPrice - discountedPrice)/ originalPrice)*100) : 0;
    return `<section class="product-detail"> <h3>${product.Brand.Name}</h3>
      <h2 class="divider">${product.NameWithoutBrand}</h2>
      <img
        class="divider"
        src="${product.Images.PrimaryLarge}"
        alt="${product.NameWithoutBrand}"
      />
      <p class="product-card__price">$${product.FinalPrice}</p>
      ${discount > 0 ? `<p class="product-discount">🔥 ${discount}% OFF</p>` : ""}
      <p class="product__color">${product.Colors[0].ColorName}</p>
      <p class="product__description">
      ${product.DescriptionHtmlSimple}
      </p>
      <div class="product-detail__add">
        <button id="add-to-cart" data-id="${product.Id}">Add to Cart</button>
      </div></section>`;
  }
