import type { CollectionConfig } from 'payload'

export const Reviews: CollectionConfig = {
  slug: 'reviews',
  admin: {
    useAsTitle: 'name',
    hideAPIURL: true,
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
  ],
}
