'use client'

import React from 'react'
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel'
import { ItemStyles, Rating, Star } from '@smastrom/react-rating'
import '@smastrom/react-rating/style.css'
import Autoplay from 'embla-carousel-autoplay'
import AutoScroll from 'embla-carousel-auto-scroll'

type Props = {
  skillList: {
    name: string
    rating: number
  }[]
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
          Autoplay(),
          AutoScroll({
            playOnInit: true,
            stopOnMouseEnter: true,
            startDelay: 0,
            speed: 0.5,
            stopOnInteraction: false,
          }),
        ]}
      >
        <CarouselContent className="h-[30vh] -mt-1">
          {skillList.map((v, index) => (
            <CarouselItem
              key={index}
              className={`pt-1.5 ${skillList.length > 7 ? 'basis-1/6' : 'basis-1/5'}`}
            >
              <div className="w-full px-[12px] py-[8px] flex justify-between items-center bg-background rounded-[12px]">
                <p>{v.name}</p>
                <div className="flex justify-center items-center gap-1">
                  <Rating
                    value={v.rating}
                    itemStyles={customStarStyles}
                    readOnly
                    style={{ maxWidth: 100 }}
                  />
                  <p className="text-sm">{v.rating}</p>
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
