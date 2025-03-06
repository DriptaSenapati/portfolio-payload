import React from 'react'

type Props = {
  children: React.ReactNode
}

const ContainerBox = ({ children }: Props) => {
  return <div className="w-full max-w-7xl mx-auto h-full">{children}</div>
}

export default ContainerBox
