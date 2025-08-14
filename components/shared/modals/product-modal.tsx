"use client"

import { Dialog } from '@/components/ui';
import { DialogClose, DialogContent, DialogDescription, DialogTitle } from '@/components/ui/dialog';
import { cn } from '@/lib/utils';
import React from 'react';
import { useRouter } from 'next/navigation';
import { ProductForm } from '../product-form';
import { ProductRelations } from '@/@types/prisma';
import { PizzaForm } from '../pizza-form';
import { useCart } from '@/hooks';
import toast from 'react-hot-toast';
import { ChooseProductForm } from '../choose-product-form';
import { X } from 'lucide-react';
import { ClearButton } from '../clear-button';

interface Props {
    className?: string;
    product: ProductRelations;
}

export const ProductModal: React.FC<Props> = ({ className, product }) => {
    const router = useRouter()

    return (
        <Dialog open={Boolean(product)} onOpenChange={() => router.back()} >
            <DialogTitle></DialogTitle>
            <DialogContent className={cn('p-0 max-w-[1060px] min-h-[500px] bg-white max-lg:h-[100%] overflow-auto ', className)}>
                <ChooseProductForm product={product} onSubmit={() => router.back()} />
                
            </DialogContent>

            <DialogDescription></DialogDescription>
        </Dialog>
    );
};