'use server'

import { getPayloadObject } from '@/getPayloadObject'

const getReviewList = async () => {
  const payload = await getPayloadObject()

  const reviewList = await payload.find({
    collection: 'reviews',
  })

  return reviewList?.docs || []
}

export { getReviewList }
