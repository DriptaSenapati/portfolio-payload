'use client'

import React, { useState } from 'react'
import ProjectFilters from './ProjectFilters'
import ProjectCarousel from './ProjectCarousel'
import Button from '../generics/Button'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { project_fetch_key } from '@/lib/swrKeys'
import { getProjectList } from '@/actions/projectActions'
import useSWR from 'swr'
import { useTransitionRouter } from 'next-view-transitions'

const Projects = () => {
  const [selectedLabel, setSelectedLabel] = useState<string>('all')
  const router = useTransitionRouter()

  const { data: projectDetails } = useSWR(project_fetch_key, getProjectList)

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

  const handleTransitionProjects = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    router.push('/projects', {
      onTransitionReady: slideInOut,
    })
  }

  const slideInOut = () => {
    document.documentElement.animate(
      [
        {
          opacity: 1,
          transform: 'translate(0, 0)',
        },
        {
          opacity: 0,
          transform: 'translate(100%, 0)',
        },
      ],
      {
        duration: 900,
        easing: 'ease',
        fill: 'forwards',
        pseudoElement: '::view-transition-old(root)',
      },
    )

    document.documentElement.animate(
      [
        {
          clipPath: 'polygon(0 0, 0 0, 0 100%, 0 100%)',
        },
        {
          clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
        },
      ],
      {
        duration: 900,
        easing: 'ease',
        fill: 'forwards',
        pseudoElement: '::view-transition-new(root)',
      },
    )
  }

  return (
    <div className="relative overflow-hidden py-[100px]" id="projects">
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
        {projectDetails && projectDetails.length > 0 && (
          <>
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
              <a href={`/projects`} onClick={handleTransitionProjects}>
                <Button className="text-background-2 hover:text-white group">
                  <div className="flex gap-1.5 items-center justify-center">
                    <span className="text-p1 group-hover:text-white transition-all duration-[0.25s]">
                      See All Projects
                    </span>
                    <ArrowRight />
                  </div>
                </Button>
              </a>
            </div>
          </>
        )}
      </div>
      <div className="absolute h-[500px] w-[750px] bottom-[-300px] screen-bottom-blur opacity-[0.2] rounded-2xl left-[50%] translate-x-[-50%] max-md:w-[100%] max-md:rotate-0 max-md:h-[450px] pointer-events-none"></div>
      <div className="section_border absolute bottom-0 left-0" />
    </div>
  )
}

export default Projects
