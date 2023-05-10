import { Category } from '@/types'
import CategoryCard from './Card'
import { getCategories } from '@/app/actions'
import { Suspense } from 'react'

const Skeleton = () => (
  <section className='mx-auto flex w-full max-w-[600px] flex-col'>
    <h3 className='mb-2 pl-3'>1. Selecciona una categoria:</h3>
    <div className='h-[342px] select-none rounded-sm bg-white shadow-sm sm:h-[180px]'>
      <div className='h-full w-full animate-pulse bg-black/20' />
    </div>
  </section>)

export default function Wrapper () {
  const promise = getCategories()
  return (
    <>
      <Suspense fallback={<Skeleton />}>
        {/* @ts-expect-error */}
        <CategoriesSection promise={promise} />
      </Suspense>
    </>
  )
}

async function CategoriesSection ({ promise }: { promise: Promise<Category[]> }) {
  const categories = await promise
  return (
    <section className='mx-auto flex w-full max-w-[600px] flex-col'>
      <h3 className='mb-2 pl-3'>1. Selecciona una categoria:</h3>
      <div className='grid select-none rounded-sm bg-white shadow-sm hover:shadow-lg md:h-[180px] md:grid-cols-3'>
        {categories.map(({ id, name }: Category) => (
          <CategoryCard
            key={id}
            id={id}
            name={name}
          />
        ))}
      </div>
    </section>
  )
}
