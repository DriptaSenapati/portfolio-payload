'use client'
import { ReactLenis } from 'lenis/react'

type LenisScrollProviderProps = {
  children: React.ReactNode
}
const LenisScrollProvider = ({ children }: LenisScrollProviderProps) => {
  return (
    <ReactLenis options={{ lerp: 0.1, duration: 1.5, smoothWheel: true }} root>
      {children}
    </ReactLenis>
  )
}

export default LenisScrollProvider
