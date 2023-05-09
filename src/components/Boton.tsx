'use client'
import { resetCategories } from '@/app/api/actions'
import { useStore as store } from '@/store/zustand'
import { useStore } from 'zustand'
import React, { useTransition } from 'react'

type Props = {}

const Boton = (props: Props) => {
  const [isPending, startTransition] = useTransition()
  const { selectedCategoryId, reset } = useStore(store)

  return (
    <>
      <p>{selectedCategoryId}</p>
      <button onClick={() => startTransition(async () => {
        await resetCategories()
      })}
      >categories
      </button>
    </>
  )
}

export default Boton
