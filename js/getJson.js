const SERVER_IP = '34.227.61.134';
export const promisedProducts = getObj(`http://${SERVER_IP}/getProducts`);
export const promisedProductsCategories = getObj(`http://${SERVER_IP}/getCategories`);
export const promisedIngredients = getObj(`http://${SERVER_IP}/getIngredients`);
export const promisedRecommendations = getObj(`http://${SERVER_IP}/getRecommended`);
export const promisedPromotions = getObj(`http://${SERVER_IP}/getPromotions`);

function getObj(url) {
    return fetch(url).then(data => data.json());
}