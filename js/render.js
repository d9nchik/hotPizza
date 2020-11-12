import {CART} from './cart.js';
import {promisedIngredients, promisedProducts} from "./getJson.js";
import {routing} from "./routing.js";

promisedProducts.then((data) => console.log(data));
promisedIngredients.then((data) => console.log(data));

const MAIN = document.getElementsByTagName('main')[0];

function clearMain() {
    MAIN.innerHTML = '';
}

function showLoading(node) {
    var center = document.createElement('div');
    center.setAttribute('style', 'text-align: center;');
    var loading = document.createElement('div');
    loading.setAttribute('class', 'lds-dual-ring');
    center.appendChild(loading);
    node.appendChild(center);
}

showLoading(MAIN);

promisedProducts.then((products) => {
    for (const product of products) {

        routing.addLink(`product/${product.url}`, renderPage);

        function renderPage() {
            clearMain();
            //TODO: add special and spicy
            const {
                url,
                productName,
                ingredients,
                price,
                images,
                weight,
                relatedProductIds,
            } = product;


            const container = document.createElement('div');
            MAIN.appendChild(container);
            container.setAttribute('class', 'container');

            var headingElement = document.createElement('h1');
            headingElement.textContent = productName;
            container.appendChild(headingElement);

            const row = document.createElement('div');
            container.appendChild(row);
            row.setAttribute('class', 'row');

            const imageContainer = document.createElement('div');
            row.appendChild(imageContainer);
            imageContainer.setAttribute('class', 'col-lg-8 col-md-6 col-sm-12');
            var image = document.createElement('img');
            imageContainer.appendChild(image);
            image.setAttribute('class', 'img-fluid');
            image.setAttribute('src', images[1]);
            image.setAttribute('alt', productName);

            const infoBlock = document.createElement('div');
            row.appendChild(infoBlock);
            infoBlock.setAttribute('class', 'col-lg-4 col-md-6 col-sm-12 container');
            var weightNode = document.createElement('div');
            weightNode.innerHTML =
                '          <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-calculator" fill="currentColor" xmlns="http://www.w3.org/2000/svg">\n' +
                '  <path fill-rule="evenodd" d="M12 1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zM4 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H4z"></path>\n' +
                '  <path d="M4 2.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.5.5h-7a.5.5 0 0 1-.5-.5v-2zm0 4a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1zm0 3a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1zm0 3a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1zm3-6a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1zm0 3a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1zm0 3a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1zm3-6a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1zm0 3a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-4z"></path>\n' +
                '</svg>\n' +
                'Вес: ' + weight + 'г';
            infoBlock.appendChild(weightNode);

            var priceNode = document.createElement('div');
            priceNode.innerHTML = '<button type="button" class="btn btn-outline-primary">\n' +
                'Цена: ' + price + 'грн.' +
                '          <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-cash-stack" fill="currentColor" xmlns="http://www.w3.org/2000/svg">\n' +
                '  <path d="M14 3H1a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1h-1z"></path>\n' +
                '  <path fill-rule="evenodd" d="M15 5H1v8h14V5zM1 4a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1V5a1 1 0 0 0-1-1H1z"></path>\n' +
                '  <path d="M13 5a2 2 0 0 0 2 2V5h-2zM3 5a2 2 0 0 1-2 2V5h2zm10 8a2 2 0 0 1 2-2v2h-2zM3 13a2 2 0 0 0-2-2v2h2zm7-4a2 2 0 1 1-4 0 2 2 0 0 1 4 0z"></path>\n' +
                '</svg>\n' +
                '        </button>';
            var button = priceNode.firstChild;
            button.onclick = () => {
                var howManyItems = prompt('Сколько пиц даного типа вы хотите купить?');
                if (howManyItems && !Number.isNaN(Number(howManyItems))) {
                    CART.addToCart(url, Number(howManyItems));
                }
            };
            infoBlock.appendChild(priceNode);

            promisedIngredients.then((ingredientsPromised) => {
                var rowInInfoBlock = document.createElement('div');
                var header = document.createElement('h2');
                infoBlock.appendChild(header);
                header.innerHTML = 'Состав';
                infoBlock.appendChild(rowInInfoBlock);
                rowInInfoBlock.setAttribute('class', 'row');
                ingredients.forEach((number) => {
                    var element = document.createElement('div');
                    rowInInfoBlock.appendChild(element);
                    element.setAttribute('class', 'col-sm-6 container');
                    var {
                        title,
                        image
                    } = ingredientsPromised[number];
                    element.appendChild(document.createTextNode(title));
                    var img = document.createElement('img');
                    element.appendChild(img);
                    img.setAttribute('src', image);
                    img.setAttribute('alt', title);
                    img.setAttribute('class', 'img-fluid');
                });
            });


            var relatedProductHeader = document.createElement('h2');
            relatedProductHeader.textContent = 'Похожие';
            row.appendChild(relatedProductHeader);

            const relatedProductsContainer = document.createElement('div');
            row.appendChild(relatedProductsContainer);
            relatedProductsContainer.setAttribute('class', 'row');
            relatedProductIds.forEach((relatedProductId) => {
                var {
                    productName,
                    images: [image],
                    url
                } = products[relatedProductId];
                var box = document.createElement('div');
                box.setAttribute('class', 'col-lg-3 col-md-3 col-sm-12 d-md-flex justify-content-md-between flex-column mb-1');
                relatedProductsContainer.appendChild(box);

                var header = document.createElement('h3');
                header.setAttribute('class', 'btn');
                header.textContent = productName;
                box.appendChild(header);

                var img = document.createElement('img');
                box.appendChild(img);
                img.setAttribute('src', image);
                img.setAttribute('alt', productName);
                img.setAttribute('class', 'img-fluid justify-content-end btn');

                box.onclick = () => {
                    routing.openLink(`product/${url}`);
                }
            })
        }
    }
});


