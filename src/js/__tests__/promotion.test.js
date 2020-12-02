import './setup.test';
import '../promotion';
import { routing } from '../routing';

test('test promotion', () => {
    routing.openLink('action/crazy-tuesday');
    expect(document.getElementsByTagName('h1')[0].innerHTML).toBe(
        'Сумасшедший вторник!'
    );
    expect(document.getElementsByTagName('img')[0].getAttribute('src')).toBe(
        'img/sales/crazy-tuesday.jpg'
    );
});
