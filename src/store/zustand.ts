/* eslint-disable @typescript-eslint/no-misused-promises */
import { Category, Product } from '@/types'
import { create } from 'zustand'

type Store = {
  selectedCategoryId: Category['id'] | undefined
  selectedProductId: Product['id'] | undefined
  selectCategory: (id: Category['id']) => void
  selectProduct: (id: Product['id']) => void

  products: Product[]
  setProducts: (products: Product[]) => void
  reset: () => void
}

export const useStore = create<Store>((set, get) => ({
  selectedCategoryId: undefined,
  selectedProductId: undefined,
  selectCategory: (id: string) =>
    set((state) => ({ ...state, selectedCategoryId: id })),
  selectProduct: (id: string) =>
    set((state) => ({ ...state, selectedProductId: id })),

  products: [],
  setProducts: (products: Product[]) =>
    set((state) => ({ ...state, products })),
  reset: () => set((state) => ({
    ...state,
    selectedCategoryId: undefined,
    selectedProductId: undefined
  }))
}))
