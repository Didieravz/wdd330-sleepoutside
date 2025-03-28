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
        // console.log(list); // Agrega esta línea para ver qué datos estás obteniendo/Add this line to see what data you are getting
        this.products = list;  // Guardar la lista de productos
        // render the list
        this.renderList(list);
        // **********************************.title DOES NOT exists***********************
        document.querySelector(".title").textContent = this.category;

        // Escuchar cambios en el selector de ordenamiento
        // Comprobar si el selector #sortBy existe antes de agregar el listener
        const sortBySelect = document.querySelector("#sortBy");
        if (sortBySelect) {
            sortBySelect.addEventListener("change", (event) => {
                this.sortProducts(event.target.value);
            });
        } else {
            console.warn("El selector de ordenación no se encontró.");
        }
    }

    // Método para ordenar productos
    sortProducts(sortOption) {
        let sortedProducts = [...this.products];  // Crear una copia de la lista de productos

        if (sortOption === "nameAsc") {
            sortedProducts.sort((a, b) => a.Name.localeCompare(b.Name));
        } else if (sortOption === "nameDesc") {
            sortedProducts.sort((a, b) => b.Name.localeCompare(a.Name));
        } else if (sortOption === "priceAsc") {
            sortedProducts.sort((a, b) => a.FinalPrice - b.FinalPrice);
        } else if (sortOption === "priceDesc") {
            sortedProducts.sort((a, b) => b.FinalPrice - a.FinalPrice);
        }

        // Volver a renderizar la lista con los productos ordenados
        this.renderList(sortedProducts);
    }

    // render after doing the first stretch
    renderList(list) {
        renderListWithTemplate(productCardTemplate, this.listElement, list);
    }
}
