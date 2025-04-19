import React from 'react'
import NavBar from '@/components/frontend/NavBar'

// export async function generateMetadata(): Promise<Metadata> {
//   const getGlobalData = await getGlobals()
//   return {
//     metadataBase: new URL(process.env.PROD_URL!),
//     title: 'Dripta Senapati',
//     description: getGlobalData.about.about_myself,
//     openGraph: {
//       title: 'Dripta Senapati',
//       description: getGlobalData.about.about_myself,
//       type: 'website',
//       locale: 'en_US',
//       url: process.env.PROD_URL,
//       siteName: "Dripta Senapati's Portfolio",
//     },
//   }
// }

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <div>
      <NavBar />
      {children}
    </div>
  )
}
