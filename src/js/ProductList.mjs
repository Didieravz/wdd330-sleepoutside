import { renderListWithTemplate } from "./utils.mjs";

// Template for rendering product cards
function productCardTemplate(product) {
    return `
        <li class="product-card">
            <a href="../product_pages/?product=${product.Id}">
                <img src="${product.Images.PrimaryMedium}" alt="Image of ${product.Name}" />
                <h3 class="card__brand">${product.Brand.Name}</h3>
                <h2 class="card__name">${product.NameWithoutBrand}</h2>
                <p class="product-card__price">$${product.FinalPrice}</p>
            </a>
        </li>
    `;
}


export default class ProductList {

    constructor(category, dataSource, listElement) {
        this.category = category;
        this.dataSource = dataSource;
        this.listElement = listElement;
    }

    async init() {
        // our dataSource will return a Promise...so we can use await to resolve it.
        const list = await this.dataSource.getData(this.category);
        // render the list
        this.renderList(list);
    }
    // render after doing the first stretch
    renderList(list) {
        const elementH2 = document.querySelector(".product-list-tittle");
        // Cambia el texto del título para incluir la categoría
        elementH2.textContent = `Top Products: ${this.category}`;
        renderListWithTemplate(productCardTemplate, this.listElement, list);
    }
}