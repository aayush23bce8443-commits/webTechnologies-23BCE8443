const searchInput = document.getElementById("searchInput");
const resultsDiv = document.getElementById("results");
const loading = document.getElementById("loading");

let debounceTimer;


function debounce(func, delay) {
    return function (...args) {
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => {
            func.apply(this, args);
        }, delay);
    };
}


function searchProducts() {
    const query = searchInput.value.trim().toLowerCase();

    if (query === "") {
        resultsDiv.innerHTML = "";
        return;
    }

    loading.style.display = "block";
    resultsDiv.innerHTML = "";

    fetch("products.json")
        .then(response => {
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return response.json();
        })
        .then(data => {
            loading.style.display = "none";

            const filteredProducts = data.products.filter(product =>
                product.name.toLowerCase().includes(query)
            );

            if (filteredProducts.length === 0) {
                resultsDiv.innerHTML = "<p class='no-results'>No results found</p>";
                return;
            }

            filteredProducts.forEach(product => {
                const productDiv = document.createElement("div");
                productDiv.classList.add("product");

                productDiv.innerHTML = `
                    <h4>${product.name}</h4>
                    <p>Price: ₹${product.price}</p>
                    <p>Category: ${product.category}</p>
                `;

                resultsDiv.appendChild(productDiv);
            });
        })
        .catch(error => {
            loading.style.display = "none";
            resultsDiv.innerHTML = "<p class='no-results'>Error fetching products</p>";
            console.error("Error:", error);
        });
}


searchInput.addEventListener("input", debounce(searchProducts, 500));