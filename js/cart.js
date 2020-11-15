const localStorageKey = 'cart';
const cartInfo = document.getElementById('numberOfCartItems');

var cartProto = {
    * [Symbol.iterator]() {
        for (let key of Object.keys(this)) {
            yield key;
        }
    },

    calculateNumberOfItemsInCart() {
        var total = 0;
        for (let key of this) {
            total += this[key];
        }
        return total;
    },

    saveCart() {
        localStorage.setItem(localStorageKey, JSON.stringify(this));
        this.show();
    },

    addToCart(index, quantity) {
        if (!quantity || Number.isNaN(quantity = Number(quantity))) {
            return;
        }
        if (this[index] == null) {
            this[index] = 0;
        }
        this[index] += quantity;
        this.saveCart();
    },

    removeFromCart(index) {
        delete this[index];
        this.saveCart();
    },

    clearCart() {
        for (let key of this) {
            delete this[key];
        }
        this.saveCart();
    },
    show() {
        cartInfo.innerHTML = '';
        cartInfo.appendChild(document.createTextNode(this.calculateNumberOfItemsInCart()));
    },

    isEmpty() {
        return Object.keys(this).length === 0;
    }
}

const CART = (function getItemsOfPreviousSession() {
    var result = localStorage.getItem(localStorageKey);
    if (result == null) {
        return {};
    }
    return JSON.parse(result);
})();

Object.setPrototypeOf(CART, cartProto);

CART.show();

export {CART};
import {promisedProducts} from './getJson.js';
import {clearMain, MAIN} from './renderHelp.js';
import {routing} from './routing.js';

promisedProducts.then((promisedProducts) => {
    routing.addLink('cart', openCart)

    function openCart() {
        if (CART.isEmpty()) {
            clearMain();
            routing.openLink('');
            return;
        }
        clearMain();
        const container = document.createElement('div');
        MAIN.appendChild(container);
        container.setAttribute('class', 'container');

        var headingElement = document.createElement('h1');
        headingElement.textContent = 'Корзина';
        container.appendChild(headingElement);

        const row = document.createElement('div');
        container.appendChild(row);
        row.setAttribute('class', 'row');

        const makeOrder = document.createElement('a');
        // <button type="button" class="btn btn-outline-dark">Dark</button>
        container.appendChild(makeOrder);
        makeOrder.setAttribute('class', 'btn btn-outline-dark text-center mb-1');
        makeOrder.setAttribute('href', '#order');
        makeOrder.textContent = 'Заказать';

        promisedProducts.filter(product => Object.keys(CART).includes(product.url)).forEach(product => {
            var card = document.createElement('div');
            row.appendChild(card);
            card.setAttribute('class', 'col-lg-3 col-md-4 col-sm-6')

            var img = document.createElement('img');
            card.appendChild(img);
            img.setAttribute('src', product.images[0]);
            img.setAttribute('alt', product.productName);
            img.setAttribute('class', 'btn btn-light card-img-top');
            img.onclick = () => routing.openLink(`product/${product.url}`);

            var cardBody = document.createElement('div');
            card.appendChild(cardBody);
            cardBody.setAttribute('class', 'card-body');

            var cardTitle = document.createElement('h5');
            cardBody.appendChild(cardTitle);
            cardTitle.setAttribute('class', 'card-title');
            cardTitle.textContent = product.productName;

            var cardText = document.createElement('p');
            cardBody.appendChild(cardText);
            cardText.setAttribute('class', 'card-text');
            cardText.textContent = `${CART[product.url]} X ${product.price}грн. = 
            ${(CART[product.url] * product.price).toFixed(2)}грн.`;

            var buttonElement = document.createElement('button');
            cardBody.appendChild(buttonElement);
            buttonElement.setAttribute('class', 'btn btn-primary');
            buttonElement.onclick = () => {
                CART.removeFromCart(product.url);
                CART.saveCart();
                routing.openLink('cart');
            }
            buttonElement.textContent = 'Удалить из корзины';
        })
    }
});