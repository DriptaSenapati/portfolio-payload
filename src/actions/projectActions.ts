'use server'

import { getPayloadObject } from '@/getPayloadObject'

const getProjectList = async () => {
  const payload = await getPayloadObject()

  const projects = await payload.find({
    collection: 'projects',
    depth: 1,
  })

  return projects?.docs || []
}

export { getProjectList }
