"use client"

import { Container, Filters, ProductCard, Title, TopBar } from "@/components/shared";
import { ProductsGroupList } from "@/components/shared/products-group-list";
import { useEffect } from "react";
import axios from "axios";
import { Item, useProducts } from "./store/product";

export default function Home() {
  const { items, setItems } = useProducts()

  useEffect(() => {
    async function getProducts() {
      const { data } = await axios.get('http://localhost:3000/api/products/search')
      console.log(data)
      setItems(data)
    }
    getProducts()
  }, [])

  const pizzas = [
    {
      id: 1,
      name: "Сырный цыпленок",
      price: 2000,
      imageUrl: "/assets/Pizzas/11EE7D610CF7E265B7C72BE5AE757CA7.jpg",
      variants: [{ price: 2000 }],
    },
    {
      id: 2,
      name: "Сырный цыпленок",
      price: 2000,
      imageUrl: "/assets/Pizzas/11EE7D610CF7E265B7C72BE5AE757CA7.jpg",
      variants: [{ price: 2000 }]
    },
    {
      id: 3,
      name: "Сырный цыпленок",
      price: 2000,
      imageUrl: "/assets/Pizzas/11EE7D610CF7E265B7C72BE5AE757CA7.jpg",
      variants: [{ price: 2000 }]
    },
    {
      id: 4,
      name: "Сырный цыпленок",
      price: 2000,
      imageUrl: "/assets/Pizzas/11EE7D610CF7E265B7C72BE5AE757CA7.jpg",
      variants: [{ price: 2000 }]
    },
    {
      id: 5,
      name: "Сырный цыпленок",
      price: 2000,
      imageUrl: "/assets/Pizzas/11EE7D610CF7E265B7C72BE5AE757CA7.jpg",
      variants: [{ price: 2000 }]
    },
    {
      id: 6,
      name: "Сырный цыпленок",
      price: 2000,
      imageUrl: "/assets/Pizzas/11EE7D610CF7E265B7C72BE5AE757CA7.jpg",
      variants: [{ price: 2000 }]
    },
  ]
  return (
    <div>
      <Container className='mt-10'>
        <Title text="Все пиццы" size="lg" className="font-extrabold" />
      </Container>
      <TopBar />
      <Container className="mt-10 pb-14">
        <div className="flex gap-[80px]">
          <div className="w-[250px]">
            <Filters />
          </div>
          <div className="flex-1">
            <div className="flex flex-col gap-16">
              <ProductsGroupList title="Пиццы" items={items} categoryId={1} />
              <ProductsGroupList title="Комбо" items={items} categoryId={2} />
              <ProductsGroupList title="Завтраки" items={items} categoryId={3} />
              <ProductsGroupList title="Десерты" items={items} categoryId={4} />
              <ProductsGroupList title="Кофе" items={items} categoryId={5} />
            </div>
          </div>
        </div>
      </Container>

    </div>
  );
}
