'use client'
import { useGame } from '@/store/zustand'
import React, { useState, useTransition } from 'react'
import Button from '@/components/Button'
import { resetCategories, sendScore } from '@/app/actions'

const SubmitScore = () => {
  const [name, setName] = useState('')
  const { restartGame, score, setModal } = useGame()
  const [isPending, startTransition] = useTransition()
  const [showMessage, setShowMessage] = useState(false)

  return (
    <div className='flex flex-col items-center gap-8'>
      <p className='text-center text-2xl'>
        Tu puntuacion es de <span className='text-3xl font-bold'>{score}</span> puntos!
      </p>
      <div>
        <form
          onSubmit={(e) => {
            e.preventDefault()
            startTransition(async () => {
              const send = await sendScore(name, score)
              if (!send) setShowMessage(true)
              else {
                restartGame()
                setModal(<p className='text-center'>Se envió tu puntuacion!</p>)
              }
            })
          }}
          className='mb-2 flex flex-col gap-2'
        >
          <label className='block text-lg md:flex md:items-baseline md:gap-2'>
            <p>Ingresa tu nombre:</p>
            <div className='relative my-2 flex flex-col md:my-0'>
              <input
                type='text'
                className='border-2 py-2 pl-2'
                value={name}
                onChange={(e) => {
                  setShowMessage(false)
                  setName(e.target.value.toUpperCase().slice(0, 4))
                }}
              />
            </div>
          </label>
          <Button disabled={isPending} size='lg'>
            <span>Enviá tu puntuación</span>
          </Button>
          <p className='text-center'>ó directamente</p>
        </form>
        <Button
          action={() => {
            restartGame()
            setModal(undefined)
          }} size='lg'
        >
          <span>Jugá otra vez</span>
        </Button>
        {showMessage && <p className='mt-2 text-center text-lg text-red-600'>Ocurrió un error, intenta otra vez.</p>}
      </div>
    </div>
  )
}

const TOTAL_ROUNDS = 5
const NextRoundButton = () => {
  const [isPending, startTransition] = useTransition()
  const { selectedProductId, nextRound, round, setModal } = useGame()

  const isLastRound = round === TOTAL_ROUNDS

  const handleAction = () => startTransition(async () => {
    if (isLastRound) return setModal(<SubmitScore />)
    await resetCategories()
    nextRound()
  })

  return (
    <Button
      disabled={!selectedProductId || isPending}
      action={() => handleAction()}
    >
      <span>{isLastRound ? 'Finalizar juego' : 'Siguiente Ronda'}</span>
    </Button>
  )
}

export default NextRoundButton
