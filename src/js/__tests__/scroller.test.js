import './setup.test';
import '../../index';
import { routing } from '../routing';
import { nextSlide, previousSlide } from '../scroller';

jest.mock('../../main.css', () => {});

test('test animation', () => {
    routing.openLink('');
    nextSlide();
    let element = document.getElementById('scroll-promotions');
    expect(element.style['_values']['margin-left']).toBe('-100%');
    previousSlide();
    expect(element.style['_values']['margin-left']).toBe('0%');
    previousSlide();
    expect(element.style['_values']['margin-left']).toBe('0%');
});
