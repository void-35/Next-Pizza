import { User } from "@prisma/client";
import { axiosInstance } from "./axios";
import { ApiRoutes } from "./constants";

export async function getMe() {
    const { data } = await axiosInstance.get<User>(ApiRoutes.AUTH_ROUTE)

    return data
}