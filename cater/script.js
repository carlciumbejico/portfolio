// Menu Data
const menuData = [
    { id: 1, name: 'Adobo', category: 'mains', price: 370.00,  description: 'Marinated and simmered in a savory' },
    { id: 2, name: 'Caldereta', category: 'appetizers', price: 400.00, description: 'Toasted bread with tomato and basil' },
    { id: 3, name: 'Chicken Wings', category: 'appetizers', price: 350.00, description: 'Spicy buffalo chicken wings' },
    { id: 4, name: 'Grilled Salmon', category: 'mains', price: 450.00, description: 'Fresh grilled salmon with lemon butter' },
    { id: 5, name: 'Beef Steak', category: 'mains', price: 500.00, description: 'Premium ribeye steak, perfectly cooked' },
    { id: 6, name: 'Pasta Carbonara', category: 'mains', price: 350.00, description: 'Classic Italian pasta with creamy sauce' },
    { id: 7, name: 'Chocolate Cake', category: 'desserts', price: 270.00, description: 'Rich chocolate cake with frosting' },
    { id: 8, name: 'Cheesecake', category: 'desserts', price: 300.00, description: 'New York style cheesecake' },
    { id: 9, name: 'Ice Cream', category: 'desserts', price: 150.00, description: 'Assorted ice cream flavors' },
    { id: 10, name: 'Iced Tea', category: 'beverages', price: 70.00, description: 'Refreshing iced tea' },
    { id: 11, name: 'Soft Drink', category: 'beverages', price: 30.00, description: 'Assorted soft drinks' },
    { id: 12, name: 'Coffee', category: 'beverages', price: 30.00, description: 'Premium brewed coffee' }
];


// Cart Array
let cart = JSON.parse(localStorage.getItem('cart')) || [];


// Initialize
document.addEventListener('DOMContentLoaded', () => {
    renderMenu('all');
    updateCartUI();
});


// Render Menu
function renderMenu(category) {
    const menuGrid = document.getElementById('menuGrid');
    menuGrid.innerHTML = '';


    const filtered = category === 'all' ? menuData : menuData.filter(item => item.category === category);


    filtered.forEach(item => {
        const menuItem = document.createElement('div');
        menuItem.className = 'menu-item';
        menuItem.innerHTML = `
            <div class="menu-item-content">
                <div class="menu-item-name">${item.name}</div>
                <div class="menu-item-description">${item.description}</div>
                <div class="menu-item-footer">
                    <div class="menu-item-price">₱${item.price.toFixed(2)}</div>
                    <button class="add-to-cart-btn" onclick="addToCart(${item.id})">Add</button>
                </div>
            </div>
        `;
        menuGrid.appendChild(menuItem);
    });
}


// Filter Menu
function filterMenu(category) {
    document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
    renderMenu(category);
}


// Add to Cart
function addToCart(itemId) {
    const item = menuData.find(i => i.id === itemId);
    const cartItem = cart.find(i => i.id === itemId);


    if (cartItem) {
        cartItem.quantity++;
    } else {
        cart.push({ ...item, quantity: 1 });
    }


    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartUI();
}


// Update Cart UI
function updateCartUI() {
    const cartCount = document.getElementById('cartCount');
    const cartItems = document.getElementById('cartItems');
    const cartTotal = document.getElementById('cartTotal');
    const checkoutBtn = document.getElementById('checkoutBtn');


    cartCount.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);


    if (cart.length === 0) {
        cartItems.innerHTML = '<p class="empty-cart">Your cart is empty</p>';
        checkoutBtn.disabled = true;
    } else {
        cartItems.innerHTML = cart.map(item => `
            <div class="cart-item">
                <div class="cart-item-info">
                    <div class="cart-item-name">${item.name}</div>
                    <div class="cart-item-price">₱${item.price.toFixed(2)}</div>
                </div>
                <div class="cart-item-controls">
                    <button class="qty-btn" onclick="updateQuantity(${item.id}, -1)">−</button>
                    <span>${item.quantity}</span>
                    <button class="qty-btn" onclick="updateQuantity(${item.id}, 1)">+</button>
                    <button class="remove-btn" onclick="removeFromCart(${item.id})">Remove</button>
                </div>
            </div>
        `).join('');
        checkoutBtn.disabled = false;
    }


    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    cartTotal.textContent = `₱${total.toFixed(2)}`;


    // Update summary in checkout form
    updateOrderSummary();
}


