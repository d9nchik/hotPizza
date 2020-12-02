import './setup.test';
import { CART } from '../cart';

beforeEach(() => {
    document.body.innerHTML = `<div>
<header><a id="cart"><span id="numberOfCartItems">00</span></a></nav></header>
<main></main>
</div>`;
    CART.clearCart();
});

require('babel-polyfill');

jest.mock('../getJson');

test('test adding ability', () => {
    expect(CART.calculateNumberOfItemsInCart()).toBe(0);
    CART.addToCart('banana', 1);
    expect(CART['banana']).toBe(1);
    expect(CART.calculateNumberOfItemsInCart()).toBe(1);
    CART.addToCart('foo', 'qwe');
    expect(CART.calculateNumberOfItemsInCart()).toBe(1);
});

test('test clear of cart', () => {
    expect(CART.calculateNumberOfItemsInCart()).toBe(0);
    CART.addToCart('banana', 1);
    CART.clearCart();
    expect(CART.calculateNumberOfItemsInCart()).toBe(0);
    expect(CART['banana']).toBe(undefined);
});

test('test isEmpty', () => {
    expect(CART.isEmpty()).toBeTruthy();
    CART.addToCart('banana', 1);
    expect(CART.isEmpty()).toBeFalsy();
    CART.clearCart();
    expect(CART.isEmpty()).toBeTruthy();
});

test('test remove from cart', () => {
    CART.addToCart('banana', 1);
    CART.addToCart('apple', 2);
    expect(CART.calculateNumberOfItemsInCart()).toBe(3);
    CART.removeFromCart('banana');
    expect(CART.calculateNumberOfItemsInCart()).toBe(2);
});

test('test number of items', () => {
    expect(CART.calculateNumberOfItemsInCart()).toBe(0);
    CART.addToCart('banana', 1);
    expect(CART.calculateNumberOfItemsInCart()).toBe(1);
});
