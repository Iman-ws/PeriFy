async function fetchFeaturedProducts() {
    try {
        const response = await fetch('http://localhost:8080/api/products');
        const products = await response.json();
        const productContainer = document.querySelector('.product-list');
        productContainer.innerHTML = '';

        products.forEach(product => {
            const productElement = document.createElement('div');
            productElement.classList.add('product');
            productElement.innerHTML = `
                <img src="${product.image}" alt="${product.name}">
                <h3>${product.name}</h3>
                <p class="price">$${product.price.toFixed(2)}</p>
                <a href="product.html?id=${product.id}" class="button">View Details</a>
            `;
            productContainer.appendChild(productElement);
        });
    } catch (error) {
        console.error("Error loading featured products:", error);
    }
}

document.addEventListener('DOMContentLoaded', fetchFeaturedProducts);
