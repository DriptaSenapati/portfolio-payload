import GiveReviewBody from '@/components/frontend/give-review/GiveReviewBody'
import { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata = {
  title: 'Feedback Form | Dripta Senapati',
  description: 'Provide feedback for Dripta Senapati',
}

const GiveReview = () => {
  return <GiveReviewBody />
}

export default GiveReview
