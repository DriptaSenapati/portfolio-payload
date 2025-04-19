'use client'

import React from 'react'
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel'
import { ItemStyles, Rating, Star } from '@smastrom/react-rating'
import '@smastrom/react-rating/style.css'
import AutoScroll from 'embla-carousel-auto-scroll'
import { Skill } from '@/payload-types'

type Props = {
  skillList: Skill[]
}

const customStarStyles: ItemStyles = {
  itemShapes: Star,
  activeFillColor: '#ffffff',
  inactiveFillColor: '#a3a3a3',
}

const RightSkillBox = ({ skillList }: Props) => {
  return (
    <div className="w-full h-full relative">
      <Carousel
        className="w-full h-full"
        orientation="vertical"
        opts={{
          loop: true,
          dragFree: false,
        }}
        plugins={[
          AutoScroll({
            playOnInit: true,
            stopOnMouseEnter: true,
            startDelay: 0,
            speed: 0.5,
            stopOnInteraction: false,
          }),
        ]}
      >
        <CarouselContent className="h-[40vh] -mt-1">
          {skillList.map((v, index) => (
            <CarouselItem
              key={index}
              className={`pt-1.5 ${skillList.length > 7 ? 'basis-1/6' : 'basis-1/4'}`}
            >
              <div className="w-full px-[18px] py-[12px] flex justify-between items-center bg-background rounded-[12px]">
                <p>{v.skill}</p>
                <div className="flex justify-center items-center gap-1">
                  <Rating
                    value={v.skill_rating}
                    itemStyles={customStarStyles}
                    readOnly
                    style={{ maxWidth: 100 }}
                  />
                  <p className="text-sm">{v.skill_rating}</p>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
      <div className="skill-gradient"></div>
    </div>
  )
}

export default RightSkillBox
