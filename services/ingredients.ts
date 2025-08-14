import { Ingredient, Product } from "@prisma/client";
import { axiosInstance } from "./axios";
import { ApiRoutes } from "./constants";

export async function getAll() {
    const { data } = await axiosInstance.get<Ingredient[]>(ApiRoutes.INGREDIENTS_ROUTE)

    return data
}