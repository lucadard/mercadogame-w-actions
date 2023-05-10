'use client'
import React, { useTransition } from 'react'
import Emoji from '../../Emoji'
import { icons } from './iconsData'
import { useGame } from '@/store/zustand'
import { getRoundData } from '@/app/actions'
import SvgComponent from '@/assets/icons/LoadingSpinner'

type Props = {
  id: string
  name: string
}

const ErrorModal = () => (
  <div className='flex flex-col items-center gap-4'>
    <p className='text-center text-xl'>Ningún producto tiene suficientes preguntas para poder jugar.</p>
    <p className='text-center text-xl'>Se reinició la ronda.</p>
  </div>
)

const CategoryCard = ({ id, name }: Props) => {
  const { selectedCategoryId, selectCategory, setProducts, setQuestions, setModal, restartRound } = useGame()
  const [isPending, startTransition] = useTransition()

  return (
    <div
      className={`grid grid-rows-2 border-[1px] border-gray-100 p-4
        ${!selectedCategoryId
          ? 'cursor-pointer hover:bg-blue-500 hover:text-white'
          : (id === selectedCategoryId ? 'bg-blue-500 text-white' : '')
      }`}
      onClick={() => startTransition(async () => {
        if (selectedCategoryId) return
        try {
          selectCategory(id)
          const { products, questions } = await getRoundData(id)
          setProducts(products); setQuestions(questions)
        } catch (err) {
          setModal(<ErrorModal />)
          restartRound()
        }
      })}
    >
      <div className='flex items-end justify-center'>
        {isPending
          ? <SvgComponent width={40} height={40} stroke='white' className='translate-y-2 scale-[1.4] sm:translate-y-5' />
          : <Emoji name={icons[id as keyof typeof icons]} />}
      </div>
      {!isPending && <span className='mt-2 text-center text-[15px]'>{name}</span>}
    </div>
  )
}

export default CategoryCard
