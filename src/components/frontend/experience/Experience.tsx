'use client'

import React from 'react'
import ExperienceAccordian from './ExperienceAccordian'

const experienceList: ({
  company: string
  startMonth: string
  designation: string
  workDescription: string
  location: string
} & (
  | {
      isCurrent: false
      endMonth: string
    }
  | {
      isCurrent: true
      endMonth?: string
    }
))[] = [
  {
    company: 'HSBC',
    designation: 'Senior Analyst',
    isCurrent: true,
    startMonth: 'Sept-2022',
    workDescription: 'Development of Detection model of fraud from transaction monitoring',
    location: 'Kolkata - West Bengal',
  },
  {
    company: 'WNS Global Services',
    designation: 'Sr. Associate',
    isCurrent: false,
    startMonth: 'Feb-2021',
    endMonth: 'Sep-2022',
    workDescription:
      'Develop proof of concepts and scalable solutions in Text Mining, NLP, Video and image analytics to solve business problems',
    location: 'Delhi-Gurgaon',
  },
  {
    company: 'Objectsol Technologies',
    designation: 'Data Scientist',
    isCurrent: false,
    startMonth: 'Feb-2020',
    endMonth: 'Feb-2021',
    workDescription:
      'It is a software based company, successfuly building apps for Android, iOS,IpTV. I have to develop backend algorithm which are based on some mathematical models and some Machine Learning algorithm',
    location: 'Kolkata - West Bengal',
  },
]

const Experience = () => {
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
