import './setup.test';

import { routing } from '../routing';

test('test hash change', () => {
    let iShouldBeTrue = false;
    routing.addLink('oops', () => {
        iShouldBeTrue = true;
    });
    location.hash = 'oops';
    window.onhashchange();
    expect(iShouldBeTrue).toBeTruthy();
    routing.removeLink('oops');
});

test('test removeLink', () => {
    routing.addLink('smth', () => 0);
    routing.removeLink('smth');
    expect(routing.links).toEqual({});
});

test('test open not correct link', () => {
    routing.addLink('', () => 1);

    routing.openLink('fsdjkfjsdk');
    expect(routing.timerInvalidRedirection).toBeTruthy();
});
