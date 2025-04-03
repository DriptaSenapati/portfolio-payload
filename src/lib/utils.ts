import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

const arrayClone = (inputArray: any[], cloneReplica: number) => {
  let newArr = [...inputArray]

  for (let i = 1; i <= cloneReplica; i++) {
    newArr = [...newArr, ...newArr]
  }

  return newArr
}

export { arrayClone, cn }
