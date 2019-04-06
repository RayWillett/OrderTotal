let CartFactory = require('./CartFactory'),
    promotions = require('./data/promotions.json'),
    products = require('./data/products.json'),
    cart;

function prettifyJSON(jsonObject) {
    const indentLevel = 4;
    return JSON.stringify(jsonObject, undefined, indentLevel);
}

function showError(target) {
    target.classList.add('error');
}

function hideError(target) {
    target.classList.remove('error');
}

function updateOrderTotal($, cart) {
    $('#order-total').textContent = cart.getPretaxTotal();
    let itemsInCartHTML = '';
    Object.keys(cart.productLineItems).forEach( (productID) => {
        const quantity = cart.productLineItems[productID].quantity;
        itemsInCartHTML += `<li class="item"><span class="id">${productID}</span><span class="qty">${quantity}</span></li>`;
    });
    $('#items-in-cart').innerHTML = itemsInCartHTML;
}

function clearCart($) {
    promotions = JSON.parse($('#promotions').value);
    products = JSON.parse($('#products').value);
    initializeCart($);
    alert('The Cart object has been reset.');
}

function initializeCartDom($) {
    $('#promotions').value = prettifyJSON(promotions);
    $('#products').value = prettifyJSON(products);
}

function initializeEventListeners ($) {
    $('#add-to-cart').addEventListener('submit', (e) => {
        e.preventDefault();
        const form = e.target;
            productID = form.product_id.value,
            productQuantity = Number(form.product_qty.value);
        try {
            cart.addItem(productID, productQuantity);
        } catch (err) {
            alert(err.message);
        }
        updateOrderTotal($, cart);
    });

    $('[name="remove"]').addEventListener('click', (e) => {
        e.preventDefault();
        let form = $('#add-to-cart'),
            productID = form.product_id.value,
            productQuantity;
        try {
            productQuantity = Number(form.product_qty.value);
        } catch (err) {
            productQuantity = null;
        }
        cart.removeItem(productID, productQuantity);
        updateOrderTotal($, cart);
    });

    $('#clear-cart').addEventListener('click', (e) => {
        e.preventDefault();
        clearCart($);
    });

    document.querySelectorAll('textarea').forEach( node => {
        node.addEventListener('change', (e) => {
            let target = e.target;
            try {
                let newValue = JSON.parse(target.value);
                newValue = prettifyJSON(newValue);
                target.value = newValue;
                hideError(target);
                clearCart($);
            } catch (err) {
                alert(err.message);
                showError(target);
            }
        });
    });
}

function initializeCart($) {
    cart = CartFactory(products, promotions);
    updateOrderTotal($, cart);
}

function main ($) {
    initializeCartDom($);
    initializeEventListeners($);
    initializeCart($);
}

document.addEventListener('DOMContentLoaded', function () {
    const $ = document.querySelector.bind(document);
    main($);
});