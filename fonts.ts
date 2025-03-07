import { Instrument_Serif, Inter } from 'next/font/google'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

const instrumentSerif = Instrument_Serif({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-instrument-serif',
})

export { inter, instrumentSerif }
