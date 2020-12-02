import './setup.test';
import { CART } from '../cart';
import { routing } from '../routing';
import { MAIN } from '../renderHelp';

beforeEach(() => {
    CART.clearCart();
});

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

test('test show', () => {
    expect(document.getElementById('numberOfCartItems').innerHTML).toBe('0');
    CART.addToCart('banana', 1);
    expect(document.getElementById('numberOfCartItems').innerHTML).toBe('1');
});

test('cart display', () => {
    routing.openLink('cart');
    expect(MAIN.innerHTML).toBe('');
    CART.addToCart('peperoni_bluz', 1);
    routing.openLink('cart');
    document.getElementsByTagName('button')[0].onclick();
    expect(CART.isEmpty()).toBeTruthy();
});
