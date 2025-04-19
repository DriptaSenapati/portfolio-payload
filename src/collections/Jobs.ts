import type { CollectionConfig } from 'payload'

export const Jobs: CollectionConfig = {
  slug: 'jobs',
  admin: {
    useAsTitle: 'company',
    hideAPIURL: true,
  },
  fields: [
    {
      name: 'company',
      type: 'text',
      label: 'Company',
      required: true,
    },
    {
      name: 'designation',
      type: 'text',
      label: 'Designation',
      required: true,
    },
    {
      name: 'isCurrent',
      type: 'checkbox',
      label: 'Is Current Job?',
      required: true,
      defaultValue: true,
    },
    {
      type: 'row',
      fields: [
        {
          name: 'startMonth',
          type: 'date',
          label: 'Start Month Year',
          validate: (
            value,
            { siblingData }: { siblingData: { isCurrent?: boolean; endMonth?: Date } },
          ) => {
            if (!value) return 'Start Month is required'
            // if (!siblingData?.isCurrent && !siblingData?.endMonth) {
            //   return 'End Month is required if not current job'
            // }
            if (!siblingData?.isCurrent && siblingData?.endMonth) {
              if (siblingData?.endMonth < (value as Date)) {
                return 'Start Month should be less than End Month'
              }
            }
            return true
          },
          admin: {
            date: {
              displayFormat: 'MMM-yyyy',
              overrides: {
                showMonthYearPicker: true,
              },
            },
          },
        },
        {
          name: 'endMonth',
          type: 'date',
          label: 'End Month Year',
          validate: (
            value,
            { siblingData }: { siblingData: { isCurrent?: boolean; startMonth?: Date } },
          ) => {
            if (siblingData?.isCurrent && value) return 'End Month is not required for current job'
            if (!siblingData?.isCurrent && !value) return 'End Month is required if not current job'
            if (siblingData?.startMonth && !siblingData?.isCurrent) {
              if (siblingData?.startMonth > (value as Date)) {
                return 'End Month should be less than Start Month'
              }
            }

            return true
          },
          admin: {
            date: {
              displayFormat: 'MMM-yyyy',
              overrides: {
                showMonthYearPicker: true,
              },
            },
          },
        },
      ],
    },
    {
      name: 'workDescription',
      type: 'textarea',
      label: 'Work Description',
      required: true,
    },
    {
      name: 'location',
      type: 'text',
      label: 'Location',
      required: true,
      admin: {
        components: {
          Field: './components/payload/jobs/LocationComponent',
        },
      },
    },
  ],
}
