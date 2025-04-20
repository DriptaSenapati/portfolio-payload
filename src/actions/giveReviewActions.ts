'use server'

import { getPayloadObject } from '@/getPayloadObject'
import moment from 'moment'
import { z } from 'zod'

const formSchema = z.object({
  name: z.string().min(2),
  rating: z.number().min(1),
  feedback: z.string().max(200),
  workedAs: z.string(),
})

const submitReview = async (formValues: z.infer<typeof formSchema>, reviewLinkId: string) => {
  try {
    const payload = await getPayloadObject()
    await payload.create({
      collection: 'reviews',
      data: {
        ...formValues,
      },
    })

    await payload.update({
      collection: 'reviewLinks',
      where: {
        id: {
          equals: reviewLinkId,
        },
      },
      data: {
        isReviewSubmitted: true,
      },
    })

    return {
      data: null,
      success: true,
      statusCode: 200,
      message: 'Review Successfully Added',
    }
  } catch (error) {
    return {
      data: null,
      success: false,
      statusCode: 200,
      message: (error as Error).message,
    }
  }
}

const getReviewLinkMetaName = async (id: string) => {
  try {
    const payload = await getPayloadObject()
    const reviewLinkData = await payload.findByID({
      id: id,
      collection: 'reviewLinks',
      select: {
        targetName: true,
      },
    })
    if (!reviewLinkData) {
      return {
        message: 'Name not found',
        statusCode: 404,
        success: false,
        data: null,
      }
    }

    return {
      message: 'Successfully fetched',
      statusCode: 200,
      success: true,
      data: reviewLinkData.targetName,
    }
  } catch (error) {
    return {
      message: (error as Error).message,
      statusCode: 500,
      success: false,
      data: null,
    }
  }
}

const verifyReviewId = async (id: string) => {
  try {
    const payload = await getPayloadObject()
    const reviewLink = await payload.find({
      collection: 'reviewLinks',
      where: {
        and: [
          {
            id: {
              equals: id,
            },
          },
          {
            or: [
              {
                expirationTime: {
                  equals: null,
                },
              },
              {
                expirationTime: {
                  greater_than_equal: moment().toDate(),
                },
              },
            ],
          },
          {
            isReviewSubmitted: {
              equals: false,
            },
          },
        ],
      },
    })

    if (reviewLink.docs.length === 0) {
      return {
        message: 'Review link not found',
        success: false,
        statusCode: 404,
        data: null,
      }
    }
    return {
      message: 'Review link has found',
      success: true,
      statusCode: 200,
      data: reviewLink.docs[0],
    }
  } catch (error) {
    return {
      message: (error as Error).message,
      success: false,
      statusCode: 500,
      data: null,
    }
  }
}

const startReviewLinkVisitProcess = async (id: string) => {
  try {
    const reviewLinkSearch = await verifyReviewId(id)
    const payload = await getPayloadObject()
    if (!reviewLinkSearch.success) {
      return reviewLinkSearch
    }

    // let updatedReviewLink = null;

    // update reviewlink collection
    const updatedReviewLink = await payload.update({
      collection: 'reviewLinks',
      where: {
        and: [
          {
            id: {
              equals: id,
            },
          },
          {
            isLinkVisited: {
              equals: false,
            },
          },
        ],
      },
      data: {
        isLinkVisited: true,
        expirationTime: moment()
          .add(
            reviewLinkSearch.data?.expirationConfig.expirationInterval,
            reviewLinkSearch.data?.expirationConfig.expirationIntervalUnit,
          )
          .toDate()
          .toISOString(),
      },
    })

    return {
      message: 'Process ended successfully',
      success: true,
      statusCode: 200,
      data: updatedReviewLink.docs.length > 0 ? updatedReviewLink.docs[0] : reviewLinkSearch.data,
    }
  } catch (error) {
    return {
      message: (error as Error).message,
      success: false,
      statusCode: 500,
      data: null,
    }
  }
}

export { submitReview, verifyReviewId, startReviewLinkVisitProcess, getReviewLinkMetaName }
