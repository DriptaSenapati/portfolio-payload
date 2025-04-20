import { Metadata } from 'next'
import { redirect } from 'next/navigation'

export const metadata: Metadata = {
  title: 'Feedback Form | Dripta Senapati',
  description: 'Provide feedback for Dripta Senapati',
}

const GiveReview = () => {
  return redirect('/')
}

export default GiveReview
