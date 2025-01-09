let currentPage = 1; // Используем let, чтобы значение можно было изменять

const loadProducts = () => {
    const category = document.querySelector("#category-filter").value || "";
    const price = document.querySelector("#price-range").value || "";
    const sort = document.querySelector("#sort-dropdown").value || "";

    const url = `http://localhost:8080/products?category=${category}&price=${price}&sort=${sort}&page=${currentPage}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            const productsContainer = document.querySelector(".products-container");
            const paginationContainer = document.querySelector(".pagination-container");
            productsContainer.innerHTML = "";
            paginationContainer.innerHTML = "";

            const { products, totalPages } = data;

            if (products.length === 0) {
                productsContainer.innerHTML = `<p>No products found.</p>`;
                return;
            }

            // Отображение товаров
            products.forEach(product => {
                productsContainer.innerHTML += `
                    <div class="product">
                        <img src="${product.image}" alt="${product.name}">
                        <h3>${product.name}</h3>
                        <p class="price">$${product.price.toFixed(2)}</p>
                        <button>Add to Cart</button>
                    </div>
                `;
            });

            // Генерация кнопок пагинации
            for (let i = 1; i <= totalPages; i++) {
                paginationContainer.innerHTML += `
                    <button class="page-button ${i === currentPage ? "active" : ""}" data-page="${i}">
                        ${i}
                    </button>
                `;
            }

            // Добавление обработчиков для кнопок пагинации
            document.querySelectorAll(".page-button").forEach(button => {
                button.addEventListener("click", () => {
                    currentPage = parseInt(button.dataset.page); // Изменяем значение currentPage
                    loadProducts(); // Перезагружаем товары
                });
            });
        })
        .catch(err => console.error("Failed to load products:", err));
};

// Обработчики для фильтров
document.querySelector("#category-filter").addEventListener("change", () => {
    currentPage = 1;
    loadProducts();
});

document.querySelector("#price-range").addEventListener("change", () => {
    currentPage = 1;
    loadProducts();
});

document.querySelector("#sort-dropdown").addEventListener("change", () => {
    currentPage = 1;
    loadProducts();
});

// Загрузка товаров при загрузке страницы
document.addEventListener("DOMContentLoaded", () => {
    loadProducts();
});
