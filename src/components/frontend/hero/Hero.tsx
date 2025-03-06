import Image from 'next/image'
import React from 'react'

const Hero = () => {
  return (
    <div className="hero">
      <Image
        src={'/highlight.jpg'}
        alt="Highlight"
        height={334}
        width={884}
        className="hero_highlight"
      />
    </div>
  )
}

export default Hero
