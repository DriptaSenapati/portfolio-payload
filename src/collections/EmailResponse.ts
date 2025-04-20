import type { CollectionConfig } from 'payload'

export const EmailResponses: CollectionConfig = {
  slug: 'emailResponse',
  access: {
    create: () => false,
    read: () => true,
    update: () => false,
    delete: () => false,
  },
  fields: [
    {
      name: 'triggeredBy',
      label: 'TriggeredBy',
      type: 'text',
      required: true,
    },
    {
      name: 'messageResJSON',
      label: 'Message Response',
      type: 'json',
      required: true,
    },
  ],
}
