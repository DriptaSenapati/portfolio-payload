import { CollectionConfig } from 'payload'
import type { CollectionAfterOperationHook } from 'payload'

const afterOperationHook: CollectionAfterOperationHook = async ({
  operation,
  result,
  req,
  collection,
}) => {
  console.log(
    'called',
    operation,
    process.env.NODE_ENV,
    result,
    `${process.env.NODE_ENV === 'development' ? 'http://localhost:3000/' : process.env.NODE_ENV === 'production' ? process.env.PROD_URL : ''}give-review/${(result as { id: string }).id}`,
  )
  if (operation === 'create') {
    const collectionId = (result as { id: string }).id
    const { payload } = req

    await payload.update({
      collection: collection.slug,
      req: req,
      where: {
        id: {
          equals: collectionId,
        },
      },
      data: {
        reviewLinkAddress: `${process.env.NODE_ENV === 'development' ? 'http://localhost:3000/' : process.env.NODE_ENV === 'production' ? process.env.PROD_URL : ''}give-review/${collectionId}`,
      },
    })
  }
}

export const ReviewLinks: CollectionConfig = {
  slug: 'reviewLinks',
  hooks: {
    afterOperation: [afterOperationHook],
  },
  fields: [
    {
      name: 'targetName',
      label: 'User Name',
      required: true,
      type: 'text',
    },
    {
      name: 'isLinkVisited',
      label: 'Link Visted?',
      type: 'checkbox',
      required: true,
      defaultValue: false,
      admin: {
        readOnly: true,
      },
    },
    {
      name: 'expirationTime',
      label: 'Link Expiration Time',
      type: 'date',
      validate: (value, { siblingData }: { siblingData: { isLinkVisited?: boolean } }) => {
        if (siblingData?.isLinkVisited && !value) {
          return 'expirationTime is required if link is visited'
        }
        return true
      },
      admin: {
        date: {
          pickerAppearance: 'dayAndTime',
        },
        readOnly: true,
      },
    },
    {
      name: 'isReviewSubmitted',
      label: 'Review Submitted?',
      type: 'checkbox',
      required: true,
      defaultValue: false,
      admin: {
        readOnly: true,
      },
    },
    {
      name: 'reviewLinkAddress',
      label: 'Review Link Address',
      type: 'text',
    },
    {
      name: 'expirationConfig',
      label: 'Expiration Config',
      type: 'group',
      fields: [
        {
          name: 'expirationInterval',
          label: 'Expiration Interval',
          type: 'number',
          required: true,
          defaultValue: 30,
        },
        {
          name: 'expirationIntervalUnit',
          label: 'Expiration Interval Unit',
          type: 'select',
          required: true,
          options: [
            {
              label: 'days',
              value: 'days',
            },
            {
              label: 'minutes',
              value: 'minutes',
            },
          ],
          defaultValue: 'minutes',
        },
      ],
    },
  ],
}
