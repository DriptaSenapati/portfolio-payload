import { Review } from '@/payload-types'
import type { CollectionAfterOperationHook, CollectionConfig } from 'payload'

const afterOperationHook: CollectionAfterOperationHook = async ({ operation, result, req }) => {
  if (operation === 'create') {
    const { name, feedback, rating, workedAs } = result as Review
    const { payload } = req

    const email = await payload.sendEmail({
      from: `'Portfolio Feedback Submission' <${process.env.FROM_ADDRESS}>`,
      to: process.env.TO_EMAIL,
      subject: `Feedback submitted by ${name}`,
      html: `
        <div>
          <h4>Hi, Dripta Senapati</h4>
          <p>Review Submitted by ${name}. Review details as follows:</p>
          <b>Rating</b><br />
          ${rating}<br />
          <b>Feedback</b><br />
          ${feedback}<br />
          <b>Worked As</b><br />
          ${workedAs}
        </div>
      `,
    })

    await payload.create({
      collection: 'emailResponse',
      req: req,
      data: {
        triggeredBy: name,
        messageResJSON: JSON.stringify(email),
      },
    })
  }
}

export const Reviews: CollectionConfig = {
  slug: 'reviews',
  admin: {
    useAsTitle: 'name',
    hideAPIURL: true,
    defaultColumns: ['name', 'isAllowed', 'rating', 'feedback'],
  },
  hooks: {
    afterOperation: [afterOperationHook],
  },
  fields: [
    {
      name: 'name',
      label: 'Name',
      required: true,
      type: 'text',
    },
    {
      name: 'rating',
      label: 'Rating',
      required: true,
      type: 'number',
      min: 1,
      max: 5,
      admin: {
        step: 0.5,
      },
    },
    {
      name: 'feedback',
      type: 'textarea',
      label: 'Feedback',
      required: true,
      admin: {
        components: {
          Field: './components/payload/CustomTextArea',
        },
      },
    },
    {
      name: 'workedAs',
      type: 'text',
      label: 'Worked As',
      required: true,
    },
    {
      name: 'isAllowed',
      label: 'Allowed to show?',
      type: 'checkbox',
      defaultValue: false,
    },
  ],
}
