import { PrismaClient } from '@prisma/client'

const db = new PrismaClient()

try {
  const projects = await db.project.findMany({ include: { tools: true } })
  console.log('OK count=', projects.length)
} catch (e) {
  console.error('NAME:', e?.name)
  console.error('CODE:', e?.code)
  console.error('MESSAGE:\n', e?.message)
} finally {
  await db.$disconnect()
}
