// storage-adapter-import-placeholder
import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { payloadCloudPlugin } from '@payloadcms/payload-cloud'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Jobs } from './collections/Jobs'
import { Reviews } from './collections/Reviews'
import { Projects } from './collections/Projects'
import { Skills } from './collections/Skills'
import { AppGlobals } from './globals/AppGlobals'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    theme: 'dark',
    components: {
      graphics: {
        Logo: './components/PayloadLogo',
        Icon: './components/PayloadLogo',
      },
    },
    meta: {
      icons: [
        {
          url: './logo.png',
          fetchPriority: 'high',
          sizes: '16x16',
        },
      ],
    },
  },
  collections: [Users, Media, Jobs, Reviews, Projects, Skills],
  globals: [AppGlobals],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: mongooseAdapter({
    url: process.env.DATABASE_URI || '',
  }),
  sharp,
  plugins: [
    payloadCloudPlugin(),
    // storage-adapter-placeholder
  ],
})
