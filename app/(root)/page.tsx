import { Container, Filters, Title, TopBar } from "@/components/shared";
import { ProductsGroupList } from "@/components/shared/products-group-list";
import { Suspense } from "react";
import { GetSearchParams, findPizaa } from "@/lib/find-pizza";
import { FilterButton } from "@/components/shared/filter-popup";
import { Stories } from "@/components/shared/stories";

export default async function Home({ searchParams }: { searchParams: Promise<GetSearchParams> }) {
    const categories = await findPizaa(searchParams)
    return (
        <div>
            <Container className='mt-10'>
                <Title text="Все пиццы" size="lg" className="font-extrabold" />
            </Container>
            <Stories />
            <FilterButton className="sm:hidden max-sm:mt-3"/>
            <TopBar categories={categories} />
            <Container className="mt-10 pb-14">
                <div className="flex gap-[80px]">
                    <div className="w-[250px] max-sm:hidden">
                        <Suspense>
                            <Filters />
                        </Suspense>
                    </div>
                    <div className="flex-1">
                        <div className="flex flex-col gap-16">
                            {categories?.map(({ name, id, products }) => products.length > 0 && (
                                <ProductsGroupList key={id} title={name} items={products} categoryId={id} />
                            ))}
                        </div>
                    </div>
                </div>
            </Container>

        </div>
    );
}
