const SERVER_IP = 'https://hotpizza.ml';
export const promisedProducts = getObj(`${SERVER_IP}/getProducts`);
export const promisedProductsCategories = getObj(`${SERVER_IP}/getCategories`);
export const promisedIngredients = getObj(`${SERVER_IP}/getIngredients`);
export const promisedRecommendations = getObj(`${SERVER_IP}/getRecommended`);
export const promisedPromotions = getObj(`${SERVER_IP}/getPromotions`);

function getObj(url) {
    return fetch(url).then(data => data.json());
}