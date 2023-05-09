import { Category } from '@/types'
import CategoryCard from './Card'
import { getCategories } from '@/app/api/actions'

export default function Wrapper () {
  const promise = getCategories()
  return (
    <>
      {/* @ts-expect-error */}
      <CategoriesSection promise={promise} />
    </>
  )
}

async function CategoriesSection ({ promise }: { promise: Promise<{ categories: Category[] }> }) {
  const { categories } = await promise
  return (
    <section className='mx-auto mb-7 flex max-w-[600px] flex-col gap-2 md:mb-4'>
      <h3 className='pl-3 font-medium'>1. Selecciona una categoria:</h3>
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
