import {promisedProducts, promisedProductsCategories} from './getJson.js';
import {clearMain, MAIN} from './renderHelp.js';
import {routing} from './routing.js';

promisedProductsCategories.then((promisedProductsCategories) => {
    routing.addLink('catalog', openCatalog);

    function openCatalog() {
        clearMain();
        const container = document.createElement('div');
        MAIN.appendChild(container);
        container.setAttribute('class', 'container');

        for (let i = 0; i < promisedProductsCategories.length; i++) {
            let {
                url,
                name
            } = promisedProductsCategories[i];
            let headingElement = document.createElement('h2');
            headingElement.textContent = name;
            container.appendChild(headingElement);
            headingElement.setAttribute('class', 'button btn-light');
            headingElement.setAttribute('role', 'button');
            headingElement.onclick = () => routing.openLink(`catalog/${url}`);

            const row = document.createElement('div');
            container.appendChild(row);
            row.setAttribute('class', 'row');

            promisedProducts.then(promisedProducts =>
                promisedProducts.filter(promisedProduct => promisedProduct.categoryId === i)
                    .forEach(product => displayProduct(row, product)));
        }
    }
});

promisedProductsCategories.then((promisedProductsCategories) => {
    for (let i = 0; i < promisedProductsCategories.length; i++) {
        let {
            url,
            name,
            description
        } = promisedProductsCategories[i];

        routing.addLink(`catalog/${url}`, openCategory);

        function openCategory() {
            clearMain();
            const container = document.createElement('div');
            MAIN.appendChild(container);
            container.setAttribute('class', 'container');

            var headingElement = document.createElement('h1');
            headingElement.textContent = name;
            headingElement.setAttribute('class', 'text-center')
            container.appendChild(headingElement);

            var paragraphElement = document.createElement('p');
            paragraphElement.setAttribute('class', 'lead text-center');
            paragraphElement.textContent = description;
            container.appendChild(paragraphElement);

            const row = document.createElement('div');
            container.appendChild(row);
            row.setAttribute('class', 'row');

            promisedProducts.then(promisedProducts =>
                promisedProducts.filter(promisedProduct => promisedProduct.categoryId === i)
                    .forEach(product => displayProduct(row, product)));
        }
    }
});

export function displayProduct(row, product) {
    var card = document.createElement('div');
    row.appendChild(card);
    card.setAttribute('class', 'col-lg-3 col-md-4 col-sm-6')

    var img = document.createElement('img');
    card.appendChild(img);
    img.setAttribute('src', product.images[0]);
    img.setAttribute('alt', product.productName);
    img.setAttribute('class', 'card-img-top')

    var cardBody = document.createElement('div');
    card.appendChild(cardBody);
    cardBody.setAttribute('class', 'card-body');

    var cardTitle = document.createElement('h5');
    cardBody.appendChild(cardTitle);
    cardTitle.setAttribute('class', 'card-title');
    cardTitle.textContent = product.productName;

    var cardText = document.createElement('p');
    cardBody.appendChild(cardText);
    cardText.setAttribute('class', 'card-text');
    cardText.textContent = `${product.price}грн.; Вес: ${product.weight}г`;

    var buttonElement = document.createElement('button');
    cardBody.appendChild(buttonElement);
    buttonElement.setAttribute('class', 'btn btn-secondary stretched-link');
    buttonElement.onclick = () => routing.openLink(`product/${product.url}`);
    buttonElement.textContent = 'Просмотреть';
}