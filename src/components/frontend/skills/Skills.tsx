'use client'

import React from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import ContainerBox from '../generics/ContainerBox'
import RightSkillBox from './RightSkillBox'

gsap.registerPlugin(useGSAP, ScrollTrigger)

const Skills = () => {
  useGSAP(() => {
    gsap
      .timeline({
        scrollTrigger: {
          trigger: '#skill-section',
          start: 'top center',
          // end: 'bottom bottom',
          // scrub: 1,
          // markers: true,
        },
        repeat: -1,
        repeatDelay: 1,
      })
      .to('.skill-pipe-mask-left', {
        x: '-200%',
        duration: 1.5,
      })
      .to(
        '.skill-pipe-mask',
        {
          x: '200%',
          duration: 1.5,
        },
        '-=110%',
      )

    gsap
      .timeline({
        scrollTrigger: {
          trigger: '#skill-section',
          start: 'top center',
          // end: 'bottom bottom',
          // scrub: 1,
          // markers: true,
        },
      })
      .to('.skill-right-box', {
        '--angle': '120deg',
        duration: 1.2,
      })
  })

  // useGSAP(() => {
  //   const headerHeight = gsap.getProperty("#right-box-header", "height");
  //   gsap.set("#right-box-body", {

  //   })
  // })

  const skillList = Array.from({ length: 20 }, () => ({
    name: 'NodeJS',
    rating: 4.5,
  }))

  return (
    <div className="h-screen relative overflow-hidden" id="skill-section">
      <div className="absolute top-[100px] w-full">
        <ContainerBox className="max-xl:px-16 max-md:px-7 space-y-4">
          <div className="flex gap-3 items-center justify-center">
            <div className="w-[69px] h-[1px] header-gradient-left"></div>
            <p className="text-p1 italic">Explore my skills</p>
            <div className="w-[69px] h-[1px] header-gradient-right"></div>
          </div>
          <p className="text-p1">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto, expedita dolor
            blanditiis in nulla cum amet quod repudiandae fuga reiciendis, officia aperiam
            perferendis vero quia minus! Nobis facilis quasi itaque.
          </p>
        </ContainerBox>
      </div>
      <div className="flex justify-center items-center h-full">
        <div className="flex items-center gap-[100px] relative">
          <p className="text-p1 absolute left-[50%] translate-x-[-50%] translate-y-[-50%] top-[50%]">
            My Skills
          </p>
          <div className="relative w-[25vw] h-[341px]">
            <div className="absolute top-0 left-0 w-full h-full">
              <svg
                width="100%"
                height="100%"
                viewBox="0 0 401 340"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M399.5 176.5C177.5 187.5 243 288 1 338" stroke="#262626" strokeWidth="2" />
                <path
                  d="M400 163.5C178 152.5 243.5 52 1.5 2.00003"
                  stroke="#262626"
                  strokeWidth="2"
                />
                <path d="M399 169.5L1.00002 170.5" stroke="#262626" strokeWidth="2" />
              </svg>
            </div>
            <div className="absolute top-0 left-0 w-full h-full">
              <svg
                width="100%"
                height="100%"
                viewBox="0 0 401 340"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  <linearGradient id="skill-pipe-gradient-left">
                    <stop offset={0} stopColor="white" stopOpacity={0} />
                    <stop offset={0.5} stopColor="white" stopOpacity={1} />
                    <stop offset={0.5} stopColor="white" stopOpacity={0} />
                  </linearGradient>
                  <mask id="skill-pipe-mask-left">
                    <rect
                      className="skill-pipe-mask-left"
                      x="100%"
                      y="0"
                      width={'100%'}
                      height={'100%'}
                      fill="url(#skill-pipe-gradient-left)"
                    />
                  </mask>
                </defs>
                <path
                  d="M399.5 176.5C177.5 187.5 243 288 1 338"
                  stroke="#fafafa"
                  strokeWidth="2"
                  mask="url(#skill-pipe-mask-left)"
                />
                <path
                  d="M400 163.5C178 152.5 243.5 52 1.5 2.00003"
                  stroke="#fafafa"
                  strokeWidth="2"
                  mask="url(#skill-pipe-mask-left)"
                />
                <path
                  d="M399 169.5L1.00002 170.5"
                  stroke="#fafafa"
                  strokeWidth="2"
                  mask="url(#skill-pipe-mask-left)"
                />
              </svg>
            </div>
          </div>
          <div className="relative w-[25vw] h-[341px]">
            <div className="absolute top-0 left-0 w-full h-full">
              <svg
                width="100%"
                viewBox="0 0 401 341"
                fill="none"
                height="100%"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M1.5 164C223.5 153 158 52.5 400 2.5" stroke="#262626" strokeWidth="2" />
                <path d="M1 177C223 188 157.5 288.5 399.5 338.5" stroke="#262626" strokeWidth="2" />
                <path d="M2 171L400 170" stroke="#262626" strokeWidth="2" />
              </svg>
            </div>
            <div className="absolute top-0 left-0 w-full h-full">
              <svg
                width="100%"
                height="100%"
                viewBox="0 0 401 341"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  <linearGradient id="skill-pipe-gradient">
                    <stop offset={0} stopColor="white" stopOpacity={0} />
                    <stop offset={0.5} stopColor="white" stopOpacity={1} />
                    <stop offset={0.5} stopColor="white" stopOpacity={0} />
                  </linearGradient>
                  <mask id="skill-pipe-mask">
                    <rect
                      className="skill-pipe-mask"
                      x="-100%"
                      y="0"
                      width={'100%'}
                      height={'100%'}
                      fill="url(#skill-pipe-gradient)"
                    />
                  </mask>
                </defs>
                <path
                  d="M1.5 164C223.5 153 158 52.5 400 2.5"
                  stroke="#fafafa"
                  strokeWidth="2"
                  mask="url(#skill-pipe-mask)"
                />
                <path
                  d="M1 177C223 188 157.5 288.5 399.5 338.5"
                  stroke="#fafafa"
                  strokeWidth="2"
                  mask="url(#skill-pipe-mask)"
                />
                <path
                  d="M2 171L400 170"
                  stroke="#fafafa"
                  strokeWidth="2"
                  mask="url(#skill-pipe-mask)"
                />
              </svg>
            </div>
          </div>
          <div className="skill-right-box">
            <h4 className="text-center font-normal font-instrument italic">
              Web Development Skills
            </h4>
            <div id="right-box-body" className="h-full px-2">
              <RightSkillBox skillList={skillList} />
            </div>
          </div>
          <div className="skill-left-box">
            <h4 className="text-center font-normal font-instrument italic">Data Science Skills</h4>
            <div id="right-box-body" className="h-full px-2">
              <RightSkillBox skillList={skillList} />
            </div>
          </div>
        </div>
      </div>
      <div className="absolute h-[500px] w-[750px] bottom-[-300px] screen-bottom-blur opacity-[0.2] rounded-2xl left-[50%] translate-x-[-50%]"></div>
      <div className="section_border absolute bottom-0 left-0" />
    </div>
  )
}

export default Skills
