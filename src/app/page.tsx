import CategoriesSection from '@/components/sections/categories/Section'
import ProductsSection from '@/components/sections/products/Section'
import QuestionSection from '@/components/sections/question/Section'
import NextRoundButton from '@/components/layout/NextRoundButton'

export default function Home () {
  return (
    <>
      <main className='flex flex-1 flex-col justify-between py-5'>
        <div className='flex flex-col gap-4'>
          <CategoriesSection />
          <QuestionSection />
          <ProductsSection />
        </div>
        <div className='mx-auto pt-5'>
          <NextRoundButton />
        </div>
      </main>
    </>
  )
}
