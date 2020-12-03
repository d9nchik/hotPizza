require('babel-polyfill');

(function () {
    document.body.innerHTML = `<div>
      <header><a id="cart"><span id="numberOfCartItems">00</span></a></nav></header>
      <main></main>
    </div>`;
    jest.mock('../getJson');
})();

Element.prototype.scrollTo = () => {};
test('test load', () => {
    expect(true).toBeTruthy();
});
