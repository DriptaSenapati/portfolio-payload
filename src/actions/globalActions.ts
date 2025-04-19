'use server'

import { getPayloadObject } from '@/getPayloadObject'

const getGlobals = async () => {
  const payload = await getPayloadObject()

  const appConfig = await payload.findGlobal({
    slug: 'appConfig',
  })

  return appConfig
}

export { getGlobals }
