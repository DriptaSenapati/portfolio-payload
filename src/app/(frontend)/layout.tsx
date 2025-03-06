import React from 'react'
import './styles.css'
import { inter } from 'fonts'
import NavBar from '@/components/frontend/NavBar'

export const metadata = {
  description: 'A blank template using Payload in a Next.js app.',
  title: 'Dripta Senapati',
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="en" className={`dark ${inter.variable}`}>
      <body>
        <main>
          <NavBar />
          {children}
        </main>
      </body>
    </html>
  )
}
