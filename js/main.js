import {} from './renderProduct.js';
import {} from './catalog.js';
import {} from './order.js';
import {} from './promotion.js';
import {promisedRecommendations, promisedProducts, promisedPromotions} from "./getJson.js";
import {routing} from "./routing.js";
import {clearMain, MAIN} from "./renderHelp.js";

console.log('Hello world');
promisedPromotions.then(promisedPromotions => {
    routing.addLink('', openMainPage);

    function openMainPage() {
        clearMain();
        var bigContainer = document.createElement('div');
        bigContainer.setAttribute('class', 'container');
        MAIN.appendChild(bigContainer);

        var actions = document.createElement('h2');
        bigContainer.appendChild(actions);
        actions.textContent = 'Акции';

        var hideExtra = document.createElement('div');
        hideExtra.setAttribute('class', 'container hide-extra');
        bigContainer.appendChild(hideExtra);

        var scrollPromotions = document.createElement('div');
        scrollPromotions.setAttribute('id', 'scroll-promotions');
        hideExtra.appendChild(scrollPromotions);
        scrollPromotions.setAttribute('style', `width: ${100 * promisedPromotions.length}%`);

        promisedPromotions.forEach(promotion => {
            var promotionElement = document.createElement('div');
            promotionElement.setAttribute('class', 'scroll-promotion');
            scrollPromotions.appendChild(promotionElement);
            promotionElement.onclick = () => routing.openLink(`action/${promotion.url}`);

            var img = document.createElement('img');
            promotionElement.appendChild(img);
            img.setAttribute('alt', promotion.name);
            img.setAttribute('src', promotion.img);

            var name = document.createElement('h3');
            name.textContent = promotion.name;
            promotionElement.appendChild(name);
            name.setAttribute('class', 'h2');
        });
    }
});