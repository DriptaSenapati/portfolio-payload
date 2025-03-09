import React from 'react'

type Props = {
  children: React.ReactNode
  className?: string
  id?: string
}

const Button = ({ children, className, id }: Props) => {
  return (
    <button
      className={`py-[8px] px-[20px] button button-border rounded-[120px] ${className}`}
      id={id}
    >
      {children}
    </button>
  )
}

export default Button
