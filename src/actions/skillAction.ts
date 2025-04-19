'use server'

import { getPayloadObject } from '@/getPayloadObject'

const getSkills = async () => {
  const payload = await getPayloadObject()

  const skillList = await payload.find({
    collection: 'skills',
    depth: 0,
  })

  return skillList.docs
}

export { getSkills }
