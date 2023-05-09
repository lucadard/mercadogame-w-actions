'use client'
/* eslint-disable @typescript-eslint/restrict-template-expressions */
import React, { useTransition } from 'react'
// import { LoadingSpinner } from '../../../assets/Loading'
// import { useGame } from '../../../context/GameContext'
import Emoji from '../../Emoji'
import { icons } from './iconsData'
import { useStore } from '@/store/zustand'
import { getProductsWithDetails, getProductsId } from '@/app/api/actions'

type Props = {
  id: string
  name: string
}

const CategoryCard = ({ id, name }: Props) => {
  const { selectedCategoryId, selectCategory, setProducts } = useStore()
  const [isPending, startTransition] = useTransition()

  return (
    <div
      className={`grid grid-rows-2 border-[1px] border-gray-100 p-4
        ${!selectedCategoryId
          ? 'cursor-pointer hover:bg-blue-500 hover:text-white'
          : (id === selectedCategoryId && 'bg-blue-500 text-white')
      }`}
      onClick={() => startTransition(async () => {
        selectCategory(id)
        const ids: string[] = await getProductsId(id)
        setProducts(ids.map(id => ({ id, data: undefined })))
        const { products } = await getProductsWithDetails(ids)
        console.log(products)
        setProducts(products)
      })}
    >
      {!isPending
        ? (
          <>
            <div className='flex items-end justify-center'>
              <Emoji name={icons[id as keyof typeof icons]} />
            </div>
            <span className='mt-2 text-center text-[15px]'>{name}</span>
          </>
          )
        : (
          <div className='flex items-end justify-center'>
            {/* <LoadingSpinner size={40} /> */}...
          </div>
          )}
    </div>
  )
}

export default CategoryCard
