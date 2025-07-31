

// Global cart loaded from localStorage
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Add to cart from menu
function addToCart(button) {
  const itemEl = button.closest('.menu-item');
  const id = itemEl.dataset.id.toString(); // force string ID for consistency

  const name = itemEl.dataset.name;
  const price = parseFloat(itemEl.dataset.price);
  const image = itemEl.dataset.image;

  const existingItem = cart.find(item => item.id === id);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({ id, name, price, image, quantity: 1 });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
}

// Add to cart from search
function addToCartFromSearch(name, image, price) {
  const id = name.toLowerCase().replace(/\s+/g, '-'); // consistent id for search items
  const existing = cart.find(item => item.id === id);
  if (existing) {
    existing.quantity++;
  } else {
    cart.push({ id, name, image, price, quantity: 1 });
  }
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
  alert(`${name} added to cart!`);
}

// Render the cart
function renderCart() {
  const container = document.getElementById('cart-items');
  container.innerHTML = '';
  cart.forEach(item => {
    const itemHTML = `
      <div class="cart-item" data-id="${item.id}">
        <img src="${item.image}" alt="${item.name}">
        <span id = "itemName">${item.name}</span>
        <div class="qty-wrapper">
          <button class="quantity-btn" onclick="updateQuantity('${item.id}', -1)">−</button>
          <span>${item.quantity}</span>
          <button class="quantity-btn" onclick="updateQuantity('${item.id}', 1)">+</button>
        </div>
        <span>₹${(item.price * item.quantity).toFixed(2)}</span>
        <button class="remove-btn" onclick="removeItem('${item.id}')">Remove</button>
      </div>
    `;
    container.innerHTML += itemHTML;
  });

  updateTotals();
}

// Update quantity
function updateQuantity(id, delta) {
  const index = cart.findIndex(item => item.id === id);
  if (index !== -1) {
    cart[index].quantity += delta;
    if (cart[index].quantity < 1) {
      cart.splice(index, 1);
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    renderCart();
  }
}

// Remove item
function removeItem(id) {
  cart = cart.filter(item => item.id !== id);
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
}

// Update totals
function updateTotals() {
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const discount = subtotal * 0.1;
  const total = subtotal - discount;

  document.getElementById('subtotal').textContent = subtotal.toFixed(2);
  document.getElementById('discount').textContent = discount.toFixed(2);
  document.getElementById('total').textContent = total.toFixed(2);
}

// Payment logic
function proceedToPayment() {
  if (cart.length === 0) {
    alert("Your cart is empty!");
    return;
  }

  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const discount = total * 0.1;
  const finalAmount = total - discount;

  localStorage.setItem('finalAmount', finalAmount.toFixed(2));

  window.location.href = 'payment/payment.html';
}

// Initialize on load
document.addEventListener("DOMContentLoaded", () => {
  cart = JSON.parse(localStorage.getItem("cart")) || [];
  renderCart();

  // Cart drawer open/close
  const cartToggle = document.getElementById('cart-toggle');
  const cartDrawer = document.getElementById('cart-drawer');
  const closeCartBtn = document.getElementById('close-cart');

  cartToggle?.addEventListener('click', e => {
    e.preventDefault();
    cartDrawer.classList.add('active');
  });

  closeCartBtn?.addEventListener('click', () => {
    cartDrawer.classList.remove('active');
  });
});
