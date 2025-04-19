import type { CollectionConfig } from 'payload'

export const Media: CollectionConfig = {
  slug: 'media',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
    },
  ],
  upload: {
    imageSizes: [
      {
        name: 'Card',
        width: 600,
        height: 400,
        position: 'center',
        withoutEnlargement: false,
      },
    ],
    mimeTypes: ['image/*', 'application/pdf'],
  },
}
