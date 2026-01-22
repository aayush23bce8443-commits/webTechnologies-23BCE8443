
const inventory = [
    { id: 1, name: "Laptop", price: 1000, category: "Tech" },
    { id: 2, name: "Headphones", price: 200, category: "Tech" },
    { id: 3, name: "Coffee Mug", price: 20, category: "Home" }
];

let cart = [];
let appliedCoupon = "";


function initProducts() {
    const grid = document.getElementById('productGrid');
    inventory.forEach(p => {
        grid.innerHTML += `
            <div class="product-item">
                <span>${p.name} - $${p.price}</span>
                <button onclick="addToCart(${p.id})">Add to Cart</button>
            </div>`;
    });
}


function addToCart(id) {
    const item = inventory.find(p => p.id === id);
    const inCart = cart.find(p => p.id === id);

    if (inCart) {
        inCart.quantity++;
    } else {
        cart.push({ ...item, quantity: 1 });
    }
    renderCart();
}

function updateQuantity(id, change) {
    const item = cart.find(p => p.id === id);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            cart = cart.filter(p => p.id !== id);
        }
    }
    renderCart();
}


function calculateTotals() {
    let subtotal = 0;
    let discount = 0;

    cart.forEach(item => {
        let itemTotal = item.price * item.quantity;
        
    
        if (item.quantity >= 5) {
            itemTotal *= 0.9;
        }

        
        if (item.category === "Tech" && itemTotal > 500) {
            itemTotal -= 10;
        }

        subtotal += (item.price * item.quantity);
        discount += (item.price * item.quantity) - itemTotal;
    });


    if (appliedCoupon.toUpperCase().trim() === "SAVE10") {
        discount += subtotal * 0.10;
    }

    return { subtotal, discount, total: subtotal - discount };
}


function renderCart() {
    const container = document.getElementById('cartItems');
    const summary = document.getElementById('cartSummary');
    container.innerHTML = "";

    cart.forEach(item => {
        container.innerHTML += `
            <div class="cart-row">
                <span>${item.name} (x${item.quantity})</span>
                <div>
                    <button onclick="updateQuantity(${item.id}, 1)">+</button>
                    <button onclick="updateQuantity(${item.id}, -1)">-</button>
                    $${item.price * item.quantity}
                </div>
            </div>`;
    });

    const results = calculateTotals();
    summary.innerHTML = `
        <p>Subtotal: $${results.subtotal.toFixed(2)}</p>
        <p class="discount">Discount: -$${results.discount.toFixed(2)}</p>
        <h3>Total: $${results.total.toFixed(2)}</h3>
    `;
}

function applyCoupon() {
    appliedCoupon = document.getElementById('couponInput').value;
    renderCart();
}

initProducts();