import React from 'react';

import { Container, GroupVariants, PizzaImage, ProductModal, Title } from "@/components/shared"
import { prisma } from "@/prisma/prisma-client"
import { notFound } from "next/navigation"

export default async function ProductPage({ params }: { params: Promise<{ id: number }> }) {
  const { id } = await params
  const product = await prisma.product.findFirst({
    where: {
      id: Number(id)
    },
    include: {
      variants: {},
      ingredients:{}
    }
  })

  if (!product) {
    return notFound()
  }
  return (<ProductModal product={product} />)
}
