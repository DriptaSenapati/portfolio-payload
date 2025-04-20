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
import { vercelBlobStorage } from '@payloadcms/storage-vercel-blob'
import { ReviewLinks } from './collections/ReviewLinks'
import { nodemailerAdapter } from '@payloadcms/email-nodemailer'
import nodemailer from 'nodemailer'
import { EmailResponses } from './collections/EmailResponse'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)
const env = process.env.NODE_ENV

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
  collections: [Users, Media, Jobs, Reviews, Projects, Skills, ReviewLinks, EmailResponses],
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
  email: nodemailerAdapter({
    defaultFromAddress: process.env.FROM_ADDRESS || '',
    defaultFromName: 'Dripta Senapati',
    transport: nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: 465,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    }),
  }),
  plugins: [
    payloadCloudPlugin(),
    // storage-adapter-placeholder
    vercelBlobStorage({
      enabled: env === 'production' ? true : false, // Optional, defaults to true
      // Specify which collections should use Vercel Blob
      collections: {
        media: true,
      },
      // Token provided by Vercel once Blob storage is added to your Vercel project
      token: process.env.BLOB_READ_WRITE_TOKEN,
    }),
  ],
})
