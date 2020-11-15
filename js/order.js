import {CART} from "./cart.js";
import {routing} from "./routing.js";
import {promisedProducts} from "./getJson.js";
import {clearMain, MAIN} from "./renderHelp.js";


promisedProducts.then(promisedProducts => {
    routing.addLink('order', makeOrder);

    function makeOrder() {
        var availableKeys = Object.keys(CART).filter(key => CART[key] > 0);
        if (availableKeys.length === 0) {
            routing.openLink('');
            return;
        }
        clearMain();
        var container = document.createElement('div');
        container.setAttribute('class', 'container');
        MAIN.appendChild(container);

        var row = document.createElement('div');
        row.setAttribute('class', 'row');
        container.appendChild(row);

        var yourCart = document.createElement('div');
        yourCart.setAttribute('class', 'col-md-4 order-md-2 mb-4');
        row.appendChild(yourCart);

        var titleOfCart = document.createElement('h4');
        titleOfCart.setAttribute('class', 'd-flex justify-content-between align-items-center mb-3');
        yourCart.appendChild(titleOfCart);
        var spanTitle = document.createElement('span');
        spanTitle.setAttribute('class', 'text-muted');
        spanTitle.textContent = 'Ваша корзина';
        titleOfCart.appendChild(spanTitle);
        var numberOfItemsSpan = document.createElement('span');
        numberOfItemsSpan.setAttribute('class', 'badge badge-secondary badge-pill');
        numberOfItemsSpan.textContent = CART.calculateNumberOfItemsInCart();
        titleOfCart.appendChild(numberOfItemsSpan);

        var list = document.createElement('ul');
        list.setAttribute('class', 'list-group mb-3');
        yourCart.appendChild(list);
        var totalPrice = 0;
        promisedProducts.filter(product => Object.keys(CART).includes(product.url)).forEach(product => {
            if (!availableKeys.includes(product.url)) {
                return;
            }
            var li = document.createElement('li');
            li.setAttribute('class', 'list-group-item d-flex justify-content-between lh-condensed');
            list.appendChild(li);

            var div = document.createElement('div');
            li.appendChild(div);
            var h6 = document.createElement('h6');
            div.appendChild(h6);
            h6.setAttribute('class', 'my-0');
            h6.textContent = product.productName;
            var small = document.createElement('small');
            div.appendChild(small);
            small.setAttribute('class', 'text-muted');
            small.textContent = `${CART[product.url]} X ${product.price}грн.`;

            const itemsPrice = CART[product.url] * product.price;
            var span = document.createElement('span');
            li.appendChild(span);
            span.setAttribute('class', 'text-muted');
            span.textContent = `${itemsPrice.toFixed(2)} грн.`;
            totalPrice += itemsPrice;
        });

        var totalListItem = document.createElement('li');
        list.appendChild(totalListItem);
        totalListItem.setAttribute('class', 'list-group-item d-flex justify-content-between');
        var totalListItemSpan = document.createElement('span');
        totalListItem.appendChild(totalListItemSpan);
        totalListItemSpan.textContent = 'В сумме(грн):';
        var totalListItemStrong = document.createElement('strong');
        totalListItem.appendChild(totalListItemStrong);
        totalListItemStrong.textContent = totalPrice.toFixed(2);

        //TODO: add discount

        generateOrderField(row);
    }
});

