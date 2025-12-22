let searchform = document.querySelector('.search-form');
let shoppingcart = document.querySelector('.shopping-cart');
let logincart = document.querySelector('.login-form');
let navbar = document.querySelector('.navbar');

document.querySelector('#search-btn').onclick = () => {
    searchform.classList.toggle('active');
    shoppingcart.classList.remove('active');
    logincart.classList.remove('active');
    navbar.classList.remove('active');
};

document.querySelector('#cart-btn').onclick = () => {
    searchform.classList.remove('active');
    shoppingcart.classList.toggle('active');
    logincart.classList.remove('active');
    navbar.classList.remove('active');
};

document.querySelector('#login-btn').onclick = () => {
    searchform.classList.remove('active');
    shoppingcart.classList.remove('active');
    logincart.classList.toggle('active');
    navbar.classList.remove('active');
};

document.querySelector('#menu-btn').onclick = () => {
    searchform.classList.remove('active');
    shoppingcart.classList.remove('active');
    logincart.classList.remove('active');
    navbar.classList.toggle('active');
};

window.onscroll = () => {
    searchform.classList.remove('active');
    shoppingcart.classList.remove('active');
    logincart.classList.remove('active');
    navbar.classList.remove('active');
};

// ===== CART FUNCTIONALITY =====
let cart = [];
const cartItemsEl = document.getElementById('cart-items');
const cartEmptyEl = document.getElementById('cart-empty');
const cartTotalEl = document.getElementById('cart-total');

const addToCartBtns = document.querySelectorAll('.add-to-cart');

addToCartBtns.forEach(btn => {
    btn.addEventListener('click', function () {
        const box = this.closest('.box');
        const name = box.dataset.name;
        const price = parseFloat(box.dataset.price);
        const imgSrc = box.querySelector('img').src;

        addToCart(name, price, imgSrc);

        // Show the cart automatically
        shoppingcart.classList.add('active');
    });
});

function addToCart(name, price, imgSrc) {
    const existing = cart.find(item => item.name === name);

    if (existing) {
        existing.qty++;
    } else {
        cart.push({ name, price, qty: 1, imgSrc });
    }

    updateCartUI();
}

function removeFromCart(name) {
    cart = cart.filter(item => item.name !== name);
    updateCartUI();
}

function updateCartUI() {
    cartItemsEl.innerHTML = '';

    if (cart.length === 0) {
        cartEmptyEl.style.display = 'block';
        cartTotalEl.textContent = 0;
    } else {
        cartEmptyEl.style.display = 'none';
        let total = 0;

        cart.forEach(item => {
            total += item.price * item.qty;

            const cartItem = document.createElement('div');
            cartItem.classList.add('cart-item');
            cartItem.innerHTML = `
                <img src="${item.imgSrc}" alt="${item.name}" class="cart-img">
                <div class="cart-info">
                    <p>${item.name} x ${item.qty}</p>
                    <p>$${(item.price * item.qty).toFixed(2)}</p>
                </div>
                <button class="delete-btn">&times;</button>
            `;

            cartItemsEl.appendChild(cartItem);

            // Delete button event
            cartItem.querySelector('.delete-btn').addEventListener('click', () => {
                removeFromCart(item.name);
            });
        });

        cartTotalEl.textContent = total.toFixed(2);
    }
}
