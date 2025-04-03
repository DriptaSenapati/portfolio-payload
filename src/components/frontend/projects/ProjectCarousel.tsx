'use client'

import React from 'react'
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel'
import Image from 'next/image'
import AutoScroll from 'embla-carousel-auto-scroll'
import Link from 'next/link'
import { arrayClone } from '@/lib/utils'
import ContainerBox from '../generics/ContainerBox'

type Props = {
  projectList: any[]
}

const ProjectCarousel = ({ projectList }: Props) => {
  return (
    <div className="relative w-[90%] m-auto">
      <div className="md:hidden flex flex-col justify-center items-center gap-[20px]">
        {projectList.map((project, idx) => (
          <Link
            key={idx}
            href={project.projectLink || project.certficate || '/'}
            target="_blank"
            className="w-full"
          >
            <div className="rounded-2xl overflow-hidden min-h-[500px] flex justify-center items-start flex-col w-full">
              <div className="border-[5px] border-light-black rounded-2xl overflow-hidden relative grow-1 w-full">
                <Image
                  src={project.imageList.primary}
                  alt={project.name}
                  fill
                  style={{
                    objectFit: 'cover',
                    maxWidth: '100%',
                    // height: 'auto',
                  }}
                />
              </div>
              <div className="p-[2px] h-[100px]">
                <div className="p-3 truncate">{project.name}</div>
                <div className="space-x-3.5 mt-1">
                  {project.technology.map((tech: string, idx: number) => (
                    <span
                      key={idx}
                      className="px-[12px] py-[8px] bg-muted capitalize rounded-2xl text-sm"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
      <div className="md:block">
        <ContainerBox className="relative">
          <Carousel
            className="max-md:hidden"
            opts={{
              loop: true,
            }}
            plugins={[
              AutoScroll({
                playOnInit: true,
                stopOnMouseEnter: true,
                stopOnInteraction: false,
              }),
            ]}
          >
            <CarouselContent>
              {(projectList.length === 3 ? arrayClone(projectList, 2) : projectList).map(
                (project, idx) => (
                  <CarouselItem
                    key={idx}
                    className={`${projectList.length === 1 ? 'basis-1/1' : projectList.length === 2 ? 'basis-1/2' : 'basis-1/2 max-lg:basis-1/1'}`}
                  >
                    <Link href={project.projectLink || project.certficate || '/'} target="_blank">
                      <div
                        className={`rounded-2xl overflow-hidden h-[500px] flex justify-center items-start flex-col ${projectList.length === 1 ? 'w-[600px] m-auto' : 'w-full'}`}
                      >
                        <div className="border-[5px] border-light-black rounded-2xl overflow-hidden relative grow-1 w-full">
                          <Image
                            src={project.imageList.primary}
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
                            {project.technology.map((tech: string, idx: number) => (
                              <span
                                key={idx}
                                className="px-[12px] py-[8px] bg-muted capitalize rounded-2xl text-sm"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </Link>
                  </CarouselItem>
                ),
              )}
            </CarouselContent>
          </Carousel>
          <div className="box-gradient absolute top-0 left-0 w-full h-full pointer-events-none"></div>
        </ContainerBox>
      </div>
    </div>
  )
}

export default ProjectCarousel
