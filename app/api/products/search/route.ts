import { prisma } from "@/prisma/prisma-client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    // Get the "query" parameter from the URL
    const searchQuery = req.nextUrl.searchParams.get("query") || "";

    // Fetch products that contain the search query (case-insensitive)
    const products = await prisma.product.findMany({
        where: {
            name: {
                contains: searchQuery,
                mode: "insensitive"
            }
        },
        include: {
            variants: true,
        },
    });
    return NextResponse.json(products);
}
