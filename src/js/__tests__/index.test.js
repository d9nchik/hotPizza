import './setup.test';
import '../../index';

import { routing } from '../routing';

jest.mock('../../main.css', () => {});
test('test opening promotions', () => {
    routing.openLink('');
    document.querySelector('div.scroll-promotion').click();
    expect(routing.opened).toBe('action/crazy-tuesday');
});
