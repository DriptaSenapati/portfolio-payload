import React from 'react'

type Props = {
  sentence: string
  textDivRef: React.RefObject<HTMLDivElement | null>
  textSpanRef: React.RefObject<(HTMLDivElement | null)[]>
}

const TextAnimatorBox = ({ sentence, textDivRef, textSpanRef }: Props) => {
  return (
    <div ref={textDivRef}>
      {sentence.split('<br/>').map((line, index) => (
        <div
          key={index}
          className="text-p1 flex justify-start items-center gap-1 flex-wrap md:gap-1.5"
          ref={(el) => {
            textSpanRef.current[index] = el
          }}
        >
          {line.split(' ').map((word, index) => (
            <span key={index} className="inline-block">
              {word}
            </span>
          ))}
        </div>
      ))}
    </div>
  )
}

export default TextAnimatorBox
