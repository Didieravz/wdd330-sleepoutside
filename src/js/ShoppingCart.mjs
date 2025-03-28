import { getLocalStorage, setLocalStorage } from "./utils.mjs";

export default class ShoppingCart {
    constructor(cartContainer) {
        // Container to show the cart ( <ul class="product-list">)
        this.cartContainer = cartContainer;
        this.cartItems = this.loadCartItems(); // Load the items from the localStorage
        
    }

    async loadCartItems() {
        const cartItems = getLocalStorage("so-cart");
        return cartItems && Array.isArray(cartItems) ? cartItems : [];
    }

    async renderCartContents() {
        const cartItems = await this.loadCartItems();
        
        if (cartItems.length > 0) {
            const htmlItems = cartItems.map((item) => this.cartItemTemplate(item));
            this.cartContainer.innerHTML = htmlItems.join(""); // Render the items from the cart
        } else {
            this.cartContainer.innerHTML = "<p>Your cart is empty!</p>"; // Si el carrito está vacío, mostrar un mensaje/If the cart is empty, display a message
        }

        this.updateTotal(cartItems);
        this.attachRemoveListeners();
        this.attachQuantityChangeListeners();
    }

    cartItemTemplate(item) {
        // html structure to add cart/index.html <ul class="product-list">
        // <p class="cart-card__quantity">qty: 1</p>
        // <p class="cart-card__price">$${item.FinalPrice}</p>
        // <span class="cart-card__remove" data-id="${item.Id}">X</span> <!-- Close button with data-id -->
        return `
      <li class="cart-card divider">
        <a href="#" class="cart-card__image">
          <img src="${item.Images.PrimaryLarge}" alt="${item.Name}" />
        </a>
        <a href="#">
          <h2 class="card__name">${item.Name}</h2>
        </a>
        <p class="cart-card__color">${item.Colors[0].ColorName}</p>
        <p>Qty: <input type="number" class="cart-card__quantity" data-id="${item.Id}" value="${item.quantity || 1}" min="1"></p>
        

        <p class="cart-card__price" data-id="${item.Id}">$${(item.FinalPrice * (item.quantity || 1)).toFixed(2)}</p>
        <span class="cart-card__remove" data-id="${item.Id}">X</span>
      </li>
    `;
    }

    updateTotal(cartItems) {
        const totalPrice = cartItems.reduce((total, item) => total + item.FinalPrice * (item.quantity || 1), 0);
        const totalElement = document.querySelector("#total");
        if (totalElement) totalElement.innerHTML = `${totalPrice.toFixed(2)}`;
    }

    attachRemoveListeners() {
        const removeButtons = document.querySelectorAll(".cart-card__remove");

        removeButtons.forEach((button) => {
            button.addEventListener("click", (event) => {
                const productId = event.target.getAttribute("data-id");
                this.removeItemFromCart(productId);
            });
        });
    }

    attachQuantityChangeListeners() {
      const quantityInputs = document.querySelectorAll(".cart-card__quantity");

      quantityInputs.forEach((input) => {
          input.addEventListener("change", (event) => {
              const newQuantity = parseInt(event.target.value);
              const productId = event.target.getAttribute("data-id");

              if (newQuantity < 1) {
                  event.target.value = 1; // Prevent quantity from being less than 1
                  return;
              }

              this.updateCartQuantity(productId, newQuantity);
          });
      });
  }

  updateCartQuantity(productId, newQuantity) {
      let cartItems = getLocalStorage("so-cart");

      cartItems = cartItems.map((item) => {
          if (item.Id === productId) {
              return { ...item, quantity: newQuantity };
          }
          return item;
      });

      setLocalStorage("so-cart", cartItems);
      this.updateItemPrice(productId, newQuantity);
      this.updateTotal(cartItems);
  }

  updateItemPrice(productId, newQuantity) {
      const cartItems = getLocalStorage("so-cart");
      const item = cartItems.find((Aitem) => Aitem.Id === productId);

      if (item) {
          const priceElement = document.querySelector(`.cart-card__price[data-id="${productId}"]`);
          if (priceElement) {
              priceElement.textContent = `$${(item.FinalPrice * newQuantity).toFixed(2)}`;
          }
      }
  }

  removeItemFromCart(productId) {
      const cartItems = getLocalStorage("so-cart");

      const updatedCart = cartItems.filter((item) => item.Id !== productId);
      setLocalStorage("so-cart", updatedCart);

      this.renderCartContents(); // Re-render the cart
  }
}
