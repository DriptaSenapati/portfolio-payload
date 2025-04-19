'use client'

import React, { useRef } from 'react'
import ContainerBox from '../generics/ContainerBox'
import TextAnimatorBox from '../generics/TextAnimatorBox'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import Button from '../generics/Button'
import { PiContactlessPaymentDuotone } from 'react-icons/pi'
import Image from 'next/image'
import useSWR from 'swr'
import { global_fetch_key } from '@/lib/swrKeys'
import { getGlobals } from '@/actions/globalActions'
import { Media } from '@/payload-types'

gsap.registerPlugin(useGSAP, ScrollTrigger)

const About = () => {
  const sentenceContainerRef = useRef<HTMLDivElement>(null)
  const wordContainerRef = useRef<(HTMLDivElement | null)[]>([])

  const { data: appConfig } = useSWR(global_fetch_key, getGlobals)

  useGSAP(() => {
    if (sentenceContainerRef.current && wordContainerRef.current) {
      const timeline = gsap
        .timeline({
          scrollTrigger: {
            trigger: '#about',
            start: 'top bottom-=300px',
            end: '+=300',
          },
        })
        .from('#about-header h2', {
          opacity: 0,
          y: 10,
          stagger: 0.2,
        })
        .from('#about-button', {
          filter: 'blur(10px)',
          opacity: 0,
          y: 10,
          duration: 0.4,
        })

      wordContainerRef.current.forEach((element, idx) => {
        const tween = gsap.from(element!.childNodes, {
          filter: 'blur(14px)',
          y: 10,
          opacity: 0,
          stagger: 0.1,
          duration: 1.5,
          ease: 'power3.out',
        })

        timeline.add(tween, idx === 0 ? 0 : 0.1)
      })
    }
  })

  return (
    <div
      className="w-full min-h-[70vh] flex justify-center items-center relative about-grid max-sm:pt-[150px] py-[100px]"
      id="about"
    >
      <div className="about-grid-overlay" />
      <div className="w-full">
        <ContainerBox className="max-xl:px-16 max-md:px-7">
          <div className="flex justify-between items-center w-full max-lg:flex-col max-lg:gap-16">
            <div className="flex-[0.6]">
              <div className="flex justify-start items-center gap-2.5" id="about-header">
                <h2 className="font-medium max-md:text-[36px]">More About</h2>
                <h2 className="font-normal italic text-background-2 font-instrument max-md:text-[36px]">
                  myself
                </h2>
              </div>
              <div className="h-5"></div>
              <TextAnimatorBox
                sentence={appConfig?.about.about_myself as string}
                textDivRef={sentenceContainerRef}
                textSpanRef={wordContainerRef}
              />
              {appConfig?.about.show_contant_button && (
                <>
                  <div className="h-10 max-md:h-5"></div>
                  <Button className="text-background-2 hover:text-white group" id="about-button">
                    <div className="flex gap-1.5 items-center justify-center">
                      <PiContactlessPaymentDuotone className="text-3xl transition-all duration-[0.25s]" />
                      <span className="text-p1 group-hover:text-white transition-all duration-[0.25s]">
                        Contact Me
                      </span>
                    </div>
                  </Button>
                </>
              )}
            </div>
            <div className="w-[450px] h-[450px] rounded-[50%] relative bg-light-black max-xl:w-[350px] max-xl:h-[350px] max-md:w-[250px] max-md:h-[250px]">
              <div className="absolute w-[100%] h-[200px] left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] bg-white-60 rounded-[100%] blur-[40px] max-xl:h-[200px] max-md:h-[100px]"></div>
              <div className="w-[98%] h-[98%] rounded-[50%] absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] overflow-hidden z-[2]">
                <Image
                  alt="about image"
                  src={(appConfig?.about.about_image as Media).url as string}
                  width={(appConfig?.about.about_image as Media).width as number}
                  height={(appConfig?.about.about_image as Media).height as number}
                  className="object-contain max-w-[500px] h-auto w-[100%] hover:scale-[1.1] transition-all duration-[0.25s]"
                />
              </div>
            </div>
          </div>
        </ContainerBox>
      </div>
      <div className="section_border absolute bottom-0 left-0" />
    </div>
  )
}

export default About
