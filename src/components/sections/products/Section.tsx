'use client'
import { Product } from '@/types'
import ProductCard from './Card'
import { useStore } from '@/store/zustand'

export default function Wrapper () {
  const { products } = useStore()
  if (!products.length) return null

  return (
    <>
      <ProductsSection products={products} />
    </>
  )
}

function ProductsSection ({ products }: { products: Product[] }) {
  return (
    <section className='mx-auto flex flex-col gap-2'>
      <h3 className='mx-auto mb-7 w-full max-w-[600px] pl-3 font-medium md:mb-4'>
        3. Analiza y elegi tu respuesta:
      </h3>
      <div className='mx-auto grid min-h-[250px] auto-cols-min grid-cols-2 gap-4 lg:grid-flow-col'>
        {products.map(({ id, data }: Product, index) => {
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
