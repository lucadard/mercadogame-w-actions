'use client'
import { useGame } from '@/store/zustand'
import LockIcon from './LockIcon'
import Text from './Text'
import { useState } from 'react'
import Refresh from '@/assets/icons/Refresh'

const QuestionSection = () => {
  const [animateRotate, setAnimateRotate] = useState(false)
  const { selectedProductId, questions, removeQuestion } = useGame()

  const isRoundFinished = selectedProductId !== undefined
  const isQuestion = questions.length
  const isNextQuestion = questions.length > 1

  const renderChildren = () => {
    if (!isQuestion) return <LockIcon />
    return <Text>{questions[0].text}</Text>
  }

  return (
    <section className='relative z-20 mx-auto flex w-full max-w-[600px] flex-col'>
      <div className='mb-2 flex w-full items-center justify-start'>
        <h3 className='pl-3  '>
          2. Hace click para revelar la pregunta:
        </h3>
        <Refresh
          height={20}
          width={30}
          onClick={() => {
            removeQuestion()
            setAnimateRotate(true)
            setTimeout(() => { setAnimateRotate(false) }, 500)
          }}
          className={`cursor-pointer select-none text-lg transition-opacity duration-500 
          ${animateRotate ? 'animate-rotate' : ''}
          ${!isNextQuestion || isRoundFinished ? 'pointer-events-none opacity-0' : ''}`}
        />
      </div>
      <div className='h-[60px] bg-white'>
        {renderChildren()}
      </div>
    </section>
  )
}

export default QuestionSection
