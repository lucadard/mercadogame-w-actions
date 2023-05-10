import Lock from '@/assets/icons/Lock'
import React, { useState } from 'react'

type Props = {}

const LockIcon = (props: Props) => {
  const [showMessage, setShowMessage] = useState(false)
  return (
    <div className='grid min-h-[62px] place-content-center bg-white shadow-sm hover:shadow-lg'>
      <div
        className={`pointer-events-none absolute translate-x-[320px] translate-y-[-10px] transition-opacity duration-200 
        ${showMessage ? 'opacity-70' : 'opacity-0'}`}
      >
        <span className='whitespace-nowrap rounded-md bg-black px-3 py-2 text-white'>
          Primero tenes que seleccionar una categoria!
        </span>
      </div>
      <Lock
        height={25} onMouseEnter={() => setShowMessage(true)}
        onMouseLeave={() => setShowMessage(false)}
      />
    </div>
  )
}

export default LockIcon
