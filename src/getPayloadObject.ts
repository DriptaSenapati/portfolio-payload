import { getPayload } from 'payload'
import config from '@payload-config'

const getPayloadObject = async () => {
  return await getPayload({ config })
}

export { getPayloadObject }
