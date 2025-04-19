'use client'

import { getReviewList } from '@/actions/reviewActions'
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel'
import { ItemStyles, Rating, Star } from '@smastrom/react-rating'
import AutoScroll from 'embla-carousel-auto-scroll'
import React from 'react'
import useSWR from 'swr'
import { review_fetch_key } from '@/lib/swrKeys'
import { arrayClone } from '@/lib/utils'
import { Review } from '@/payload-types'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(useGSAP)

const customStarStyles: ItemStyles = {
  itemShapes: Star,
  activeFillColor: '#ffffff',
  inactiveFillColor: '#a3a3a3',
}

const Reviews = () => {
  const { data: reviews } = useSWR(review_fetch_key, getReviewList)

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
              {reviews &&
                reviews.length > 0 &&
                (reviews.length === 4 ? (arrayClone(reviews, 1) as Review[]) : reviews).map(
                  (review, idx) => (
                    <CarouselItem
                      key={idx}
                      className={`${reviews.length === 1 ? 'basis-1/1' : reviews.length === 2 ? 'basis-1/2' : 'basis-1/3 max-lg:basis-1/2'} pl-4`}
                    >
                      <div
                        className={`h-[250px] rounded-2xl px-5 py-4 relative bg-light-black ${[1, 2].includes(reviews.length) && 'w-[450px]'} m-auto flex justify-center flex-col`}
                        id={`review-${idx}`}
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
                          <p
                            className="line-clamp-7 break-all text-background-2 text-sm"
                            id={`review-text-${idx}`}
                          >
                            {review.feedback}
                          </p>
                        </div>
                        <div>Worked as: {review.workedAs}</div>
                      </div>
                    </CarouselItem>
                  ),
                )}
            </CarouselContent>
          </Carousel>
          <div className="flex flex-col justify-center items-center w-full px-4 gap-y-5 md:hidden">
            {reviews &&
              reviews.length > 0 &&
              reviews.map((review, idx) => (
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
