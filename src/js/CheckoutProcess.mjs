import { getLocalStorage } from "./utils.mjs";
import ExternalServices from "./ExternalServices.mjs";


export default class CheckoutProcess {
    constructor(key, outputSelector) {
        this.key = key;
        this.outputSelector = outputSelector;
        this.list = [];
        this.itemTotal = 0;
        this.shipping = 0;
        this.tax = 0;
        this.orderTotal = 0;
    }

    // Inicializa la clase cargando los productos del carrito desde el localStorage 
    // / init the class with product list from localStorage
    init() {
        this.list = getLocalStorage(this.key);
        // console.log("productList", this.list);
        if (this.list) {
            this.calculateItemSubTotal(); // Calcula el subtotal de los artículos
            this.calculateOrderTotal();   // Calcula impuestos, envío y el total
        }
    }

    // Método para calcular el subtotal de los artículos / calculate the subtotal
    calculateItemSubTotal() {
        this.itemTotal = 0;

        // Recorremos los artículos y calculamos el total de los productos en el carrito
        this.list.forEach(item => {
            this.itemTotal += item.FinalPrice * (item.quantity || 1);
        });
        // console.log("itemTotal", this.itemTotal);

        this.displayItemSubTotal();
    }

    // Mostrar el subtotal de los artículos en la página / show the subtotal
    displayItemSubTotal() {
        const subtotalElement = document.querySelector(`${this.outputSelector} #subtotal`);
        // console.log("subtotalElement", subtotalElement);
        if (subtotalElement) {
            subtotalElement.innerText = `$${this.itemTotal.toFixed(2)}`;
        }
    }

    // Método para calcular impuestos, envío y el total del pedido
    // metod to calculate taxes, ans shipping amount
    calculateOrderTotal() {
        // Calcular el impuesto (6% del subtotal)
        this.tax = this.itemTotal * 0.06;

        // Calcular el costo de envío: $10 por el primer artículo + $2 por cada artículo adicional
        this.shipping = 10 + (this.list.length - 1) * 2;

        // Calcular el total del pedido sumando el subtotal, impuestos y envío
        this.orderTotal = this.itemTotal + this.tax + this.shipping;

        // Mostrar los valores en el DOM
        this.displayOrderTotals();
    }

    // Mostrar los totales (impuesto, envío y total del pedido) en la página
    displayOrderTotals() {
        const taxElement = document.querySelector(`${this.outputSelector} #tax`);
        const shippingElement = document.querySelector(`${this.outputSelector} #shippingEstimate`);
        const orderTotalElement = document.querySelector(`${this.outputSelector} #orderTotal`);

        // Mostrar los valores en los elementos correspondientes del DOM
        if (taxElement) {
            taxElement.innerText = `$${this.tax.toFixed(2)}`;
        }
        if (shippingElement) {
            shippingElement.innerText = `$${this.shipping.toFixed(2)}`;
        }
        if (orderTotalElement) {
            orderTotalElement.innerText = `$${this.orderTotal.toFixed(2)}`;
        }
    }

    // Prepare the items in the correct format for the order
    prepareOrderItems() {
        return this.list.map(item => ({
            id: item.Id,
            name: item.Name,
            price: item.FinalPrice,
            quantity: item.quantity || 1
        }));
    }

    // Handle form submission and prepare order data
    async handleCheckoutFormSubmit(event) {
        event.preventDefault(); // Prevent form submission from refreshing the page

        // Gather data from the form
        const fname = document.querySelector("#firstName").value;
        const lname = document.querySelector("#lastName").value;
        const street = document.querySelector("#streetAddress").value;
        const city = document.querySelector("#city").value;
        const state = document.querySelector("#state").value;
        const zip = document.querySelector("#zip").value;
        const cardNumber = document.querySelector("#creditCardNumber").value;
        const expiration = document.querySelector("#expirationDate").value;
        const code = document.querySelector("#securityCode").value;

        // Prepare the order data
        const orderData = {
            orderDate: new Date().toISOString(), // Current date/time
            fname: fname,
            lname: lname,
            street: street,
            city: city,
            state: state,
            zip: zip,
            cardNumber: cardNumber,
            expiration: expiration,
            code: code,
            items: this.prepareOrderItems(), // Prepare the order items
            orderTotal: this.orderTotal.toFixed(2),
            shipping: this.shipping,
            tax: this.tax.toFixed(2)
        };
        const response = await ExternalServices.submitOrder(orderData);
        console.log("Server response:", response);
    }

}
