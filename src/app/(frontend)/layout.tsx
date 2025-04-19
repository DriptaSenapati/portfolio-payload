import React from 'react'
import './styles.css'
import { instrumentSerif, inter } from 'fonts'
import NavBar from '@/components/frontend/NavBar'
import { TooltipProvider } from '@/components/ui/tooltip'
import LenisScrollProvider from '@/components/LenisScrollProvider'
import { ViewTransitions } from 'next-view-transitions'
import { Metadata } from 'next'
import { getGlobals } from '@/actions/globalActions'

export async function generateMetadata(): Promise<Metadata> {
  const getGlobalData = await getGlobals()
  return {
    metadataBase: new URL(process.env.PROD_URL!),
    title: 'Dripta Senapati',
    description: getGlobalData.about.about_myself,
    openGraph: {
      title: 'Dripta Senapati',
      description: getGlobalData.about.about_myself,
      type: 'website',
      locale: 'en_US',
      url: process.env.PROD_URL,
      siteName: "Dripta Senapati's Portfolio",
    },
  }
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <ViewTransitions>
      <html
        lang="en"
        className={`dark ${inter.variable} ${instrumentSerif.variable} scroll-smooth`}
      >
        <body>
          <LenisScrollProvider>
            <TooltipProvider delayDuration={700} disableHoverableContent>
              <main>
                <NavBar />
                {children}
                {/* <div className="h-[20000px]"></div> */}
              </main>
            </TooltipProvider>
          </LenisScrollProvider>
        </body>
      </html>
    </ViewTransitions>
  )
}
