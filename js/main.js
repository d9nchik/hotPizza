import {CART} from './cart.js';
import {routing} from "./routing.js";
import {promisedIngredients, promisedProducts} from "./getJson.js";

console.log('Hello world');
CART.show();
routing.openLink('');
promisedProducts.then((data) => console.log(data));
promisedIngredients.then((data) => console.log(data));