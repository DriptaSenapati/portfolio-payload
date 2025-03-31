'use client'

import React, { useState } from 'react'
import ProjectFilters from './ProjectFilters'
import projectImage from '@/assets/images/project_1.jpg'
import projectImageHover from '@/assets/images/project_1_hover.jpg'
import ProjectCarousel from './ProjectCarousel'
import Button from '../generics/Button'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'

//TODO: Implement project see all route with filters

const projectDetails = [
  {
    name: 'ChatBot',
    technology: ['python', 'tensorflow'],
    projectLink: 'https://github.com/DriptaSenapati/ChatBot',
    type: 'project',
    imageList: {
      primary: projectImage.src,
      secondary: projectImageHover.src,
    },
    description:
      'Built a simple Chatbot using Transformer model and LSTM RNN. For now It can chat like humans with meaningful sentences and it can also tell weather of any place. It is a very basic one.',
  },
  {
    name: 'Covdata Server',
    technology: ['python', 'react', 'D3'],
    imageList: {
      primary: projectImage.src,
      secondary: projectImageHover.src,
    },
    projectLink: 'https://github.com/DriptaSenapati/covidindiaServer',
    type: 'project',
    description:
      'Have built a website for COVID-19 in India that gives flexibility to users to see the data for varying filters and also some graphical analyses are also done in website.',
  },
  {
    name: 'SQL & Database Design A-Z™: Learn MS SQL Server + PostgreSQL',
    technology: ['SQL', 'SQL Server', 'PostgreSQL'],
    type: 'certificate',
    imageList: {
      primary: projectImage.src,
      secondary: projectImageHover.src,
    },
    certficate: 'https://ude.my/UC-395d6821-7495-4233-a07d-5fbbb959926a',
    description:
      'Have built a website for COVID-19 in India that gives flexibility to users to see the data for varying filters and also some graphical analyses are also done in website.',
  },
  {
    name: 'SQL & Database Design A-Z™: Learn MS SQL Server + PostgreSQL',
    technology: ['SQL', 'SQL Server', 'PostgreSQL'],
    type: 'certificate',
    imageList: {
      primary: projectImage.src,
      secondary: projectImageHover.src,
    },
    certficate: 'https://ude.my/UC-395d6821-7495-4233-a07d-5fbbb959926a',
    description:
      'Have built a website for COVID-19 in India that gives flexibility to users to see the data for varying filters and also some graphical analyses are also done in website.',
  },
  {
    name: 'SQL & Database Design A-Z™: Learn MS SQL Server + PostgreSQL',
    technology: ['SQL', 'SQL Server', 'PostgreSQL'],
    type: 'certificate',
    imageList: {
      primary: projectImage.src,
      secondary: projectImageHover.src,
    },
    certficate: 'https://ude.my/UC-395d6821-7495-4233-a07d-5fbbb959926a',
    description:
      'Have built a website for COVID-19 in India that gives flexibility to users to see the data for varying filters and also some graphical analyses are also done in website.',
  },
]

const Projects = () => {
  const [selectedLabel, setSelectedLabel] = useState<string>('all')

  const projectConfig = [
    {
      label: 'All',
      onLabelClick: () => {
        setSelectedLabel('all')
      },
      value: 'all',
    },
    {
      label: 'Projects',
      onLabelClick: () => {
        setSelectedLabel('project')
      },
      value: 'project',
    },
    {
      label: 'Certificates',
      onLabelClick: () => {
        setSelectedLabel('certificate')
      },
      value: 'certificate',
    },
  ]
  return (
    <div className="relative overflow-hidden py-[100px]">
      <div id="project-content">
        <div id="title-content" className="space-y-5">
          <div className="flex gap-3 items-center justify-center">
            <div className="w-[69px] h-[1px] header-gradient-left"></div>
            <p className="text-p1 italic">Projects</p>
            <div className="w-[69px] h-[1px] header-gradient-right"></div>
          </div>
          <div className="flex justify-center items-center gap-2.5" id="project-header">
            <h2 className="font-medium max-md:text-[36px]">My Latest</h2>
            <h2 className="font-normal italic text-background-2 font-instrument max-md:text-[36px]">
              Projects
            </h2>
          </div>
        </div>
        <div className="mt-10 ">
          <ProjectFilters filterConfig={projectConfig} selectedLabel={selectedLabel} />
        </div>
        <div className="mt-20 w-full">
          <ProjectCarousel
            projectList={
              selectedLabel === 'all'
                ? projectDetails.slice(0, 5)
                : projectDetails.filter((project) => project.type === selectedLabel).slice(0, 5)
            }
          />
        </div>
        <div className="mt-20 text-center">
          <Link href={`projects`}>
            <Button className="text-background-2 hover:text-white group">
              <div className="flex gap-1.5 items-center justify-center">
                <span className="text-p1 group-hover:text-white transition-all duration-[0.25s]">
                  See All Projects
                </span>
                <ArrowRight />
              </div>
            </Button>
          </Link>
        </div>
      </div>
      <div className="absolute h-[500px] w-[750px] bottom-[-300px] screen-bottom-blur opacity-[0.2] rounded-2xl left-[50%] translate-x-[-50%] max-md:w-[100%] max-md:rotate-0 max-md:h-[450px] pointer-events-none"></div>
      <div className="section_border absolute bottom-0 left-0" />
    </div>
  )
}

export default Projects
