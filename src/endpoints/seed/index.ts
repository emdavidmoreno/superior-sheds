import type { Payload, PayloadRequest } from 'payload'

import { seedSuperior } from './superior-seed'

export const seed = async ({
  payload,
  req,
}: {
  payload: Payload
  req: PayloadRequest
}): Promise<void> => {
  payload.logger.info('Seeding Superior Sheds...')
  await seedSuperior({ payload, req })
  payload.logger.info('Seeded database successfully!')
}
