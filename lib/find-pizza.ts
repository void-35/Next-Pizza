import { prisma } from "@/prisma/prisma-client";

export interface GetSearchParams {
    sizes: string;
    pizzaTypes: string;
    ingredients: string;
    priceFrom: string;
    priceTo: string;
    query: string;
    sortBy: string;
}

export async function findPizaa(params: Promise<GetSearchParams>) {
    const DEFAULT_PRICE_FROM = 0
    const DEFAULT_PRICE_TO = 1000
    const searchParams = await params
    const { sizes: paramSizes, pizzaTypes: paramPizzaTypes, ingredients: paramIngredients, priceFrom: paramPriceFrom, priceTo: paramPriceTo } = searchParams

    const sizes = paramSizes?.split(',').map(Number)
    const pizzaTypes = paramPizzaTypes?.split(',').map(Number)
    const ingredients = paramIngredients?.split(',').map(Number)
    const priceFrom = Number(paramPriceFrom) || DEFAULT_PRICE_FROM
    const priceTo = Number(paramPriceTo) || DEFAULT_PRICE_TO

    const category = await prisma.category.findMany({
        include: {
            products: {
                orderBy: {
                    id: 'desc'
                },
                where: {
                    ingredients: ingredients ? {
                        some: {
                            id: {
                                in: ingredients
                            }
                        }
                    } : undefined,
                    variants: {
                        some: {
                            pizzaType: {
                                in: pizzaTypes
                            },
                            size: {
                                in: sizes
                            },
                            price: {
                                lte: priceTo,
                                gte: priceFrom,
                            },
                        }
                    },
                },
                include: {
                    variants: {
                        where: {
                            price: {
                                lte: priceTo,
                                gte: priceFrom,
                            }
                        },
                        orderBy: {
                            price: 'asc'
                        }
                    },
                    ingredients: true
                }
            }
        }
    })
    return category
}