function generateOrderField(row) {
    var form = document.createElement('div');
    row.appendChild(form);
    form.setAttribute('class', 'col-md-8 order-md-1 mb-1');
    form.innerHTML = '      <h4 class="mb-3">Платежный адрес</h4>\n' +
        '      <form class="needs-validation" novalidate="">\n' +
        '        <div class="row">\n' +
        '          <div class="col-md-6 mb-3">\n' +
        '            <label for="firstName">Имя</label>\n' +
        '            <input type="text" class="form-control" id="firstName" placeholder="" value="" required="">\n' +
        '            <div class="invalid-feedback">\n' +
        '              Требуется действительное имя.\n' +
        '            </div>\n' +
        '          </div>\n' +
        '          <div class="col-md-6 mb-3">\n' +
        '            <label for="lastName">Фамилия</label>\n' +
        '            <input type="text" class="form-control" id="lastName" placeholder="" value="" required="">\n' +
        '            <div class="invalid-feedback">\n' +
        '              Требуется действительная фамилия.\n' +
        '            </div>\n' +
        '          </div>\n' +
        '        </div>\n' +
        '\n' +
        '        <div class="mb-3">\n' +
        '          <label for="email">Email</label>\n' +
        '          <input type="email" class="form-control" id="email" placeholder="you@example.com" required pattern="[\\w\\d\\.]+@[\\w\\d\\.]+?\\.[\\w\\d]+">\n' +
        '          <div class="invalid-feedback">\n' +
        '            Пожалуйста, введите действующий адрес электронной почты для получения обновлений о доставке.\n' +
        '          </div>\n' +
        '        </div>\n' +
        '\n' +
        '        <div class="mb-3">\n' +
        '          <label for="address">Адрес</label>\n' +
        '          <input type="text" class="form-control" id="address" placeholder="1234 Main St" required="">\n' +
        '          <div class="invalid-feedback">\n' +
        '            Пожалуйста, введите свой адрес доставки.\n' +
        '          </div>\n' +
        '        </div>\n' +
        '\n' +
        '        <div class="mb-3">\n' +
        '          <label for="address2">Адрес 2 <span class="text-muted">(По желанию)</span></label>\n' +
        '          <input type="text" class="form-control" id="address2" placeholder="Apartment or suite">\n' +
        '        </div>\n' +
        '\n' +
        '        <div class="row">\n' +
        '          <div class="col-md-4 mb-3">\n' +
        '            <label for="zip">Почтовый индекс</label>\n' +
        '            <input id="zip" type="text" maxlength="5" minlength="5" class="form-control" id="zip" placeholder="" required="">\n' +
        '            <div class="invalid-feedback">\n' +
        '              Требуется почтовый индекс.\n' +
        '            </div>\n' +
        '          </div>\n' +
        '          <div class="col-md-8 mb-3">\n' +
        '            <label for="phone">Телефон</label>\n' +
        '            <input maxlength="10" id="phone" type="tel" pattern="09\\d{8}" class="form-control" placeholder="0965881523" required="">\n' +
        '            <div class="invalid-feedback">\n' +
        '              Требуется номер телефона.\n' +
        '            </div>\n' +
        '          </div>\n' +
        '          <div class="col-md-5 mb-3">\n' +
        '            <label for="date">Заказ на дату</label>\n' +
        '            <input type="date" id="date" class="form-control" required>\n' +
        '            <div class="invalid-feedback">\n' +
        '              Требуется дата на какую нужно привезти заказ.\n' +
        '            </div>\n' +
        '          </div>\n' +
        '          <div class="col-md-4 mb-3">\n' +
        '            <label for="time">Заказ на время</label>\n' +
        '            <input type="time" id="time" class="form-control" required>\n' +
        '            <div class="invalid-feedback">\n' +
        '              Требуется время на какое нужно привезти заказ.\n' +
        '            </div>\n' +
        '          </div>\n' +
        '        </div>\n' +
        '        <hr class="mb-4">\n' +
        '        <div class="custom-control custom-checkbox">\n' +
        '          <input type="checkbox" class="custom-control-input" id="same-address">\n' +
        '          <label class="custom-control-label" for="same-address">Адрес доставки такой же, как мой платежный адрес</label>\n' +
        '        </div>\n' +
        '        <div class="custom-control custom-checkbox">\n' +
        '          <input type="checkbox" class="custom-control-input" id="save-info">\n' +
        '          <label class="custom-control-label" for="save-info">Сохраните эту информацию для следующего раза</label>\n' +
        '        </div>\n' +
        '        <hr class="mb-4">\n' +
        '\n' +
        '        <h4 class="mb-3">Оплата</h4>\n' +
        '\n' +
        '        <div class="d-block my-3">\n' +
        '          <div class="custom-control custom-radio">\n' +
        '            <input id="credit" name="paymentMethod" type="radio" value="0" class="custom-control-input" checked="" required="">\n' +
        '            <label class="custom-control-label" for="credit">Кредитная карта</label>\n' +
        '          </div>\n' +
        '          <div class="custom-control custom-radio">\n' +
        '            <input id="debit" name="paymentMethod" type="radio" value="1" class="custom-control-input" required="">\n' +
        '            <label class="custom-control-label" for="debit">Дебетовая карточка</label>\n' +
        '          </div>\n' +
        '          <div class="custom-control custom-radio">\n' +
        '            <input id="paypal" name="paymentMethod" type="radio" value="2" class="custom-control-input" required="">\n' +
        '            <label class="custom-control-label" for="paypal">PayPal</label>\n' +
        '          </div>\n' +
        '        </div>\n' +
        '        <div class="row">\n' +
        '          <div class="col-md-6 mb-3">\n' +
        '            <label for="cc-name">Имя на карте</label>\n' +
        '            <input type="text" class="form-control" id="cc-name" placeholder="" required="">\n' +
        '            <small class="text-muted">Полное имя, как показано на карте</small>\n' +
        '            <div class="invalid-feedback">\n' +
        '              Имя на карте обязательно\n' +
        '            </div>\n' +
        '          </div>\n' +
        '          <div class="col-md-6 mb-3">\n' +
        '            <label for="cc-number">Номер карты</label>\n' +
        '            <input type="text" maxlength="16" minlength="16" class="form-control" id="cc-number" placeholder="" required="">\n' +
        '            <div class="invalid-feedback">\n' +
        '              Номер карты требуется\n' +
        '            </div>\n' +
        '          </div>\n' +
        '        </div>\n' +
        '        <div class="row">\n' +
        '          <div class="col-md-3 mb-3">\n' +
        '            <label for="cc-expiration">Срок действия</label>\n' +
        '            <input type="text" pattern="\\d{2}/\\d{2}" placeholder="05/24" maxlength="5" minlength="5" class="form-control" id="cc-expiration" required="">\n' +
        '            <div class="invalid-feedback">\n' +
        '              Требуется срок годности\n' +
        '            </div>\n' +
        '          </div>\n' +
        '          <div class="col-md-3 mb-3">\n' +
        '            <label for="cc-cvv">CVV</label>\n' +
        '            <input type="text" pattern="\\d{3}" maxlength="3" minlength="3" class="form-control" id="cc-cvv" placeholder="305" required="">\n' +
        '            <div class="invalid-feedback">\n' +
        '              Требуется защитный код\n' +
        '            </div>\n' +
        '          </div>\n' +
        '        </div>\n' +
        '        <hr class="mb-4">\n' +
        '        <button class="btn btn-primary btn-lg btn-block" type="submit">Продолжить оформление заказа</button>\n' +
        '      </form>\n' +
        '</div>';
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    var forms = document.getElementsByClassName('needs-validation')

    // Loop over them and prevent submission
    Array.prototype.filter.call(forms, function (form) {
        form.addEventListener('submit', function (event) {
            if (form.checkValidity() === false) {
                event.preventDefault()
                event.stopPropagation()
            }
            form.classList.add('was-validated')
        }, false)
    });

    const postIndex = document.getElementById('zip');
    postIndex.addEventListener('input', function validate() {
        let value = postIndex.value;
        if (value && Number.isNaN(Number(value))) {
            postIndex.setCustomValidity('Почтовый индекс не верный');
        } else {
            postIndex.setCustomValidity('');
        }
        postIndex.reportValidity();
    });

    const cardNumber = document.getElementById('cc-number');
    cardNumber.addEventListener('input', function validate() {
        if (!luna(cardNumber.value)) {
            cardNumber.setCustomValidity('Номер карточки не верный');
        } else {
            cardNumber.setCustomValidity('');
        }
        cardNumber.reportValidity();
    });

    const expireDate = document.getElementById('cc-expiration');
    expireDate.addEventListener('input', function validate() {
        if (!checkExpireDate(expireDate.value)) {
            expireDate.setCustomValidity('Ваша карта не действительная');
        } else {
            expireDate.setCustomValidity('');
        }
        expireDate.reportValidity();
    });

    const date = document.getElementById('date');
    const time = document.getElementById('time');

    function checkTimeDate() {
        if (!orderDateCheck(date.value, time.value)) {
            date.setCustomValidity('На доставку должно быть выделено минимум 3 часа');
            time.setCustomValidity('На доставку должно быть выделено минимум 3 часа');
        } else {
            date.setCustomValidity('');
            time.setCustomValidity('');
        }
        time.reportValidity();
        date.reportValidity();
    }

    date.addEventListener('input', checkTimeDate);
    time.addEventListener('input', checkTimeDate);

    form.addEventListener('submit', (event) => {
        event.preventDefault();
        event.stopPropagation();
        var orderDetails = {
            firstName: document.getElementById('firstName').value,
            lastName: document.getElementById('lastName').value,
            email: document.getElementById('email').value,
            address: document.getElementById('address').value,
            address2: document.getElementById('address2').value,
            zip: document.getElementById('zip').value,
            phone: document.getElementById('phone').value,
            date: document.getElementById('date').value,
            time: document.getElementById('time').value,
            'same-address': document.querySelector('#same-address:checked') != null,
            'save-info': document.querySelector('#save-info:checked') != null,
            'paymentMethod': document.querySelector('input[name="paymentMethod"]:checked').value,
            'cc-name': document.getElementById('cc-name').value,
            'cc-number': document.getElementById('cc-number').value,
            'cc-expiration': document.getElementById('cc-expiration').value,
            'cc-cvv': document.getElementById('cc-cvv').value,
        }
        makeOrder(orderDetails);
    });
}

