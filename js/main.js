import {CART} from './cart.js';
import {routing} from "./routing.js";

console.log('Hello world');
CART.show();
setTimeout(() => CART.addToCart('hi', 12), 2_000);
routing.openLink('');
