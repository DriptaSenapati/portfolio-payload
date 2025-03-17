import { Instrument_Serif, Inter } from 'next/font/google'

const inter = Inter({
  subsets: ['latin'],
  style: ['italic', 'normal'],
  display: 'swap',
  variable: '--font-inter',
})

const instrumentSerif = Instrument_Serif({
  weight: '400',
  style: ['italic', 'normal'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-instrument-serif',
})

export { inter, instrumentSerif }
