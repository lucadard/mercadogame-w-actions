'use client'
import { useGame } from '@/store/zustand'
import React from 'react'

export default function Wrapper () {
  const { modal, setModal } = useGame()
  if (!modal) return null
  return <Modal content={modal} onClose={() => setModal(undefined)} />
}

function Modal ({ content, onClose }: { content: React.ReactNode, onClose: () => void }) {
  return (
    <div className='fixed left-0 top-0 z-[100] h-screen w-screen'>
      <div
        className='absolute h-full w-full select-none bg-black/50'
        onClick={onClose}
      />
      <div className='pointer-events-none mt-[-10vh] flex h-full items-center justify-center px-10'>
        <div className='pointer-events-auto relative flex w-full max-w-3xl flex-col gap-4 rounded-md bg-white p-10'>
          <div onClick={onClose} className='absolute right-0 top-0 m-2 cursor-pointer p-2 hover:opacity-50'>╳</div>
          {content}
        </div>
      </div>
    </div>
  )
}
