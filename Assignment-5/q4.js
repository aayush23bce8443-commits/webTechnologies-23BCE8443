let products = [];


function loadProducts() {
    fetch("inventory.json")
        .then(response => {
            if (!response.ok) {
                throw new Error("File not found");
            }
            return response.json();
        })
        .then(data => {
            products = data;
            displayProducts();
            showMessage("Products loaded successfully!", "success");
        })
        .catch(error => {
            showMessage("Error loading JSON file!", "error");
        });
}


function displayProducts(filteredProducts = products) {
    let tableBody = document.querySelector("#inventoryTable tbody");
    tableBody.innerHTML = "";

    let total = 0;

    filteredProducts.forEach(product => {
        let row = tableBody.insertRow();

        row.insertCell(0).innerText = product.id;
        row.insertCell(1).innerText = product.name;
        row.insertCell(2).innerText = product.category;
        row.insertCell(3).innerText = product.price;
        row.insertCell(4).innerText = product.stock;

        
        if (product.stock < 5) {
            row.style.backgroundColor = "#ffcccc";
        }

        total += product.price * product.stock;
    });

    document.getElementById("totalValue").innerText = total;
}


function validateProduct(id, name, category, price, stock) {
    if (!id || !name || !category || !price || !stock) {
        showMessage("All fields are required!", "error");
        return false;
    }

    if (price <= 0 || stock < 0) {
        showMessage("Invalid price or stock value!", "error");
        return false;
    }

    return true;
}

function addProduct() {
    let id = document.getElementById("productId").value.trim();
    let name = document.getElementById("productName").value.trim();
    let category = document.getElementById("productCategory").value.trim();
    let price = Number(document.getElementById("productPrice").value);
    let stock = Number(document.getElementById("productStock").value);

    if (!validateProduct(id, name, category, price, stock)) return;

    if (products.some(p => p.id === id)) {
        showMessage("Product ID already exists!", "error");
        return;
    }

    products.push({ id, name, category, price, stock });
    displayProducts();
    showMessage("Product added successfully!", "success");
}


function updateProduct() {
    let id = document.getElementById("productId").value.trim();
    let price = Number(document.getElementById("productPrice").value);
    let stock = Number(document.getElementById("productStock").value);

    let product = products.find(p => p.id === id);

    if (!product) {
        showMessage("Product not found!", "error");
        return;
    }

    if (price > 0) product.price = price;
    if (stock >= 0) product.stock = stock;

    displayProducts();
    showMessage("Product updated successfully!", "success");
}


function deleteProduct() {
    let id = document.getElementById("productId").value.trim();

    let index = products.findIndex(p => p.id === id);

    if (index === -1) {
        showMessage("Product not found!", "error");
        return;
    }

    products.splice(index, 1);
    displayProducts();
    showMessage("Product deleted successfully!", "success");
}


function searchProduct() {
    let category = document.getElementById("searchCategory").value.trim();

    let filtered = products.filter(p =>
        p.category.toLowerCase() === category.toLowerCase()
    );

    if (filtered.length === 0) {
        showMessage("No products found in this category!", "error");
        return;
    }

    displayProducts(filtered);
}


function showMessage(msg, type) {
    let message = document.getElementById("message");
    message.innerText = msg;
    message.style.color = type === "success" ? "green" : "red";
}