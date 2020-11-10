import {CART} from './cart.js';
import {routing} from "./routing.js";

console.log('Hello world');
CART.show();
routing.openLink('');
setTimeout(() => CART.addToCart('hi', 12), 2_000);