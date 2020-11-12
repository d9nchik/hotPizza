var promisedJson = fetch('db.json').then(function makeObject(data) {
    return data.json();
});
export const promisedProducts = promisedJson.then((data) => data.products);
export const promisedProductsCategories = promisedJson.then((data) => data.productsCategories);
export const promisedIngredients = promisedJson.then((data) => data.ingredients);
export const promisedRecommendations = promisedJson.then((data) => data.recommendations);