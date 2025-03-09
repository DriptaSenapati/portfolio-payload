import React from 'react'
import './styles.css'
import { instrumentSerif, inter } from 'fonts'
import NavBar from '@/components/frontend/NavBar'
import { TooltipProvider } from '@/components/ui/tooltip'

export const metadata = {
  description: 'A blank template using Payload in a Next.js app.',
  title: 'Dripta Senapati',
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="en" className={`dark ${inter.variable} ${instrumentSerif.variable} scroll-smooth`}>
      <body>
        <TooltipProvider delayDuration={700} disableHoverableContent>
          <main>
            <NavBar />
            {children}
            {/* <div className="h-[20000px]"></div> */}
          </main>
        </TooltipProvider>
      </body>
    </html>
  )
}
