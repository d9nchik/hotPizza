const obj = (async () => {
  const data = await fetch('data.json');
  const res = await data.json();
  return res;
})();

export const promisedProducts = (async () => (await obj)['products'])();

export const promisedProductsCategories = (async () =>
  (await obj)['productsCategories'])();
export const promisedIngredients = (async () => (await obj)['ingredients'])();
export const promisedRecommendations = (async () =>
  (await obj)['recommendations'])();
export const promisedPromotions = (async () => (await obj)['promotions'])();
