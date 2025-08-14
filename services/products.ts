import { Product } from "@prisma/client";
import { axiosInstance } from "./axios";
import { ApiRoutes } from "./constants";
import { ProductRelations } from "@/@types/prisma";

export async function search(query: string) {
    const { data } = await axiosInstance.get<ProductRelations[]>(ApiRoutes.SEARCH_ROUTE, { params: { query } })

    return data
}