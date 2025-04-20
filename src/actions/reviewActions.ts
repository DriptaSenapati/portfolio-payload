'use server'

import { getPayloadObject } from '@/getPayloadObject'

const getReviewList = async () => {
  const payload = await getPayloadObject()

  const reviewList = await payload.find({
    collection: 'reviews',
    where: {
      isAllowed: {
        equals: true,
      },
    },
  })

  return reviewList?.docs || []
}

export { getReviewList }
