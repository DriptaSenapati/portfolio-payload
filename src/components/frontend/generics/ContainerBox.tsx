import React from 'react'

type Props = {
  children: React.ReactNode
  className?: string
}

const ContainerBox = ({ children, className }: Props) => {
  return <div className={`w-full max-w-7xl mx-auto h-full ${className}`}>{children}</div>
}

export default ContainerBox
