import './setup.test';
import { luna, checkExpireDate, orderDateCheck } from '../order';
import { routing } from '../routing';
import { CART } from '../cart';
import { mockFunction } from '../__mocks__/sendData';

jest.mock('../sendData', () => {
    return {
        sendData(data, success) {
            mockFunction(data);
            success('112');
        },
    };
});

test('test order', () => {
    expect(CART.isEmpty()).toBeTruthy();
    CART.addToCart('peperoni_bluz', 2);
    routing.openLink('order');

    const form = document.getElementsByTagName('form')[0];
    form.submit();
    expect(mockFunction).toHaveBeenCalledTimes(0);

    document.getElementById('firstName').value = '1';
    document.getElementById('lastName').value = '2';
    document.getElementById('email').value = 'smb@gmail.com';
    document.getElementById('address').value = 'adress';
    document.getElementById('address2').value = 'adress2';
    document.getElementById('zip').value = '43004';
    document.getElementById('phone').value = '0965881523';
    document.getElementById('date').value = '2030-10-01';
    document.getElementById('time').value = '12:20';
    document.getElementById('cc-name').value = '1';
    document.getElementById('cc-number').value = '4234234234324320';
    document.getElementById('cc-expiration').value = '12/25';
    document.getElementById('cc-cvv').value = '234';
    form.submit();

    expect(mockFunction).toHaveBeenCalledTimes(1);
    expect(mockFunction.mock.calls[0][0]).toEqual({
        address: 'adress',
        address2: 'adress2',
        cart: {
            peperoni_bluz: 2,
        },
        'cc-cvv': '234',
        'cc-expiration': '12/25',
        'cc-name': '1',
        'cc-number': '4234234234324320',
        date: '2030-10-01',
        email: 'smb@gmail.com',
        firstName: '1',
        lastName: '2',
        paymentMethod: '0',
        phone: '0965881523',
        'same-address': false,
        'save-info': false,
        time: '12:20',
        zip: '43004',
    });
});
test('test luna', () => {
    expect(luna('4234234234324320')).toBeTruthy();
    expect(luna('4234234234324321')).toBeFalsy();
});

test('test check expire', () => {
    expect(checkExpireDate('12/25')).toBeTruthy();
    expect(checkExpireDate('13/25')).toBeFalsy();
    expect(checkExpireDate('11/20')).toBeFalsy();
});

test('test check order date', () => {
    expect(orderDateCheck('2020-10-11', '12:25')).toBeFalsy();
    expect(orderDateCheck('2025-10-11', '12:25')).toBeTruthy();
});
