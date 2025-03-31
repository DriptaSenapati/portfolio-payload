'use client'

import React from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { useWindowSize } from 'react-use'

gsap.registerPlugin(useGSAP)

type Props = {
  filterConfig: {
    label: string
    onLabelClick: () => void
    value: string
  }[]
  selectedLabel: string
}

const ProjectFilters = ({ filterConfig, selectedLabel }: Props) => {
  const { width } = useWindowSize()

  const { contextSafe } = useGSAP(() => {
    const itemWidth = gsap.getProperty('#filter-item-0', 'width')

    gsap.set(['#hover-bg', '#selected-bg'], {
      width: itemWidth,
    })

    const selectedLableIdx = filterConfig.findIndex((item) => item.value === selectedLabel)
    gsap.to('#selected-bg', {
      x: (Number(itemWidth) + 6) * selectedLableIdx,
    })

    gsap.to('#hover-bg', {
      x: (Number(itemWidth) + 6) * selectedLableIdx,
    })
  }, [width])

  const onHoverFilter = contextSafe((labelIdx: number) => {
    const itemWidth = gsap.getProperty('#filter-item-0', 'width')
    // const selectedLableIdx = filterConfig.findIndex((item) => item.label === selectedLabel)
    gsap.to('#hover-bg', {
      x: (Number(itemWidth) + 6) * labelIdx,
      ease: 'bounce.out',
      duration: 1.1,
    })
  })

  const onHoverLeftFilter = contextSafe(() => {
    const itemWidth = gsap.getProperty('#filter-item-0', 'width')
    const selectedLableIdx = filterConfig.findIndex((item) => item.value === selectedLabel)
    gsap.to('#hover-bg', {
      x: (Number(itemWidth) + 6) * selectedLableIdx,
      ease: 'bounce.out',
      duration: 1.1,
    })
  })

  const handleLabelClick = contextSafe((labelIdx: number) => {
    const itemWidth = gsap.getProperty('#filter-item-0', 'width')
    gsap.to('#selected-bg', {
      x: (Number(itemWidth) + 6) * labelIdx,
      duration: 0.5,
      //   ease: 'power2.inOut',
    })
  })

  return (
    <div className="w-[500px] m-auto flex justify-center items-center gap-1.5 relative border-[2px] border-light-black  rounded-4xl max-md:w-[80%]">
      {filterConfig.map((filter, idx) => (
        <div
          key={idx}
          onMouseEnter={() => onHoverFilter(idx)}
          onMouseLeave={onHoverLeftFilter}
          //   className={`relative flex-1 w-[150px] text-center p-[8px] rounded-4xl cursor-pointer`}
          className={`relative flex-1 grow-1 text-center p-[8px] rounded-4xl cursor-pointer`}
          onClick={() => {
            handleLabelClick(idx)
            filter.onLabelClick()
          }}
          id={`filter-item-${idx}`}
        >
          <div
            className={`z-[1] ${selectedLabel === filter.value && 'text-black'} transition-all duration-1000`}
          >
            {filter.label}
          </div>
        </div>
      ))}
      <div
        className="absolute h-full left-0 top-0 bg-muted z-[-1] rounded-4xl "
        id="hover-bg"
      ></div>
      <div
        className="absolute h-full left-0 top-0 bg-foreground rounded-4xl z-[-1]"
        id="selected-bg"
      ></div>
    </div>
  )
}

export default ProjectFilters
