'use client'

import React, { useState } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(useGSAP)

type Props = {
  menuOpenState: boolean
  setMenuOpenState: React.Dispatch<React.SetStateAction<boolean>>
}

const Hamburger = ({ menuOpenState, setMenuOpenState }: Props) => {
  const [mouseEntered, setMouseEntered] = useState<boolean>(false)
  useGSAP(() => {
    gsap.to('#hamburger-0', {
      top: menuOpenState ? '50%' : '0',
      transform: menuOpenState ? 'rotate(135deg)' : 'rotate(0deg)',
      duration: 0.25,
    })

    gsap.to('#hamburger-1', {
      top: menuOpenState ? '50%' : 'calc(100% - 3px)',
      transform: menuOpenState ? 'rotate(-135deg)' : 'rotate(0deg)',
      duration: 0.25,
    })
  }, [menuOpenState])

  useGSAP(() => {
    gsap.to('#bg-hamburger', {
      scale: mouseEntered ? 1 : 0,
      opacity: mouseEntered ? 1 : 0,
    })
  }, [mouseEntered])

  return (
    <div
      className="w-[40px] h-[43px] flex justify-center items-center cursor-pointer relative rounded-[10px] overflow-hidden"
      onMouseEnter={() => setMouseEntered(true)}
      onMouseLeave={() => setMouseEntered(false)}
    >
      <div
        className="absolute top-0 left-0 w-full h-full bg-light-black scale-0 opacity-0"
        id="bg-hamburger"
      ></div>
      <div
        className="w-[26px] h-[14px] relative"
        onClick={() => setMenuOpenState(!menuOpenState)}
        id="hamburger"
      >
        <div
          className="w-full h-[3px] rounded-[5px] bg-white absolute top-0"
          id="hamburger-0"
        ></div>
        <div
          className="w-full h-[3px] rounded-[5px] bg-white absolute bottom-0"
          id="hamburger-1"
        ></div>
      </div>
    </div>
  )
}

export default Hamburger
