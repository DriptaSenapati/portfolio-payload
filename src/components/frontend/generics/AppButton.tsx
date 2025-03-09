'use client'

import Image from 'next/image'
import React, { useState } from 'react'
import glow from '@/assets/images/glow-new.png'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(useGSAP)

type Props = {
  children: React.ReactNode
  id?: string
}

const AppButton = ({ children, id }: Props) => {
  const [buttonHovered, setButtonHovered] = useState(false)

  useGSAP(() => {
    gsap.to('#app-hero-gradient', {
      background: buttonHovered
        ? 'radial-gradient(60.1% 50% at 50% 100%, rgb(255, 255, 255) 0%, rgba(255, 255, 255, 0) 100%)'
        : 'radial-gradient(20.7% 50% at 50% 100%, rgb(255, 255, 255) 0%, rgba(255, 255, 255, 0) 100%)',
    })
  }, [buttonHovered])

  return (
    <div
      className="bg-background-2/10 text-white rounded-[118px] w-[185px] h-[58px] flex justify-center items-center cursor-pointer relative"
      onMouseEnter={() => setButtonHovered(true)}
      onMouseLeave={() => setButtonHovered(false)}
      {...(id && { id })}
    >
      <div
        className="absolute top-0 left-0 w-full h-full button-radial z-[-1] rounded-[118px]"
        id="app-hero-gradient"
      ></div>
      <div className="absolute -bottom-6 w-[90%] h-[100%] z-[-1]">
        <Image src={glow.src} fill alt="Glow" />
      </div>
      <div className="w-[180px] h-[53px] rounded-[118px] bg-black flex flex-row justify-center gap-2.5 items-center">
        {children}
      </div>
    </div>
  )
}

export default AppButton
