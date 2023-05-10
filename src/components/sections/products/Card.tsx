/* eslint-disable react/jsx-indent */
'use client'
import React, { useState } from 'react'
import { useGame } from '@/store/zustand'
import { type Product } from '@/types'
import LoadingSpinner from '@/assets/icons/LoadingSpinner'
import Check from '@/assets/icons/Check'
import Image from 'next/image'

type Props = {
  id: Product['id']
  data: Product['data']
}

function BlurImage ({ src, alt }: { src: string, alt: string }) {
  const [loading, setLoading] = useState(true)
  return (
    <Image
      height={180} width={180}
      className={`aspect-square w-full object-contain duration-700 ease-in-out 
      ${loading
        ? 'scale-110 blur-md grayscale'
        : 'scale-100 blur-0 grayscale-0'}`}
      src={src}
      alt={alt}
      onLoadingComplete={() => setLoading(false)}
    />
  )
}

const ProductCard = ({ id, data }: Props) => {
  const { selectedProductId, sendResponse, questions } = useGame()

  const userHasSelected = selectedProductId !== undefined
  const isSelected = id === selectedProductId
  const isCorrectAnswer = questions.length !== 0 && questions[0].item_id === id
  const showCheckIcon = userHasSelected && isCorrectAnswer

  function handleSelect () {
    if (userHasSelected) return
    sendResponse(id)
  }

  return (
    <div className='h-[230px] w-[180px]'>
      {!data
        ? <div className='grid aspect-square w-full place-content-center opacity-70'>
          <LoadingSpinner width={60} height={60} stroke='rgb(52, 131, 250)' />
          </div>
        : <div
            className={`group relative overflow-hidden rounded-md bg-white transition-all
            ${userHasSelected ? '' : 'cursor-pointer'}
            ${isSelected ? 'shadow-lg' : ''}`}
            onClick={handleSelect}
          >
          {showCheckIcon &&
            <div className='pointer-events-none absolute left-0 top-0 flex h-[180px] w-full items-center justify-center'>
              <Check
                width={120} height={120}
                fill={isCorrectAnswer ? 'green' : 'black'}
              />
            </div>}
            <div className={showCheckIcon || isSelected ? 'opacity-30' : ''}>
              <BlurImage src={data.thumbnail} alt={`Foto de ${data.title}`} />
            </div>
          <div
            className={`overflow-hidden transition-all duration-300
            ${showCheckIcon || isSelected ? 'max-h-14' : 'max-h-0 group-hover:max-h-14'}`}
          >
            <div className='h-[1px] bg-gray-400/30' />
            <div
              className={`text-ellipsis p-2 px-3 text-[13px] text-gray-600 transition-all duration-100 group-hover:delay-200 group-hover:duration-200
              ${showCheckIcon || isSelected ? 'opacity-70' : 'opacity-0 group-hover:opacity-100'}`}
            >
              <p className='max-h-10 overflow-hidden'>{data.title}</p>
            </div>
          </div>
          </div>}
    </div>
  )
}

export default ProductCard
