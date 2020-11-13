import {CART} from "./cart.js";
import {routing} from "./routing.js";
import {promisedProducts} from "./getJson.js";
import {MAIN, clearMain} from "./renderHelp.js";


promisedProducts.then(promisedProducts => {
    routing.addLink('order', makeOrder);

    function makeOrder() {
        var availableKeys = Object.keys(CART).filter(key => CART[key] > 0);
        if (availableKeys.length === 0) {
            routing.openLink('');
            return;
        }
        clearMain();
        var container = document.createElement('div');
        container.setAttribute('class', 'container');
        MAIN.appendChild(container);

        var row = document.createElement('div');
        row.setAttribute('class', 'row');
        container.appendChild(row);

        var yourCart = document.createElement('div');
        yourCart.setAttribute('class', 'col-md-4 order-md-2 mb-4');
        row.appendChild(yourCart);

        var titleOfCart = document.createElement('h4');
        titleOfCart.setAttribute('class', 'd-flex justify-content-between align-items-center mb-3');
        yourCart.appendChild(titleOfCart);
        var spanTitle = document.createElement('span');
        spanTitle.setAttribute('class', 'text-muted');
        spanTitle.textContent = 'Ваша корзина';
        titleOfCart.appendChild(spanTitle);
        var numberOfItemsSpan = document.createElement('span');
        numberOfItemsSpan.setAttribute('class', 'badge badge-secondary badge-pill');
        numberOfItemsSpan.textContent = CART.calculateNumberOfItemsInCart();
        titleOfCart.appendChild(numberOfItemsSpan);

        var list = document.createElement('ul');
        list.setAttribute('class', 'list-group mb-3');
        yourCart.appendChild(list);
        var totalPrice = 0;
        promisedProducts.filter(product => Object.keys(CART).includes(product.url)).forEach(product => {
            if (!availableKeys.includes(product.url)) {
                return;
            }
            var li = document.createElement('li');
            li.setAttribute('class', 'list-group-item d-flex justify-content-between lh-condensed');
            list.appendChild(li);

            var div = document.createElement('div');
            li.appendChild(div);
            var h6 = document.createElement('h6');
            div.appendChild(h6);
            h6.setAttribute('class', 'my-0');
            h6.textContent = product.productName;
            var small = document.createElement('small');
            div.appendChild(small);
            small.setAttribute('class', 'text-muted');
            small.textContent = `${CART[product.url]} X ${product.price}грн.`;

            const itemsPrice = CART[product.url] * product.price;
            var span = document.createElement('span');
            li.appendChild(span);
            span.setAttribute('class', 'text-muted');
            span.textContent = `${itemsPrice} грн.`;
            totalPrice += itemsPrice;
        });

        var totalListItem = document.createElement('li');
        list.appendChild(totalListItem);
        totalListItem.setAttribute('class', 'list-group-item d-flex justify-content-between');
        var totalListItemSpan = document.createElement('span');
        totalListItem.appendChild(totalListItemSpan);
        totalListItemSpan.textContent = 'В сумме(грн):';
        var totalListItemStrong = document.createElement('strong');
        totalListItem.appendChild(totalListItemStrong);
        totalListItemStrong.textContent = totalPrice;
    }
});
