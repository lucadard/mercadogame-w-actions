'use client'
import { Product } from '@/types'
import ProductCard from './Card'
import { useGame } from '@/store/zustand'

export default function ProductsSection () {
  const { products } = useGame()

  return (
    <section className='mx-auto flex w-full flex-col'>
      <h3 className='mx-auto mb-2 w-full max-w-[600px] pl-3'>
        3. Analiza y elegi tu respuesta:
      </h3>
      <div className='mx-auto grid min-h-[250px] auto-cols-min grid-cols-2 gap-4 lg:grid-flow-col'>
        {products?.map(({ id, data }: Product, index) => {
          return (
            <ProductCard
              key={id}
              id={id}
              data={data}
            />
          )
        })}
      </div>
    </section>
  )
}
