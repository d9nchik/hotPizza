import './setup.test';

import { displayProduct } from '../catalog';
import { routing } from '../routing';

test('test display product', () => {
    let row = document.createElement('div');
    let product = {
        images: ['url_to_image1', 'url_to_image2'],
        productName: 'test_name',
        price: 123,
        weight: 122,
        url: 'product',
    };
    let isOpenedLink = false;
    routing.addLink('product/product', () => {
        isOpenedLink = true;
    });
    displayProduct(row, product);
    expect(row.innerHTML).toBe(
        '<div class="col-lg-3 col-md-4 col-sm-6"><img src="url_to_image1" alt="test_name" class="card-img-top"><div class="card-body"><h5 class="card-title">test_name</h5><p class="card-text">123грн.; Вес: 122г</p><button class="btn btn-secondary stretched-link">Просмотреть</button></div></div>'
    );
    expect(row.getElementsByTagName('img')[0].getAttribute('src')).toBe(
        'url_to_image1'
    );
    expect(row.getElementsByTagName('img')[0].getAttribute('alt')).toBe(
        'test_name'
    );
    row.getElementsByTagName('button')[0].onclick();
    expect(isOpenedLink).toBe(true);
    routing.removeLink('product');
});

test('open catalog', () => {
    routing.openLink('catalog');
    document.getElementsByTagName('h2')[0].click();
    expect(routing.opened).toBe('catalog/classic');
});

test('test categories', () => {
    routing.openLink('catalog/classic');
    expect(document.getElementsByTagName('h1')[0].textContent).toBe(
        'Классические'
    );
});
