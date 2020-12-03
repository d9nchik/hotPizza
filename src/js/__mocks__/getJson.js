async function getProducts() {
    return [
        {
            url: 'peperoni_bluz',
            productName: 'Пепперони Блюз',
            ingredients: [0, 1, 2, 3, 4],
            price: 124.99,
            images: [
                'img/pizza/classic/peperoni_bluz_short.jpg',
                'img/pizza/classic/peperoni_bluz_full.jpg',
            ],
            weight: 296,
            relatedProductIds: [1],
            categoryId: 0,
        },
        {
            url: 'texas',
            productName: 'Техас',
            ingredients: [1, 2, 3, 4, 5],
            price: 92.99,
            images: [
                'img/pizza/classic/texas_short.jpg',
                'img/pizza/classic/texas_full.jpg',
            ],
            weight: 378,
            relatedProductIds: [0],
            categoryId: 0,
        },
    ];
}

async function getCategories() {
    return [
        {
            url: 'classic',
            name: 'Классические',
            description:
                'Классическая пицца выпекается в специальной дровяной печи, которая называется помпейской и имеет форму свода в виде полусферы.',
        },
        {
            url: 'branded',
            name: 'Фирменные',
            description:
                'блюдо с большим количеством мяса, овощей и зелени. В состав рецептуры входят ломтики бекона, курицы-гриль, острые итальянские колбаски пепперони, ветчина. Паприка, зелень и сыр моцарелла дополняют восхитительную мясную композицию.',
        },
        {
            url: 'legend',
            name: 'Легенды',
            description:
                'это национальное итальянское блюдо, представляющее собой круглую открытую лепешку, покрытую расплавленным сыром (обычно моцарелла) и томатами. Сыр – это, безусловно, основной ингредиент пиццы.',
        },
        {
            url: 'premium',
            name: 'Премиум',
            description:
                'Отборные продукты в сочитании с мастерством повара найдет поклоников даже сред очень больших капризов.',
        },
    ];
}

async function getIngredients() {
    return [
        {
            title: 'Бергадер Блю',
            image: 'img/ingredients/barhader_blu.png',
        },
        {
            title: 'Моцарелла',
            image: 'img/ingredients/mozzarella.png',
        },
        {
            title: 'Пепперони',
            image: 'img/ingredients/pepperony.jpg',
        },
        {
            title: 'Соус Альфредо',
            image: 'img/ingredients/alfredo.jpg',
        },
        {
            title: 'Соус Барбекю',
            image: 'img/ingredients/bbq_souse.png',
        },
        {
            title: 'Кукуруза',
            image: 'img/ingredients/corn.jpeg',
        },
    ];
}

async function getRecommendation() {
    return [0, 1];
}

async function getPromotions() {
    return [
        {
            url: 'crazy-tuesday',
            name: 'Сумасшедший вторник!',
            description:
                "Каждый вторник Domino's проводит невероятную акцию «Сумасшедший вторник» - покупай одну среднюю или большую пиццу и получай вторую со скидкой 80%!\nВ акции не участвуют маленькие пиццы. ",
            datePosted: '25-03-2020',
            img: 'img/sales/crazy-tuesday.jpg',
        },
        {
            url: 'woweekend-u-dominos',
            name: "WOWeekend в Domino's!",
            description:
                'Заказывай любую среднюю пиццу за 199 грн или большую пиццу всего за 239 грн!\n\nАкция действует каждую пятницу, субботу и воскресенье.\nАкция действует на пиццы из меню. Акция не действует на пиццы за собственном рецептом.',
            datePosted: '01-04-2020',
            img: 'img/sales/woweekend-u-dominos.jpg',
        },
    ];
}

export const promisedProducts = getProducts();
export const promisedProductsCategories = getCategories();
export const promisedIngredients = getIngredients();
export const promisedRecommendations = getRecommendation();
export const promisedPromotions = getPromotions();
