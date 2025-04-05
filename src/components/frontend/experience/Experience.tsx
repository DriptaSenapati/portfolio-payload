'use client'

import React, { useEffect } from 'react'
import ExperienceAccordian from './ExperienceAccordian'
import useSWR from 'swr'
import { job_fetch_key } from '@/lib/swrKeys'
import { getJobs } from '@/actions/jobActions'

const Experience = () => {
  const { data: experienceList, error } = useSWR(job_fetch_key, getJobs)

  useEffect(() => {
    if (error) {
      console.error('Error fetching experience list:', error)
    }
  }, [error])

  return (
    <div className="relative py-[100px] overflow-hidden" id="experience">
      <div className="" id="experience-content">
        <div id="title-content" className="space-y-5">
          <div className="flex gap-3 items-center justify-center">
            <div className="w-[69px] h-[1px] header-gradient-left"></div>
            <p className="text-p1 italic">Work Experience</p>
            <div className="w-[69px] h-[1px] header-gradient-right"></div>
          </div>
        </div>
        <div className="mt-[100px]">
          <ExperienceAccordian experienceList={experienceList} />
        </div>
      </div>
      <div className="absolute h-[500px] w-[750px] bottom-[-300px] screen-bottom-blur opacity-[0.2] rounded-2xl left-[50%] translate-x-[-50%] max-md:w-[100%] max-md:rotate-0 max-md:h-[450px] pointer-events-none"></div>
      <div className="section_border absolute bottom-0 left-0" />
    </div>
  )
}

export default Experience
