import { hashSync } from "bcrypt"
import { prisma } from "./prisma-client"
import { categories, ingredients, products } from "./constants"

const randomDecimalNumber = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min) * 10 + min * 10) / 10;
};

async function up() {
    await prisma.user.createMany({
        data: [
            {
                fullname: 'Hohoho',
                email: "Hohoho@gmail.com",
                password: hashSync('111111', 10),
                verfied: new Date(),
                userRole: "USER"
            },
            {
                fullname: 'Hahaha',
                email: "Hahaha@gmail.com",
                password: hashSync('111111', 10),
                verfied: new Date(),
                userRole: "ADMIN"
            }
        ]
    })

    await prisma.category.createMany({ data: categories })

    await prisma.ingredient.createMany({ data: ingredients })

    await prisma.product.createMany({ data: products })

    const pizza1 = await prisma.product.create({
        data: {
            name: "Пепперони фреш",
            imageUrl: '/assets/Pizzas/11EE7D61304FAF5A98A6958F2BB2D260.jpg',
            categoryId: 1,
            ingredients: {
                connect: ingredients.slice(0, 5)
            }
        }
    })

    const pizza2 = await prisma.product.create({
        data: {
            name: "Сырная",
            imageUrl: '/assets/Pizzas/11EE7D610CF7E265B7C72BE5AE757CA7.jpg',
            categoryId: 1,
            ingredients: {
                connect: ingredients.slice(5, 10)
            }
        }
    })

    const pizza3 = await prisma.product.create({
        data: {
            name: "Чоризо фреш",
            imageUrl: '/assets/Pizzas/11EE7D61706D472F9A5D71EB94149304.jpg',
            categoryId: 1,
            ingredients: {
                connect: ingredients.slice(10, 40)
            }
        }
    })

    await prisma.variant.createMany({
        data: [
            {
                pizzaType: 1,
                size: 20,
                price: randomDecimalNumber(190, 690),
                productId: pizza1.id
            },
            {
                pizzaType: 2,
                size: 30,
                price: randomDecimalNumber(190, 690),
                productId: pizza1.id
            },
            {
                pizzaType: 2,
                size: 40,
                price: randomDecimalNumber(190, 690),
                productId: pizza1.id
            },


            {
                pizzaType: 1,
                size: 20,
                price: randomDecimalNumber(190, 690),
                productId: pizza2.id
            },
            {
                pizzaType: 1,
                size: 30,
                price: randomDecimalNumber(190, 690),
                productId: pizza2.id
            },
            {
                pizzaType: 1,
                size: 40,
                price: randomDecimalNumber(190, 690),
                productId: pizza2.id
            },
            {
                pizzaType: 2,
                size: 20,
                price: randomDecimalNumber(190, 690),
                productId: pizza2.id
            },
            {
                pizzaType: 2,
                size: 30,
                price: randomDecimalNumber(190, 690),
                productId: pizza2.id
            },
            {
                pizzaType: 2,
                size: 40,
                price: randomDecimalNumber(190, 690),
                productId: pizza2.id
            },

            {
                pizzaType: 1,
                size: 20,
                price: randomDecimalNumber(190, 690),
                productId: pizza3.id
            },
            {
                pizzaType: 2,
                size: 30,
                price: randomDecimalNumber(190, 690),
                productId: pizza3.id
            },
            {
                pizzaType: 2,
                size: 40,
                price: randomDecimalNumber(190, 690),
                productId: pizza3.id
            },

            { price: randomDecimalNumber(190, 690), productId: 1 },
            { price: randomDecimalNumber(190, 690), productId: 2 },
            { price: randomDecimalNumber(190, 690), productId: 3 },
            { price: randomDecimalNumber(190, 690), productId: 4 },
            { price: randomDecimalNumber(190, 690), productId: 5 },
            { price: randomDecimalNumber(190, 690), productId: 6 },
            { price: randomDecimalNumber(190, 690), productId: 7 },
            { price: randomDecimalNumber(190, 690), productId: 8 },
            { price: randomDecimalNumber(190, 690), productId: 9 },
            { price: randomDecimalNumber(190, 690), productId: 10 },
            { price: randomDecimalNumber(190, 690), productId: 11 },
            { price: randomDecimalNumber(190, 690), productId: 12 },
            { price: randomDecimalNumber(190, 690), productId: 13 },
            { price: randomDecimalNumber(190, 690), productId: 14 },
            { price: randomDecimalNumber(190, 690), productId: 15 },
            { price: randomDecimalNumber(190, 690), productId: 16 },
            { price: randomDecimalNumber(190, 690), productId: 17 },
        ]
    })


    await prisma.cart.createMany({
        data: [
            {
                totalAmount: 0,
                token: '1111',
                userId: 1,
            },
            {
                totalAmount: 0,
                token: '22222',
                userId: 2,
            }
        ]
    })

    await prisma.cartItem.create({
        data:
        {
            cartId: 1,
            variantId: 2,
            quantity: 3,
            ingredients: {
                connect: [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }]
            }
        }
    })
    await prisma.cartItem.create({
        data:
        {
            cartId: 1,
            variantId: 2,
            quantity: 3,
            ingredients: {
                connect: [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }]
            }
        }
    })
    await prisma.cartItem.create({
        data:
        {
            cartId: 1,
            variantId: 2,
            quantity: 3,
            ingredients: {
                connect: [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }]
            }
        }
    })
    await prisma.story.createMany({
        data: [
            {
                previewImageUrl:
                    'https://cdn.inappstory.ru/story/xep/xzh/zmc/cr4gcw0aselwvf628pbmj3j/custom_cover/logo-350x440.webp?k=IgAAAAAAAAAE&v=3101815496',
            },
            {
                previewImageUrl:
                    'https://cdn.inappstory.ru/story/km2/9gf/jrn/sb7ls1yj9fe5bwvuwgym73e/custom_cover/logo-350x440.webp?k=IgAAAAAAAAAE&v=3074015640',
            },
            {
                previewImageUrl:
                    'https://cdn.inappstory.ru/story/quw/acz/zf5/zu37vankpngyccqvgzbohj1/custom_cover/logo-350x440.webp?k=IgAAAAAAAAAE&v=1336215020',
            },
            {
                previewImageUrl:
                    'https://cdn.inappstory.ru/story/7oc/5nf/ipn/oznceu2ywv82tdlnpwriyrq/custom_cover/logo-350x440.webp?k=IgAAAAAAAAAE&v=38903958',
            },
            {
                previewImageUrl:
                    'https://cdn.inappstory.ru/story/q0t/flg/0ph/xt67uw7kgqe9bag7spwkkyw/custom_cover/logo-350x440.webp?k=IgAAAAAAAAAE&v=2941222737',
            },
            {
                previewImageUrl:
                    'https://cdn.inappstory.ru/story/lza/rsp/2gc/xrar8zdspl4saq4uajmso38/custom_cover/logo-350x440.webp?k=IgAAAAAAAAAE&v=4207486284',
            },
        ],
    });

    await prisma.storyItem.createMany({
        data: [
            {
                storyId: 1,
                sourceUrl:
                    'https://cdn.inappstory.ru/file/dd/yj/sx/oqx9feuljibke3mknab7ilb35t.webp?k=IgAAAAAAAAAE',
            },
            {
                storyId: 1,
                sourceUrl:
                    'https://cdn.inappstory.ru/file/jv/sb/fh/io7c5zarojdm7eus0trn7czdet.webp?k=IgAAAAAAAAAE',
            },
            {
                storyId: 1,
                sourceUrl:
                    'https://cdn.inappstory.ru/file/ts/p9/vq/zktyxdxnjqbzufonxd8ffk44cb.webp?k=IgAAAAAAAAAE',
            },
            {
                storyId: 1,
                sourceUrl:
                    'https://cdn.inappstory.ru/file/ur/uq/le/9ufzwtpdjeekidqq04alfnxvu2.webp?k=IgAAAAAAAAAE',
            },
            {
                storyId: 1,
                sourceUrl:
                    'https://cdn.inappstory.ru/file/sy/vl/c7/uyqzmdojadcbw7o0a35ojxlcul.webp?k=IgAAAAAAAAAE',
            },
        ],
    });

}


async function down() {
    await prisma.$executeRaw`TRUNCATE TABLE "User" RESTART IDENTITY CASCADE`
    await prisma.$executeRaw`TRUNCATE TABLE "Category" RESTART IDENTITY CASCADE`
    await prisma.$executeRaw`TRUNCATE TABLE "Ingredient" RESTART IDENTITY CASCADE`
    await prisma.$executeRaw`TRUNCATE TABLE "Product" RESTART IDENTITY CASCADE`
    await prisma.$executeRaw`TRUNCATE TABLE "Variant" RESTART IDENTITY CASCADE`
}

async function main() {
    try {
        await down()
        await up()
    } catch (error) {
        console.log(error)
    }
}

main()
    .then(async () => { await prisma.$disconnect() })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })