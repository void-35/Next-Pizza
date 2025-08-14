import { ChooseProductForm, Container } from "@/components/shared"
import { ProductsGroupList } from "@/components/shared/products-group-list"
import { prisma } from "@/prisma/prisma-client"
import { notFound } from "next/navigation"

export default async function ProductPage({ params }: { params: Promise<{ id: number }> }) {
    const { id } = await params
    const product = await prisma.product.findFirst({
        where: {
            id: Number(id)
        },
        include: {
            ingredients: true,
            variants: true,
            category: {
                include: {
                    products: {
                        include: {
                            variants: true,
                            ingredients: true
                        }
                    }
                }
            }
        }
    })

    if (!product) {
        return notFound()
    }
    return (
        <div>
            <Container className="flex flex-col lg:my-10">
                <ChooseProductForm
                    product={product}
                />
                <ProductsGroupList
                    className="mt-20"
                    listClassName="grid-cols-4"
                    key={product.category.id}
                    title="Рекомендации"
                    items={product.category.products}
                    categoryId={product.category.id}
                />
            </Container>
        </div>
    )
}
