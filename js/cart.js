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

export {CART};