import 'dotenv/config'

import config from '@payload-config'
import { createLocalReq, getPayload } from 'payload'

import { seed } from '../src/endpoints/seed'

const main = async () => {
  const payload = await getPayload({ config })
  const req = await createLocalReq({ context: { disableRevalidate: true } }, payload)
  await seed({ payload, req })
  process.exit(0)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
