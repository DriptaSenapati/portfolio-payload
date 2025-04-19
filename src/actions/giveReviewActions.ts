'use server'

import { getPayloadObject } from '@/getPayloadObject'
import { z } from 'zod'

const formSchema = z.object({
  name: z.string().min(2),
  rating: z.number().min(1),
  feedback: z.string().max(200),
  workedAs: z.string(),
})

const submitReview = async (formValues: z.infer<typeof formSchema>) => {
  try {
    const payload = await getPayloadObject()
    await payload.create({
      collection: 'reviews',
      data: {
        ...formValues,
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

export { submitReview }
