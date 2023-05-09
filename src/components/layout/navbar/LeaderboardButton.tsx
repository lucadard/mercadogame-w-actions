'use client'
import Button from '@/components/Button'
import React from 'react'
import { usePathname } from 'next/navigation'

type Props = {}

const LeaderboardButton = (props: Props) => {
  const path = usePathname()
  return (
    <Button
      style='dashed'
      active={path === '/leaderboard'}
    >
      <span>Tabla de posiciones</span>
    </Button>
  )
}

export default LeaderboardButton
