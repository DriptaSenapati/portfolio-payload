'use client'

import Image from 'next/image'
import React, { useEffect, useRef, useState } from 'react'
import Particles, { initParticlesEngine } from '@tsparticles/react'
import { particleConfig } from '@/lib/constants'
import { loadBasic } from '@tsparticles/basic'
import ContainerBox from '../generics/ContainerBox'
import { CiLinkedin } from 'react-icons/ci'
import { FaGithub } from 'react-icons/fa'
import { CiFacebook } from 'react-icons/ci'
import Link from 'next/link'
import AppButton from '../generics/AppButton'
import { PiReadCvLogoFill } from 'react-icons/pi'
import { IoIosArrowDown } from 'react-icons/io'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import useSWR from 'swr'
import { global_fetch_key } from '@/lib/swrKeys'
import { getGlobals } from '@/actions/globalActions'
import { Media } from '@/payload-types'

gsap.registerPlugin(useGSAP)

//TODO: implement SWR and payload functionality

const Hero = () => {
  const [init, setInit] = useState(false)
  const nameRef = useRef<HTMLDivElement>(null)
  const descRef = useRef<HTMLDivElement>(null)

  const { data: appGlobal } = useSWR(global_fetch_key, getGlobals)

  useGSAP(() => {
    gsap.to('#scroll-down', {
      y: 10,
      duration: 1.2,
      ease: 'power1.inOut',
      yoyo: true,
      repeat: -1,
    })
  })

  useGSAP(() => {
    gsap
      .timeline()
      .from(nameRef.current!.childNodes, {
        filter: 'blur(10px)',
        y: 5,
        opacity: 0,
        stagger: 0.2,
        duration: 1.5,
        ease: 'power3.out',
      })
      .from(
        descRef.current!.childNodes,
        {
          filter: 'blur(10px)',
          y: 5,
          opacity: 0,
          stagger: 0.05,
          duration: 0.8,
          ease: 'power3.out',
        },
        '-=70%',
      )
      .from(
        '#socials',
        {
          opacity: 0,
          ease: 'power3.out',
          duration: 0.8,
        },
        '-=90%',
      )
      .from(
        '#resume_download',
        {
          opacity: 0,
          ease: 'power3.out',
          duration: 0.8,
        },
        '-=90%',
      )
  })

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadBasic(engine)
    }).then(() => {
      setInit(true)
    })
  }, [])

  return (
    <div className="hero" id="home">
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
        <div className="absolute left-0 top-[50%] transform translate-y-[-50%] max-xl:px-5">
          <div className="flex flex-row gap-4" ref={nameRef}>
            <h1 className="inline-block font-medium">Dripta</h1>
            <h1 className="inline-block font-medium font-instrument italic text-background-2">
              Senapati
            </h1>
          </div>
          <div className="h-[15px]"></div>
          <div
            className="text-p1 flex justify-start items-center gap-1 flex-wrap md:gap-1.5"
            ref={descRef}
          >
            {appGlobal?.home.home_title
              .split(' ')
              .map((word, index) => (
                <span dangerouslySetInnerHTML={{ __html: word }} key={index} />
              ))}
          </div>
          <div className="h-[25px]"></div>
          <div className="flex flex-row gap-15" id="socials">
            <Tooltip>
              <TooltipTrigger>
                <Link href={appGlobal?.home.connect_links.linkedin_link as string}>
                  <CiLinkedin className="text-background-2 text-4xl transition-all duration-700 hover:text-white" />
                </Link>
              </TooltipTrigger>
              <TooltipContent>
                <p>LinkedIn</p>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger>
                <Link href={appGlobal?.home.connect_links.github_link as string}>
                  <FaGithub className="text-background-2 text-4xl transition-all duration-700 hover:text-white" />
                </Link>
              </TooltipTrigger>
              <TooltipContent>
                <p>GitHub</p>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger>
                <Link href={appGlobal?.home.connect_links.facebook_link as string}>
                  <CiFacebook className="text-background-2 text-4xl transition-all duration-700 hover:text-white" />
                </Link>
              </TooltipTrigger>
              <TooltipContent>
                <p>Facebook</p>
              </TooltipContent>
            </Tooltip>
          </div>
          <div className="h-[35px]"></div>
          <Link href={(appGlobal?.home.resume_doc as Media).url as string} target="_blank">
            <AppButton id="resume_download">
              <PiReadCvLogoFill className="text-white text-3xl" />
              <span className="text-p1 text-white font-semibold">My Resume</span>
            </AppButton>
          </Link>
        </div>
      </ContainerBox>
      <div
        className="absolute bottom-[9%] text-white text-4xl left-[50%] transform translate-x-[-50%]"
        id="scroll-down"
      >
        <IoIosArrowDown />
      </div>
      <div className="section_border absolute bottom-0 left-0" />
    </div>
  )
}

export default Hero
