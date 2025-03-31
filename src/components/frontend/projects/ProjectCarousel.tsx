'use client'

import React from 'react'
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel'
import Image from 'next/image'
import AutoScroll from 'embla-carousel-auto-scroll'
import Autoplay from 'embla-carousel-autoplay'
import Link from 'next/link'

type Props = {
  projectList: any[]
}

const ProjectCarousel = ({ projectList }: Props) => {
  return (
    <div className="relative w-[90%] m-auto">
      <div className="md:hidden">
        {projectList.map((project, idx) => (
          <div className="rounded-2xl overflow-hidden" key={idx}>
            <div className="border-[5px] border-light-black rounded-2xl overflow-hidden">
              <Image
                src={project.imageList.primary}
                alt={project.name}
                width={600}
                height={500}
                style={{
                  objectFit: 'cover',
                  maxWidth: '100%',
                  height: 'auto',
                }}
              />
            </div>
            <div className="p-3">{project.name}</div>
          </div>
        ))}
      </div>
      <div className="md:block">
        {projectList.length <= 3 ? (
          <div className="flex justify-center items-center gap-5 max-md:flex-col gap-y-5">
            {projectList.map((project, idx) => (
              <div className="rounded-2xl overflow-hidden" key={idx}>
                <div className="border-[5px] border-light-black rounded-2xl overflow-hidden">
                  <Image
                    src={project.imageList.primary}
                    alt={project.name}
                    width={600}
                    height={500}
                    style={{
                      objectFit: 'cover',
                      maxWidth: '100%',
                      height: 'auto',
                    }}
                  />
                </div>
                <div className="p-3">{project.name}</div>
              </div>
            ))}
          </div>
        ) : (
          <Carousel
            className="max-md:hidden"
            opts={{
              loop: true,
            }}
            plugins={[
              ...(projectList.length <= 4 ? [Autoplay()] : []),
              ...(projectList.length > 4
                ? [
                    AutoScroll({
                      playOnInit: true,
                      stopOnMouseEnter: true,
                      stopOnInteraction: false,
                    }),
                  ]
                : []),
            ]}
          >
            <CarouselContent>
              {projectList.map((project, idx) => (
                <CarouselItem key={idx} className="basis-1/3">
                  <Link href={project.projectLink || project.certficate || '/'} target="_blank">
                    <div className="rounded-2xl overflow-hidden">
                      <div className="border-[5px] border-light-black rounded-2xl overflow-hidden">
                        <Image
                          src={project.imageList.primary}
                          alt={project.name}
                          width={700}
                          height={500}
                          style={{
                            objectFit: 'cover',
                            maxWidth: '100%',
                            height: 'auto',
                          }}
                        />
                      </div>
                      <div className="p-[8px]">
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
              ))}
            </CarouselContent>
          </Carousel>
        )}
      </div>

      <div className="project-carousel-gradient absolute top-0 left-0 w-full h-full pointer-events-none"></div>
    </div>
  )
}

export default ProjectCarousel
