import { CollectionConfig } from 'payload'

export const Skills: CollectionConfig = {
  slug: 'skills',
  admin: {
    useAsTitle: 'skill',
    hideAPIURL: true,
  },
  fields: [
    {
      name: 'skill',
      label: 'Skill',
      type: 'text',
      required: true,
    },
    {
      name: 'skill_type',
      label: 'Skill Type',
      type: 'select',
      required: true,
      options: [
        {
          label: 'Data Science',
          value: 'data_science',
        },
        {
          label: 'Web Developmet',
          value: 'web_development',
        },
      ],
    },
    {
      name: 'skill_rating',
      label: 'Skill Rating',
      type: 'number',
      min: 1,
      max: 5,
      required: true,
    },
  ],
}
