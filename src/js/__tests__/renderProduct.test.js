import './setup.test';
import '../renderProduct';
import { routing } from '../routing';

test('test opening of related products', () => {
    routing.openLink('product/peperoni_bluz');
    document
        .querySelector(
            'div.col-lg-3.col-md-3.col-sm-12.d-md-flex.justify-content-md-between.flex-column.mb-1'
        )
        .onclick();
    expect(routing.opened).toBe('product/texas');
});

import { CART } from '../cart';

test('adding pizzas to cart', () => {
    routing.openLink('product/peperoni_bluz');
    expect(CART.isEmpty()).toBeTruthy();
    document.getElementById('numberOfPizzas').value = 5;
    document.getElementById('addToCartButton').click();
    expect(CART.isEmpty()).toBeFalsy();
    expect(CART['peperoni_bluz']).toBe(5);
    CART.clearCart();
    document.getElementById('numberOfPizzas').value = 13;
    document.getElementById('addToCartButton').click();
    expect(CART.isEmpty()).toBeTruthy();
    document.getElementById('numberOfPizzas').value = -1;
    document.getElementById('addToCartButton').click();
    expect(CART.isEmpty()).toBeTruthy();
});
