import {CART} from './cart.js';

console.log('Hello world');
CART.show();
setTimeout(() => CART.addToCart('hi', 12), 2_000);