'use client'

import React, { useRef } from 'react'
import ContainerBox from '../generics/ContainerBox'
import TextAnimatorBox from '../generics/TextAnimatorBox'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import Button from '../generics/Button'
import { PiContactlessPaymentDuotone } from 'react-icons/pi'

gsap.registerPlugin(useGSAP, ScrollTrigger)

const About = () => {
  const sentenceContainerRef = useRef<HTMLDivElement>(null)
  const wordContainerRef = useRef<(HTMLDivElement | null)[]>([])

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
      className="w-full min-h-[70vh] flex justify-center items-center relative about-grid"
      id="about"
    >
      <div className="about-grid-overlay" />
      <div className="w-full">
        <ContainerBox>
          <div className="flex justify-between items-center w-full max-md:flex-col max-md:px-5">
            <div>
              <div className="flex justify-start items-center gap-2.5" id="about-header">
                <h2 className="font-medium">More About</h2>
                <h2 className="font-normal italic text-background-2 font-instrument">myself</h2>
              </div>
              <div className="h-2.5"></div>
              <TextAnimatorBox
                sentence={`Hi, I’m Dripta Senapati, a passionate web designer with a<br/>mission to bring creative ideas to life through exceptional design. `}
                textDivRef={sentenceContainerRef}
                textSpanRef={wordContainerRef}
              />
              <div className="h-10"></div>
              <Button className="text-background-2 hover:text-white group" id="about-button">
                <div className="flex gap-1.5 items-center justify-center">
                  <PiContactlessPaymentDuotone className="text-3xl transition-all duration-[0.25s]" />
                  <span className="text-p1 group-hover:text-white transition-all duration-[0.25s]">
                    Contact Me
                  </span>
                </div>
              </Button>
            </div>
            <div className=" w-[50%]"></div>
          </div>
        </ContainerBox>
      </div>
    </div>
  )
}

export default About
