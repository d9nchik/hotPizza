beforeAll(() => {
    document.body.innerHTML = `<div>
<header><a id="cart"><span id="numberOfCartItems">00</span></a></nav></header>
<main></main>
</div>`;
});
import './setup.test';
import { CART } from '../cart';

require('babel-polyfill');

jest.mock('../getJson');

test('test adding ability', () => {
    document.getElementsByTagName('main')[0];
    require('../renderHelp');
    CART.addToCart('banana', 1);
    expect(CART['banana']).toBe(1);
});