function luna(cardNumber) {
    if (cardNumber.length !== 16) {
        return false;
    }
    var sum = 0;
    for (let i = 0; i < cardNumber.length; i++) {
        let currentNumber = Number(cardNumber[cardNumber.length - i - 1]);
        if (i % 2 !== 0) {
            currentNumber *= 2;
            if (currentNumber > 9) {
                currentNumber -= 9;
            }
        }
        sum += currentNumber;
    }
    return sum % 10 === 0;
}

function checkExpireDate(expireDate) {
    var [month, year] = expireDate.split('/');
    month = Number(month);
    year = Number(year);
    if (month > 12) {
        return false;
    }
    var dateCheck = new Date(2000 + year, month - 1);
    return Date.now() < dateCheck.getTime();
}

function orderDateCheck(dateValue, timeValue) {
    var [year, month, day] = dateValue.split('-');
    var [hours, minute] = timeValue.split(':');
    return Date.now() + 3 * 60 * 60 * 1_000 <= new Date(year, month - 1, day, hours, minute);
}

function makeOrder(data) {
    data.cart = {};
    console.log(data);
    for (let key of CART) {
        data.cart[key] = CART[key];
    }
    CART.clearCart();
    var uniqueID = Date.now();
    promisedProducts.then((promisedProducts) => {

        routing.addLink(`order/${uniqueID}`, orderDetails);

        function orderDetails() {
            clearMain();
            var container = document.createElement('div');
            container.setAttribute('class', 'container');
            MAIN.appendChild(container);

            var row = document.createElement('div');
            row.setAttribute('class', 'row');
            container.appendChild(row);

            var yourCart = document.createElement('div');
            yourCart.setAttribute('class', 'col-md-4 order-md-2 mb-4');
            row.appendChild(yourCart);

            var titleOfCart = document.createElement('h4');
            titleOfCart.setAttribute('class', 'd-flex justify-content-between align-items-center mb-3');
            yourCart.appendChild(titleOfCart);
            var spanTitle = document.createElement('span');
            spanTitle.setAttribute('class', 'text-muted');
            spanTitle.textContent = 'Ваш заказ';
            titleOfCart.appendChild(spanTitle);
            var numberOfItemsSpan = document.createElement('span');
            numberOfItemsSpan.setAttribute('class', 'badge badge-secondary badge-pill');
            numberOfItemsSpan.textContent = Object.keys(data.cart).length;
            titleOfCart.appendChild(numberOfItemsSpan);

            var list = document.createElement('ul');
            list.setAttribute('class', 'list-group mb-3');
            yourCart.appendChild(list);
            var totalPrice = 0;
            promisedProducts.filter(product => Object.keys(data.cart).includes(product.url)).forEach(product => {

                var li = document.createElement('li');
                li.setAttribute('class', 'list-group-item d-flex justify-content-between lh-condensed');
                list.appendChild(li);

                var div = document.createElement('div');
                li.appendChild(div);
                var h6 = document.createElement('h6');
                div.appendChild(h6);
                h6.setAttribute('class', 'my-0');
                h6.textContent = product.productName;
                var small = document.createElement('small');
                div.appendChild(small);
                small.setAttribute('class', 'text-muted');
                small.textContent = `${data.cart[product.url]} X ${product.price}грн.`;

                const itemsPrice = data.cart[product.url] * product.price;
                var span = document.createElement('span');
                li.appendChild(span);
                span.setAttribute('class', 'text-muted');
                span.textContent = `${itemsPrice.toFixed(2)} грн.`;
                totalPrice += itemsPrice;
            });

            var totalListItem = document.createElement('li');
            list.appendChild(totalListItem);
            totalListItem.setAttribute('class', 'list-group-item d-flex justify-content-between');
            var totalListItemSpan = document.createElement('span');
            totalListItem.appendChild(totalListItemSpan);
            totalListItemSpan.textContent = 'В сумме(грн):';
            var totalListItemStrong = document.createElement('strong');
            totalListItem.appendChild(totalListItemStrong);
            totalListItemStrong.textContent = totalPrice.toFixed(2);
        }

    });
    routing.openLink(`order/${uniqueID}`);
}
