// ===== SHOPPING CART SYSTEM - BEAN & BLISS =====

// Get cart from localStorage
function getCart() {
    const cart = localStorage.getItem('beanBlissCart');
    return cart ? JSON.parse(cart) : [];
}

// Save cart to localStorage
function saveCart(cart) {
    localStorage.setItem('beanBlissCart', JSON.stringify(cart));
    updateCartBadge();
}

// Add item to cart
function addToCart(name, price, image) {
    let cart = getCart();
    
    // Check if item already exists
    const existingItem = cart.find(item => item.name === name);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: Date.now(),
            name: name,
            price: price,
            image: image,
            quantity: 1
        });
    }
    
    saveCart(cart);
    showAddToCartNotification(name);
}

// Show notification when item is added
function showAddToCartNotification(itemName) {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = 'cart-notification';
    notification.innerHTML = `
        <i class="fas fa-check-circle"></i>
        <span>${itemName} added to cart!</span>
    `;
    
    document.body.appendChild(notification);
    
    // Show notification
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    // Hide and remove notification
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 2500);
}

// Update cart badge
function updateCartBadge() {
    const cart = getCart();
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const badges = document.querySelectorAll('#cartBadge, .cart-badge');
    
    badges.forEach(badge => {
        if (badge) {
            badge.textContent = totalItems;
            badge.style.display = totalItems > 0 ? 'flex' : 'none';
        }
    });
}

// Remove item from cart
function removeFromCart(itemId) {
    let cart = getCart();
    cart = cart.filter(item => item.id !== itemId);
    saveCart(cart);
    displayCartItems();
}

// Update item quantity
function updateQuantity(itemId, change) {
    let cart = getCart();
    const item = cart.find(item => item.id === itemId);
    
    if (item) {
        item.quantity += change;
        
        if (item.quantity <= 0) {
            removeFromCart(itemId);
        } else {
            saveCart(cart);
            displayCartItems();
        }
    }
}

// Calculate total
function calculateTotal() {
    const cart = getCart();
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    // Check if delivery is selected
    const deliveryRadio = document.querySelector('input[name="orderType"]:checked');
    const deliveryFee = (deliveryRadio && deliveryRadio.value === 'delivery') ? 15 : 0;
    
    const total = subtotal + deliveryFee;
    
    return {
        subtotal: subtotal,
        deliveryFee: deliveryFee,
        total: total
    };
}

// Display cart items on order page
function displayCartItems() {
    const cart = getCart();
    const cartItemsDiv = document.getElementById('cartItems');
    const emptyCartDiv = document.getElementById('emptyCart');
    const cartContentDiv = document.getElementById('cartContent');
    
    if (!cartItemsDiv) return; // Not on order page
    
    if (cart.length === 0) {
        emptyCartDiv.style.display = 'block';
        cartContentDiv.style.display = 'none';
        return;
    }
    
    emptyCartDiv.style.display = 'none';
    cartContentDiv.style.display = 'block';
    
    cartItemsDiv.innerHTML = cart.map(item => `
        <div class="cart-item">
            <img src="${item.image}" alt="${item.name}">
            <div class="cart-item-details">
                <h4>${item.name}</h4>
                <p class="item-price">${item.price} DH</p>
            </div>
            <div class="cart-item-quantity">
                <button onclick="updateQuantity(${item.id}, -1)" class="qty-btn">
                    <i class="fas fa-minus"></i>
                </button>
                <span class="qty-display">${item.quantity}</span>
                <button onclick="updateQuantity(${item.id}, 1)" class="qty-btn">
                    <i class="fas fa-plus"></i>
                </button>
            </div>
            <div class="cart-item-total">
                <p>${item.price * item.quantity} DH</p>
                <button onclick="removeFromCart(${item.id})" class="btn-remove">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        </div>
    `).join('');
    
    updateCartSummary();
}

