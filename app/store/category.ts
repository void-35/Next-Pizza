import { create } from 'zustand'

interface CategoryState {
    categoryId: number,
    setCategoryId: (newCategory: number) => void,
}

export const useCategoryStore = create<CategoryState>((set) => ({
    categoryId: 0,
    setCategoryId: (newCategoryId) => set(() => ({ categoryId: newCategoryId })),
}))