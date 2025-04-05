'use client'

import React from 'react'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import ContainerBox from '../generics/ContainerBox'
import { Job } from '@/payload-types'
import moment from 'moment'

type Props = {
  experienceList: Job[] | undefined
}

const ExperienceAccordian = ({ experienceList }: Props) => {
  return (
    <ContainerBox>
      <div className="w-[80%] m-auto max-md:w-full">
        <Accordion
          type="multiple"
          defaultValue={['0', '1', '2']}
          className="border-light-black border-[2px] rounded-2xl overflow-hidden"
        >
          {experienceList &&
            experienceList.length > 0 &&
            experienceList.map((experience, idx) => (
              <AccordionItem value={`${idx}`} key={idx}>
                <AccordionTrigger
                  className="flex justify-between px-[15px] items-center hover:no-underline rounded-none  data-[state=open]:bg-muted hover:bg-muted max-md:flex-col max-md:items-start max-md:pointer-events-none"
                  chevronClassName="max-md:hidden"
                >
                  <p className="flex-1 text-p1 text-white">{experience.company}</p>
                  <div className="flex-1 text-p1 text-white">{experience.location}</div>
                  <p className="flex-1 text-p1 text-white text-end">{`${moment(experience.startMonth).format('MMM-yyyy')} - ${experience.isCurrent ? 'Present' : `${moment(experience.endMonth).format('MMM-yyyy')}`}`}</p>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="p-[15px] rounded-2xl text-background-2 w-[90%]">
                    <div className="space-y-1">
                      <div className="font-bold text-xl ">{experience.designation}</div>
                    </div>
                    <p className="mt-5">{experience.workDescription}</p>
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
        </Accordion>
      </div>
    </ContainerBox>
  )
}

export default ExperienceAccordian
