import { CollectionConfig } from 'payload'

export const Projects: CollectionConfig = {
  slug: 'projects',
  admin: {
    useAsTitle: 'name',
    hideAPIURL: true,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      label: 'Project Name',
    },
    {
      name: 'technology',
      type: 'array',
      label: 'Technology Used',
      minRows: 1,
      maxRows: 5,
      fields: [
        {
          name: 'technology',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'type',
      type: 'select',
      label: 'Type',
      required: true,
      options: [
        {
          label: 'Project',
          value: 'project',
        },
        {
          label: 'Certificate',
          value: 'certificate',
        },
      ],
    },
    {
      name: 'imageList',
      type: 'group',
      label: 'Image List',
      fields: [
        {
          name: 'primary',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
        {
          name: 'secondary',
          type: 'upload',
          relationTo: 'media',
        },
      ],
    },
    {
      name: 'certficate',
      type: 'text',
      label: 'Certificate Link (if any)',
      validate: (
        value: string | undefined | null,
        { siblingData }: { siblingData: { type?: string } },
      ) => {
        if (siblingData?.type === 'certificate' && (!value || typeof value !== 'string')) {
          return 'Certificate link is required for certificate type'
        }
        return true
      },
    },
    {
      name: 'projectLink',
      type: 'text',
      label: 'Project Link',
      validate: (
        value: string | undefined | null,
        { siblingData }: { siblingData: { type?: string } },
      ) => {
        if (siblingData?.type === 'project' && (!value || typeof value !== 'string')) {
          return 'Project link is required for project type'
        }
        return true
      },
    },
  ],
}
