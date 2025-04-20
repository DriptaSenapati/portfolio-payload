import { getReviewLinkMetaName, startReviewLinkVisitProcess } from '@/actions/giveReviewActions'
import GiveReviewBody from '@/components/frontend/give-review/GiveReviewBody'
import React from 'react'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { AlertCircle } from 'lucide-react'
import { Metadata } from 'next'

type Props = {
  params: Promise<{ id: string }>
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>
}): Promise<Metadata> {
  const id = (await params).id
  const getReviewLinkName = await getReviewLinkMetaName(id)
  const name = getReviewLinkName.success
    ? `Hi ${getReviewLinkName.data}, Please give feedback to Dripta`
    : 'Invalid link'

  return {
    metadataBase: new URL(process.env.PROD_URL!),
    title: 'Give Feedback to Dripta Senapati',
    description: name,
    openGraph: {
      title: 'Dripta Senapati',
      description: name,
      type: 'website',
      locale: 'en_US',
      url: process.env.PROD_URL,
      siteName: "Dripta Senapati's Portfolio",
    },
  }
}

const page = async ({ params }: Props) => {
  const { id } = await params
  const verificationResponse = await startReviewLinkVisitProcess(id)

  if (!verificationResponse.success) {
    return (
      <div className="h-screen w-full flex justify-center items-center">
        <Alert variant="destructive" className="w-[50vw] max-md:w-[90vw] max-w-[800px]">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Invalid Link</AlertTitle>
          <AlertDescription>Link is either expired or review already submitted</AlertDescription>
        </Alert>
      </div>
    )
  }
  return <GiveReviewBody reviewLinkId={id} targetUserData={verificationResponse.data!} />
}

export default page
