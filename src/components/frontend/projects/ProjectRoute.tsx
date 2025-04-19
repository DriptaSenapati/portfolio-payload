'use client'

import React, { useState } from 'react'
import ContainerBox from '../generics/ContainerBox'
import ProjectFilters from './ProjectFilters'
import { project_fetch_key } from '@/lib/swrKeys'
import { getProjectList } from '@/actions/projectActions'
import useSWR from 'swr'
import Image from 'next/image'
import { Media } from '@/payload-types'
import Link from 'next/link'

const ProjectRoute = () => {
  const [selectedLabel, setSelectedLabel] = useState<string>('all')
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

  return (
    <div className="py-[100px] relative overflow-hidden">
      <ContainerBox className="space-y-2">
        <ProjectFilters filterConfig={projectConfig} selectedLabel={selectedLabel} />
        <div className="h-15"></div>
        <div id="project_list" className="grid grid-cols-2 gap-x-5 gap-y-7 max-md:grid-cols-1">
          {projectDetails &&
            projectDetails.length > 0 &&
            (selectedLabel === 'all'
              ? projectDetails
              : projectDetails.filter((project) => project.type === selectedLabel)
            ).map((project, idx) => (
              <Link
                href={project.projectLink || project.certficate || '/'}
                target="_blank"
                key={idx}
              >
                <div
                  className={`rounded-2xl overflow-hidden h-[500px] flex justify-center items-start flex-col`}
                >
                  <div className="border-[5px] border-light-black rounded-2xl overflow-hidden relative grow-1 w-full">
                    <Image
                      src={(project.imageList.primary as Media).sizes?.Card?.url as string}
                      alt={project.name}
                      fill
                      style={{
                        objectFit: 'cover',
                        maxWidth: '100%',
                      }}
                    />
                  </div>
                  <div className="p-[8px] h-[100px]">
                    <div className="p-3 truncate">{project.name}</div>
                    <div className="space-x-3.5 mt-1">
                      {project.technology &&
                        project.technology.length > 0 &&
                        project.technology.map((tech, idx) => (
                          <span
                            key={idx}
                            className="px-[12px] py-[8px] bg-muted capitalize rounded-2xl text-sm"
                          >
                            {tech.technology}
                          </span>
                        ))}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
        </div>
      </ContainerBox>
      <div className="absolute h-[500px] w-[750px] bottom-[-300px] screen-bottom-blur opacity-[0.2] rounded-2xl left-[50%] translate-x-[-50%] max-md:w-[100%] max-md:rotate-0 max-md:h-[450px]"></div>
      <div className="section_border absolute bottom-0 left-0" />
    </div>
  )
}

export default ProjectRoute
