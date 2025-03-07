'use client'

import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import Particles, { initParticlesEngine } from '@tsparticles/react'
import { particleConfig } from '@/lib/constants'
import { loadFull } from 'tsparticles'
import ContainerBox from '../generics/ContainerBox'
import { CiLinkedin } from 'react-icons/ci'
import { FaGithub } from 'react-icons/fa'
import { CiFacebook } from 'react-icons/ci'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

//TODO: implement SWR and payload functionality

const Hero = () => {
  const [init, setInit] = useState(false)

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadFull(engine)
    }).then(() => {
      setInit(true)
    })
  }, [])

  return (
    <div className="hero">
      <Image
        src={'/highlight.jpg'}
        alt="Highlight"
        height={334}
        width={884}
        className="hero_highlight"
      />
      <div className="h-[30%] absolute bottom-0 w-[60%] left-0">
        {init && <Particles className="h-full" options={particleConfig} />}
      </div>
      <ContainerBox className="relative">
        <div className="absolute left-0 top-[50%] transform translate-y-[-50%] max-md:px-5">
          <div className="flex flex-row gap-4">
            <h1 className="inline-block font-medium">Dripta</h1>
            <h1 className="inline-block font-medium font-instrument italic text-background-2">
              Senapati
            </h1>
          </div>
          <div className="h-[15px]"></div>
          <div className="text-p1">Data Science Enthusiast and Full Stack Web Developer</div>
          <div className="h-[25px]"></div>
          <div className="flex flex-row gap-15">
            <Link href="https://www.linkedin.com/in/dripta-senapati-0b1b3b1b3/">
              <CiLinkedin className="text-background-2 text-4xl transition-all duration-700 hover:text-white" />
            </Link>
            <Link href="https://www.linkedin.com/in/dripta-senapati-0b1b3b1b3/">
              <FaGithub className="text-background-2 text-4xl transition-all duration-700 hover:text-white" />
            </Link>
            <Link href="https://www.linkedin.com/in/dripta-senapati-0b1b3b1b3/">
              <CiFacebook className="text-background-2 text-4xl transition-all duration-700 hover:text-white" />
            </Link>
          </div>
          <div className="h-[35px]"></div>
          <Button>My Resume</Button>
        </div>
      </ContainerBox>
    </div>
  )
}

export default Hero
