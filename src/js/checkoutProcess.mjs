import { getLocalStorage } from "./utils.mjs";

export default class checkoutProcess {
  constructor(key, outputSelector) {
    this.key = key;
    this.outputSelector = outputSelector;
    this.list = [];
    this.itemTotal = 0;
    this.shipping = 0;
    this.tax = 0;
    this.orderTotal = 0;
  }

init() {
  this.list = getLocalStorage(this.key);
  this.calulateItemSummary();
  }

calulateItemSubtotal() {
  }

calculateOrderTotal() {
  this.tax = (this.itemTotal * .06);
  this.shipping = 10 + (this.list.length - 1) * 2;
  this.orderTotal = (
    parseFloat(this.itemTotal) + 
    parseFloat(this.tax) +
    parseFloat(this.shipping)
  )
  
  this.displayOrderTotals();
  }

displayOrderTotals() {
  const tax = document.querySelector(`${this.outputSelector} #tax`);

  tax.innerText = `$${this.tax.toFixed(2)}`;
  }
}