// Update cart summary
function updateCartSummary() {
    const totals = calculateTotal();
    
    const subtotalEl = document.getElementById('subtotal');
    const deliveryFeeEl = document.getElementById('deliveryFee');
    const totalPriceEl = document.getElementById('totalPrice');
    const finalTotalEl = document.getElementById('finalTotal');
    
    if (subtotalEl) subtotalEl.textContent = totals.subtotal.toFixed(2) + ' DH';
    if (deliveryFeeEl) deliveryFeeEl.textContent = totals.deliveryFee.toFixed(2) + ' DH';
    if (totalPriceEl) totalPriceEl.textContent = totals.total.toFixed(2) + ' DH';
    if (finalTotalEl) finalTotalEl.textContent = totals.total.toFixed(2) + ' DH';
}

// Toggle delivery address field
function toggleDelivery() {
    const deliveryAddressDiv = document.getElementById('deliveryAddress');
    const deliveryRadio = document.querySelector('input[value="delivery"]:checked');
    const addressInput = document.getElementById('address');
    
    if (deliveryRadio) {
        deliveryAddressDiv.style.display = 'block';
        addressInput.required = true;
    } else {
        deliveryAddressDiv.style.display = 'none';
        addressInput.required = false;
    }
    
    updateCartSummary(); // Update total when delivery option changes
}

// Proceed to checkout
function proceedToCheckout() {
    const cart = getCart();
    
    if (cart.length === 0) {
        alert('Your cart is empty! Please add items before checkout.');
        return;
    }
    
    // Hide cart, show checkout form
    document.querySelector('.cart-container').style.display = 'none';
    document.getElementById('checkoutForm').style.display = 'block';
    
    // Display order summary in form
    displayOrderSummary();
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Back to cart
function backToCart() {
    document.querySelector('.cart-container').style.display = 'grid';
    document.getElementById('checkoutForm').style.display = 'none';
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Display order summary in checkout form
function displayOrderSummary() {
    const cart = getCart();
    const orderSummaryDiv = document.getElementById('orderSummaryItems');
    
    if (!orderSummaryDiv) return;
    
    orderSummaryDiv.innerHTML = cart.map(item => `
        <div class="summary-item">
            <span>${item.name} x${item.quantity}</span>
            <span>${(item.price * item.quantity).toFixed(2)} DH</span>
        </div>
    `).join('');
    
    updateCartSummary();
}

// Handle form submission
if (document.getElementById('orderForm')) {
    document.getElementById('orderForm').addEventListener('submit', function(e) {
        e.preventDefault();
        
        const cart = getCart();
        const formData = new FormData(this);
        
        // Get form values
        const orderData = {
            customer: {
                firstName: formData.get('firstName'),
                lastName: formData.get('lastName'),
                email: formData.get('email'),
                phone: formData.get('phone')
            },
            orderType: formData.get('orderType'),
            address: formData.get('address'),
            date: formData.get('pickupDate'),
            time: formData.get('pickupTime'),
            instructions: formData.get('instructions'),
            items: cart,
            totals: calculateTotal()
        };
        
        console.log('Order placed:', orderData);
        
        // Show success message
        alert(`Thank you ${orderData.customer.firstName}! Your order has been confirmed.\n\nTotal: ${orderData.totals.total.toFixed(2)} DH\n\nYou will receive a confirmation email at ${orderData.customer.email}`);
        
        // Clear cart
        localStorage.removeItem('beanBlissCart');
        updateCartBadge();
        
        // Redirect to home
        setTimeout(() => {
            window.location.href = '../index.html';
        }, 1000);
    });
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    updateCartBadge();
    
    // If on order page, display cart
    if (document.getElementById('cartItems')) {
        displayCartItems();
    }
    
    // Set minimum date to today
    const dateInput = document.getElementById('pickupDate');
    if (dateInput) {
        const today = new Date().toISOString().split('T')[0];
        dateInput.setAttribute('min', today);
    }
});

// Update cart summary when delivery option changes
const orderTypeRadios = document.querySelectorAll('input[name="orderType"]');
orderTypeRadios.forEach(radio => {
    radio.addEventListener('change', updateCartSummary);
});