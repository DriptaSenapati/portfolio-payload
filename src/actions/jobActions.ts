'use server'

import { getPayloadObject } from '@/getPayloadObject'

const getJobs = async () => {
  const payload = await getPayloadObject()

  const jobList = await payload.find({
    collection: 'jobs',
    depth: 0,
    sort: '-startMonth',
  })

  return jobList.docs
}

export { getJobs }