// Update Quantity
function updateQuantity(itemId, change) {
    const item = cart.find(i => i.id === itemId);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            removeFromCart(itemId);
        } else {
            localStorage.setItem('cart', JSON.stringify(cart));
            updateCartUI();
        }
    }
}


// Remove from Cart
function removeFromCart(itemId) {
    cart = cart.filter(i => i.id !== itemId);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartUI();
}


// Toggle Cart
function toggleCart() {
    document.getElementById('cartSidebar').classList.toggle('active');
}


// Open Checkout
function openCheckout() {
    if (cart.length === 0) return;
    document.getElementById('checkoutModal').classList.add('active');
    updateOrderSummary();
}


// Close Checkout
function closeCheckout() {
    document.getElementById('checkoutModal').classList.remove('active');
}


// Update Order Summary
function updateOrderSummary() {
    const summaryItems = document.getElementById('summaryItems');
    const summaryTotal = document.getElementById('summaryTotal');


    summaryItems.innerHTML = cart.map(item => `
        <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem;">
            <span>${item.name} x${item.quantity}</span>
            <span>$${(item.price * item.quantity).toFixed(2)}</span>
        </div>
    `).join('');


    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    summaryTotal.textContent = `₱${total.toFixed(2)}`;
}


// Submit Order
function submitOrder(event) {
    event.preventDefault();


    const formData = {
        orderNumber: 'ORD-' + Date.now(),
        fullName: document.getElementById('fullName').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        address: document.getElementById('address').value,
        city: document.getElementById('city').value,
        zipcode: document.getElementById('zipcode').value,
        deliveryDate: document.getElementById('deliveryDate').value,
        deliveryTime: document.getElementById('deliveryTime').value,
        specialRequests: document.getElementById('specialRequests').value,
        paymentMethod: document.querySelector('input[name="payment"]:checked').value,
        items: cart,
        subtotal: cart.reduce((sum, item) => sum + (item.price * item.quantity), 0)
    };


    // Generate Receipt
    generateReceipt(formData);


    // Close checkout modal
    closeCheckout();


    // Show receipt modal
    document.getElementById('receiptModal').classList.add('active');


    // Clear cart
    cart = [];
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartUI();
    toggleCart();
}


// Generate Receipt
function generateReceipt(data) {
    const deliveryFee = 30.00;
    const subtotal = data.subtotal;
    const tax = subtotal * 0.1;
    const total = subtotal + deliveryFee + tax;


    document.getElementById('receiptOrderNumber').textContent = data.orderNumber;
    document.getElementById('receiptName').textContent = data.fullName;
    document.getElementById('receiptEmail').textContent = data.email;
    document.getElementById('receiptPhone').textContent = data.phone;
    document.getElementById('receiptAddress').textContent = `${data.address}, ${data.city}, ${data.zipcode}`;
    document.getElementById('receiptDate').textContent = new Date(data.deliveryDate).toLocaleDateString();
    document.getElementById('receiptTime').textContent = data.deliveryTime;


    const receiptItems = document.getElementById('receiptItems');
    receiptItems.innerHTML = data.items.map(item => `
        <tr>
            <td>${item.name}</td>
            <td>${item.quantity}</td>
            <td>₱${item.price.toFixed(2)}</td>
            <td>₱${(item.price * item.quantity).toFixed(2)}</td>
        </tr>
    `).join('');


    document.getElementById('receiptSubtotal').textContent = `₱${subtotal.toFixed(2)}`;
    document.getElementById('receiptDeliveryFee').textContent = `₱${deliveryFee.toFixed(2)}`;
    document.getElementById('receiptTax').textContent = `₱${tax.toFixed(2)}`;
    document.getElementById('receiptTotalAmount').textContent = `₱${total.toFixed(2)}`;
    document.getElementById('receiptPaymentMethod').textContent = data.paymentMethod.replace('-', ' ').toUpperCase();
}


// Close Receipt
function closeReceipt() {
    document.getElementById('receiptModal').classList.remove('active');
}


// Print Receipt
function printReceipt() {
    window.print();
}


// Start New Order
function startNewOrder() {
    closeReceipt();
    document.getElementById('checkoutForm').reset();
    document.getElementById('cartSidebar').classList.remove('active');
}


// Handle Contact Form
function handleContactForm(event) {
    event.preventDefault();
    alert('Thank you for your message! We will get back to you soon.');
    event.target.reset();
}

