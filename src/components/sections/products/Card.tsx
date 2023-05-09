'use client'
import React from 'react'
import { useStore } from '@/store/zustand'
import { Product } from '@/types'

type Props = {
  id: Product['id']
  data: Product['data']
}

const ProductCard = ({ id, data }: Props) => {
  const { selectedProductId, selectProduct } = useStore()

  const userHasSelected = selectedProductId !== undefined
  const isSelected = id === selectedProductId
  const isCorrectAnswer = false

  return (
    <div className='h-[220px] w-[140px] sm:h-[250px] sm:w-[180px]'>
      {!data
        ? <div className='grid aspect-square w-full place-content-center'>
          {/* <LoadingSpinner size={50} /> */}...
          </div>
        : <div
            className={`group relative overflow-hidden rounded-md bg-white transition-all
            ${userHasSelected ? '' : 'cursor-pointer'}
            ${isSelected ? 'shadow-lg' : ''}
            ${isSelected || isCorrectAnswer ? '' : 'max-h-[180px] shadow-sm hover:max-h-[250px] hover:shadow-lg'}`}
            onClick={() => !userHasSelected && selectProduct(id)}
          >
          {isCorrectAnswer &&
            <div className='pointer-events-none absolute left-0 top-0 flex w-full items-center justify-center lg:h-[180px]'>
              <span
                className={`material-symbols-outlined text-9xl 
                ${isCorrectAnswer && isSelected ? 'text-green-600' : ''}`}
              >
                check_circle
              </span>
            </div>}
          <img
            className={`aspect-square w-full object-contain
            ${isSelected || isCorrectAnswer ? 'opacity-30' : ''}`}
            src={data.thumbnail}
            alt={`Foto de ${data.title}`}
          />
          <div
            className={`overflow-hidden transition-all duration-300
            ${isSelected || isCorrectAnswer ? 'max-h-14' : 'max-h-0 group-hover:max-h-14'}`}
          >
            <div className='h-[1px] bg-gray-400/30' />
            <div
              className={`text-ellipsis p-2 px-3 text-[13px] text-gray-600 transition-all duration-100 group-hover:delay-200 group-hover:duration-200
              ${isSelected || isCorrectAnswer ? 'opacity-70' : 'opacity-0 group-hover:opacity-100'}`}
            >
              <p className='max-h-10 overflow-hidden'>{data.title}</p>
            </div>
          </div>
          </div>}
    </div>
  )
}

export default ProductCard
