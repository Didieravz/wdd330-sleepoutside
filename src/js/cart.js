import { getLocalStorage, setLocalStorage } from "./utils.mjs";
import { loadHeaderFooter } from "./utils.mjs";


function renderCartContents() {
  const cartItems = getLocalStorage("so-cart");
  if (cartItems && Array.isArray(cartItems)) {
    const htmlItems = cartItems.map((item) => cartItemTemplate(item));
    document.querySelector(".product-list").innerHTML = htmlItems.join("");

    let totalPrice = 0;
    cartItems.forEach((item) => {
      totalPrice += item.FinalPrice;
    });

    document.querySelector("#total").innerHTML = totalPrice;
  }
}


function cartItemTemplate(item) {
  const newItem = `<li class="cart-card divider">
  <a href="#" class="cart-card__image">
    <img
      src="${item.Image}"
      alt="${item.Name}"
    />
  </a>
  <a href="#">
    <h2 class="card__name">${item.Name}</h2>
  </a>
  <p class="cart-card__color">${item.Colors[0].ColorName}</p>
  <p class="cart-card__quantity">qty: 1</p>
  <p class="cart-card__price">$${item.FinalPrice}</p>
  <span class="cart-card__remove" data-id="${item.Id}">X</span> <!-- Close button with data-id -->
</li>`;

  return newItem;
}

// Function to handle removing items from the cart
function attachRemoveListeners() {
  // Attach event listeners to all close buttons (X)
  const removeButtons = document.querySelectorAll(".cart-card__remove");

  removeButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
      const productId = event.target.getAttribute("data-id");

      // Remove the item with the corresponding ID from the cart
      removeItemFromCart(productId);
    });
  });
}

// Function to remove an item from the cart
function removeItemFromCart(productId) {
  const cartItems = getLocalStorage("so-cart");

  // Filter out the item with the matching ID
  const updatedCart = cartItems.filter((item) => item.Id !== productId);

  // Update the cart in localStorage
  setLocalStorage("so-cart", updatedCart);

  // Re-render the cart
  renderCartContents();
}

// Initial render of the cart contents

renderCartContents();

loadHeaderFooter();