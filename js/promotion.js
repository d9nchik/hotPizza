import {promisedPromotions} from "./getJson.js";
import {routing} from "./routing.js";
import {clearMain, MAIN} from "./renderHelp.js";

promisedPromotions.then(promisedPromotions => {
    promisedPromotions.forEach(promotionObject => {
        routing.addLink(`action/${promotionObject.url}`, renderPromotionPage);

        function renderPromotionPage() {
            clearMain();
            const {
                name,
                description,
                datePosted,
                img,
            } = promotionObject;
            const modalDiv = document.createElement('div');
            modalDiv.innerHTML =
                '<!-- Modal -->\n' +
                '<div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">\n' +
                '  <div class="modal-dialog modal-dialog-centered">\n' +
                '    <div class="modal-content">\n' +
                '      <div class="modal-header">\n' +
                '        <h5 class="modal-title" id="exampleModalLabel">Активация купона</h5>\n' +
                '        <button type="button" class="close" data-dismiss="modal" aria-label="Close">\n' +
                '          <span aria-hidden="true">&times;</span>\n' +
                '        </button>\n' +
                '      </div>\n' +
                '      <div class="modal-body">\n' +
                `Купон "${name}" активирован` +
                '      </div>\n' +
                '      <div class="modal-footer">\n' +
                '        <button type="button" class="btn btn-secondary" data-dismiss="modal">Закрыть</button>\n' +
                '      </div>\n' +
                '    </div>\n' +
                '  </div>\n' +
                '</div>';
            MAIN.appendChild(modalDiv);

            const container = document.createElement('div');
            MAIN.appendChild(container);
            container.setAttribute('class', 'container mb-4');

            var headingElement = document.createElement('h1');
            headingElement.textContent = name;
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
            image.setAttribute('src', img);
            image.setAttribute('alt', name);

            const infoBlock = document.createElement('div');
            row.appendChild(infoBlock);
            infoBlock.setAttribute('class', 'col-lg-4 col-md-6 col-sm-12 container');
            var activate = document.createElement('div');
            activate.innerHTML = '<button type="button" class="btn btn-outline-primary" data-toggle="modal" data-target="#exampleModal">\n' +
                '          Example button\n' +
                '          <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-gift" fill="currentColor" xmlns="http://www.w3.org/2000/svg">\n' +
                '  <path fill-rule="evenodd" d="M3 2.5a2.5 2.5 0 0 1 5 0 2.5 2.5 0 0 1 5 0v.006c0 .07 0 .27-.038.494H15a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1v7.5a1.5 1.5 0 0 1-1.5 1.5h-11A1.5 1.5 0 0 1 1 14.5V7a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h2.038A2.968 2.968 0 0 1 3 2.506V2.5zm1.068.5H7v-.5a1.5 1.5 0 1 0-3 0c0 .085.002.274.045.43a.522.522 0 0 0 .023.07zM9 3h2.932a.56.56 0 0 0 .023-.07c.043-.156.045-.345.045-.43a1.5 1.5 0 0 0-3 0V3zM1 4v2h6V4H1zm8 0v2h6V4H9zm5 3H9v8h4.5a.5.5 0 0 0 .5-.5V7zm-7 8V7H2v7.5a.5.5 0 0 0 .5.5H7z"></path>\n' +
                '</svg>\n' +
                '        </button>'
            infoBlock.appendChild(activate);

            var datePostElement = document.createElement('small');
            infoBlock.appendChild(datePostElement);
            datePostElement.setAttribute('class', 'muted my-0');
            datePostElement.textContent = datePosted;


            var content = document.createElement('p');
            infoBlock.appendChild(content);
            content.setAttribute('class', 'h5');
            content.textContent = description;
        }
    });
});