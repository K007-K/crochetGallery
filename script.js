let searchform = document.querySelector('.search-form');
document.querySelector('#search-btn').onclick=()=>
{
    searchform.classList.toggle('active');
    shoppingcart.classList.remove('active');
    logincart.classList.remove('active');
    navbar.classList.remove('active');
}

let shoppingcart = document.querySelector('.shopping-cart');
document.querySelector('#cart-btn').onclick=()=>
{
    searchform.classList.remove('active');
    shoppingcart.classList.toggle('active');
    logincart.classList.remove('active');
    navbar.classList.remove('active');
}

let logincart = document.querySelector('.login-form');
document.querySelector('#login-btn').onclick=()=>
{
    searchform.classList.remove('active');
    shoppingcart.classList.remove('active');
    logincart.classList.toggle('active');
    navbar.classList.remove('active');
}

let navbar = document.querySelector('.navbar');
document.querySelector('#menu-btn').onclick=()=>
{
    searchform.classList.remove('active');
    shoppingcart.classList.remove('active');
    logincart.classList.remove('active');
    navbar.classList.toggle('active');
}

window.onscroll=()=>
{
    searchform.classList.remove('active');
    shoppingcart.classList.remove('active');
    logincart.classList.remove('active');
    navbar.classList.remove('active');
}

