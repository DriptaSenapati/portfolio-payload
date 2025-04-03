'use client'

import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel'
import { ItemStyles, Rating, Star } from '@smastrom/react-rating'
import AutoScroll from 'embla-carousel-auto-scroll'
import React from 'react'

const customStarStyles: ItemStyles = {
  itemShapes: Star,
  activeFillColor: '#ffffff',
  inactiveFillColor: '#a3a3a3',
}

const reviews: {
  name: string
  rating: number
  feedback: string
  workedAs: string
}[] = [
  {
    name: 'Inder Kaur',
    rating: 4,
    feedback:
      'Dripta has a constant thirst for new knowledge. He is a self-taught person. He is very proficient in programming. The best part about working with him is his constant urge to do everything with perfection. He diligently executes the responsibilities that are assigned to him, which makes him an asset for any company he would work for. Best wishes Dripta!',
    workedAs: 'Member in a project',
  },
  {
    name: 'Debabrata Acharya',
    rating: 4,
    feedback:
      'Dripta is a gifted programmer and has a great ability for deductive reasoning. I have worked with him on a couple of projects, both directly and indirectly. He has great insights and a clear thought process. I am yet to see him back out from a hurdle, which he never does. He is a prompt team player and has a especial thirst for everything Python!',
    workedAs: 'Member in a project',
  },
  {
    name: 'Titas Senapati',
    rating: 4,
    feedback:
      'Dripta is a gifted programmer and has a great ability for deductive reasoning. I have worked with him on a couple of projects, both directly and indirectly.',
    workedAs: 'Member in a project',
  },
]

const Reviews = () => {
  return (
    <div className="relative flex justify-center items-center overflow-hidden py-[100px]">
      <div id="review-content" className="w-full">
        <div id="title-content" className="space-y-5">
          <div className="flex gap-3 items-center justify-center">
            <div className="w-[69px] h-[1px] header-gradient-left"></div>
            <p className="text-p1 italic">Testimonials</p>
            <div className="w-[69px] h-[1px] header-gradient-right"></div>
          </div>
          <div className="flex justify-center items-center gap-2.5">
            <h2 className="font-medium max-md:text-[36px]">Check Out</h2>
            <h2 className="font-normal italic text-background-2 font-instrument max-md:text-[36px]">
              My Reviews
            </h2>
          </div>
        </div>
        <div
          className="w-full max-w-7xl m-auto mt-[100px] relative max-md:mt-[60px] px-[20px]"
          id="review-carousel"
        >
          <Carousel
            className="max-md:hidden w-full"
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
            <CarouselContent className="-ml-4">
              {(reviews.length === 3 ? [...reviews, ...reviews] : reviews).map((review, idx) => (
                <CarouselItem
                  key={idx}
                  className={`${reviews.length === 1 ? 'basis-1/1' : reviews.length === 2 ? 'basis-1/2' : 'basis-1/3 max-lg:basis-1/2'} pl-4`}
                >
                  <div
                    className={`h-[250px] rounded-2xl px-5 py-4 relative bg-light-black ${[1, 2].includes(reviews.length) && 'w-[450px]'} m-auto flex justify-center flex-col`}
                  >
                    <div className="flex justify-between items-center">
                      <p>{review.name}</p>
                      <Rating
                        value={review.rating}
                        itemStyles={customStarStyles}
                        readOnly
                        style={{ maxWidth: 100 }}
                      />
                    </div>
                    <div className="grow-1 py-4 ">
                      <p className="line-clamp-5 break-all text-background-2">{review.feedback}</p>
                    </div>
                    <div>Worked as: {review.workedAs}</div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
          <div className="flex flex-col justify-center items-center w-full px-4 gap-y-5 md:hidden">
            {reviews.map((review, idx) => (
              <div
                className={`h-[250px] rounded-2xl px-5 py-4 relative bg-light-black w-full sm:w-[450px] flex justify-center flex-col`}
                key={idx}
              >
                <div className="flex justify-between items-center">
                  <p>{review.name}</p>
                  <Rating
                    value={review.rating}
                    itemStyles={customStarStyles}
                    readOnly
                    style={{ maxWidth: 100 }}
                  />
                </div>
                <div className="grow-1 py-4 ">
                  <p className="line-clamp-5 break-all text-background-2">{review.feedback}</p>
                </div>
                <div>Worked as: {review.workedAs}</div>
              </div>
            ))}
          </div>
          <div className="box-gradient absolute top-0 left-0 w-full h-full pointer-events-none max-md:hidden"></div>
        </div>
      </div>
      <div className="absolute h-[500px] w-[750px] bottom-[-300px] screen-bottom-blur opacity-[0.2] rounded-2xl left-[50%] translate-x-[-50%] max-md:w-[100%] max-md:rotate-0 max-md:h-[450px] pointer-events-none"></div>
      <div className="section_border absolute bottom-0 left-0" />
    </div>
  )
}

export default Reviews
