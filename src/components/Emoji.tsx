import React from 'react'
import Image from 'next/image'

type Props = {
  name: string
  size?: 'sm' | 'md' | 'lg'
}

const sizes = {
  sm: 20,
  md: 40,
  lg: 60
}

const Emoji = ({ name, size = 'md' }: Props) => {
  return (
    <Image
      src={`/public/emojis/${name}.png`}
      alt={`${name} emoji`}
      height={sizes[size]} width={sizes[size]}
      className='object-contain'
    />
  )
}

export default Emoji
