import { GlobalConfig } from 'payload'

export const AppGlobals: GlobalConfig = {
  slug: 'appConfig',
  admin: {
    hideAPIURL: true,
  },
  fields: [
    {
      name: 'home',
      label: 'Home',
      type: 'group',
      fields: [
        {
          name: 'home_title',
          label: 'Home Screen Title',
          required: true,
          type: 'text',
        },
        {
          name: 'resume_doc',
          label: 'Resume',
          type: 'upload',
          required: true,
          relationTo: 'media',
        },
        {
          name: 'connect_links',
          label: 'Connections',
          type: 'group',
          fields: [
            {
              name: 'linkedin_link',
              label: 'LinkedIn',
              type: 'text',
              required: true,
            },
            {
              name: 'github_link',
              label: 'GitHub',
              type: 'text',
              required: true,
            },
            {
              name: 'facebook_link',
              label: 'Facebook',
              type: 'text',
              required: true,
            },
          ],
        },
      ],
    },
    {
      name: 'about',
      label: 'About',
      type: 'group',
      fields: [
        {
          name: 'about_myself',
          label: 'About Myself',
          type: 'textarea',
          required: true,
        },
        {
          name: 'show_contant_button',
          label: 'Show Contact Button?',
          type: 'checkbox',
          required: true,
          defaultValue: false,
        },
        {
          name: 'about_image',
          label: 'About Image',
          type: 'upload',
          required: true,
          relationTo: 'media',
        },
      ],
    },
    {
      name: 'skill',
      label: 'Skill',
      type: 'group',
      fields: [
        {
          name: 'skill_intro',
          label: 'Skill Intro',
          required: true,
          type: 'textarea',
        },
      ],
    },
  ],
}
