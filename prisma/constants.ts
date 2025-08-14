export const categories = [
    {
        name: 'Пиццы',
    },
    {
        name: 'Завтрак',
    },
    {
        name: 'Закуски',
    },
    {
        name: 'Коктейли',
    },
    {
        name: 'Напитки',
    },
]

export const ingredients = [
    {
        name: 'Сырный бортик',
        price: 179,
        imageUrl: '../public.assets/Ingredients/99f5cb91225b4875bd06a26d2e842106.png',
    },
    {
        name: 'Сливочная моцарелла',
        price: 79,
        imageUrl: '../public.assets/Ingredients/cdea869ef287426386ed634e6099a5ba.png',
    },
    {
        name: 'Сыры чеддер и пармезан',
        price: 79,
        imageUrl: '../public.assets/Ingredients/000D3A22FA54A81411E9AFA69C1FE796',
    },
    {
        name: 'Острый перец халапеньо',
        price: 59,
        imageUrl: '../public.assets/Ingredients/11ee95b6bfdf98fb88a113db92d7b3df.png',
    },
    {
        name: 'Нежный цыпленок',
        price: 79,
        imageUrl: '../public.assets/Ingredients/000D3A39D824A82E11E9AFA5B328D35A',
    },
    {
        name: 'Шампиньоны',
        price: 59,
        imageUrl: '../public.assets/Ingredients/000D3A22FA54A81411E9AFA67259A324',
    },
    {
        name: 'Ветчина',
        price: 79,
        imageUrl: '../public.assets/Ingredients/000D3A39D824A82E11E9AFA61B9A8D61',
    },
    {
        name: 'Пикантная пепперони',
        price: 79,
        imageUrl: '../public.assets/Ingredients/000D3A22FA54A81411E9AFA6258199C3',
    },
    {
        name: 'Острая чоризо',
        price: 79,
        imageUrl: '../public.assets/Ingredients/000D3A22FA54A81411E9AFA62D5D6027',
    },
    {
        name: 'Маринованные огурчики',
        price: 59,
        imageUrl: '../public.assets/Ingredients/000D3A21DA51A81211E9EA89958D782B',
    },
    {
        name: 'Свежие томаты',
        price: 59,
        imageUrl: '../public.assets/Ingredients/000D3A39D824A82E11E9AFA7AC1A1D67',
    },
    {
        name: 'Красный лук',
        price: 59,
        imageUrl: '../public.assets/Ingredients/000D3A22FA54A81411E9AFA60AE6464C',
    },
    {
        name: 'Сочные ананасы',
        price: 59,
        imageUrl: '../public.assets/Ingredients/000D3A21DA51A81211E9AFA6795BA2A0',
    },
    {
        name: 'Итальянские травы',
        price: 39,
        imageUrl: '../public.assets/Ingredients/370dac9ed21e4bffaf9bc2618d258734.png',
    },
    {
        name: 'Сладкий перец',
        price: 59,
        imageUrl: '../public.assets/Ingredients/000D3A22FA54A81411E9AFA63F774C1B',
    },
    {
        name: 'Кубики брынзы',
        price: 79,
        imageUrl: '../public.assets/Ingredients/000D3A39D824A82E11E9AFA6B0FFC349',
    },
    {
        name: 'Митболы',
        price: 79,
        imageUrl: '../public.assets/Ingredients/b2f3a5d5afe44516a93cfc0d2ee60088.png',
    },
].map((obj, index) => ({ id: index + 1, ...obj }));





export const products = [
    {
        name: 'Омлет с ветчиной и грибами',
        imageUrl:
            '/assets/Products/11EE7970321044479C1D1085457A36EB.jpg',
        categoryId: 2,
    },
    {
        name: 'Омлет с пепперони',
        imageUrl:
            '/assets/Products/11EE94ECF33B0C46BA410DEC1B1DD6F8.jpg',
        categoryId: 2,
    },
    {
        name: 'Кофе Латте',
        imageUrl:
            '/assets/Products/11EE7D61B0C26A3F85D97A78FEEE00AD.jpg',
        categoryId: 2,
    },
    {
        name: 'Дэнвич ветчина и сыр',
        imageUrl:
            '/assets/Products/11EE796FF0059B799A17F57A9E64C725.jpg',
        categoryId: 3,
    },
    {
        name: 'Куриные наггетсы',
        imageUrl:
            '/assets/Products/11EE7D618B5C7EC29350069AE9532C6E.jpg',
        categoryId: 3,
    },
    {
        name: 'Картофель из печи с соусом 🌱',
        imageUrl:
            '/assets/Products/11EED646A9CD324C962C6BEA78124F19.jpg',
        categoryId: 3,
    },
    {
        name: 'Додстер',
        imageUrl:
            '/assets/Products/11EE796F96D11392A2F6DD73599921B9.jpg',
        categoryId: 3,
    },
    {
        name: 'Острый Додстер 🌶️🌶️',
        imageUrl:
            '/assets/Products/11EE796FD3B594068F7A752DF8161D04.jpg',
        categoryId: 3,
    },
    {
        name: 'Банановый молочный коктейль',
        imageUrl:
            '/assets/Products/11EEE20B8772A72A9B60CFB20012C185.jpg',
        categoryId: 4,
    },
    {
        name: 'Карамельное яблоко молочный коктейль',
        imageUrl:
            '/assets/Products/11EE79702E2A22E693D96133906FB1B8.jpg',
        categoryId: 4,
    },
    {
        name: 'Молочный коктейль с печеньем Орео',
        imageUrl:
            '/assets/Products/11EE796FA1F50F8F8111A399E4C1A1E3.jpg',
        categoryId: 4,
    },
    {
        name: 'Классический молочный коктейль 👶',
        imageUrl:
            '/assets/Products/11EE796F93FB126693F96CB1D3E403FB.jpg',
        categoryId: 4,
    },
    {
        name: 'Ирландский Капучино',
        imageUrl:
            '/assets/Products/11EE7D61999EBDA59C10E216430A6093.jpg',
        categoryId: 5,
    },
    {
        name: 'Кофе Карамельный капучино',
        imageUrl:
            '/assets/Products/11EE7D61AED6B6D4BFDAD4E58D76CF56.jpg',
        categoryId: 5,
    },
    {
        name: 'Кофе Кокосовый латте',
        imageUrl:
            '/assets/Products/11EE7D61B19FA07090EE88B0ED347F42.jpg',
        categoryId: 5,
    },
    {
        name: 'Кофе Американо',
        imageUrl:
            '/assets/Products/11EE7D61B044583596548A59078BBD33.jpg',
        categoryId: 5,
    },
    {
        name: 'Кофе Латте',
        imageUrl:
            '/assets/Products/11EE7D61B0C26A3F85D97A78FEEE00AD.jpg',
        categoryId: 5,
    },
]