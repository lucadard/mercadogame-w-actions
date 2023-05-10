'use client'
import { useGame } from '@/store/zustand'
import React from 'react'
// import { useGame } from '../context/GameContext'

type Props = {}

const Score = (props: Props) => {
  const { round, score } = useGame()
  return (
    <div>
      <p>
        Ronda: <span>{round}</span>
      </p>
      <p>
        Puntuación: <span>{score}</span>
      </p>
    </div>
  )
}

export default Score
