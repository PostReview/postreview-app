import { Ctx } from "blitz"
import db from "db"

export default async function getCurrentUser(_ = null, { session }: Ctx) {
  if (!session.userId) return null

  const user = await db.user.findFirst({
    where: { id: session.userId },
    select: {
      id: true,
      handle: true,
      displayName: true,
      pronoun: true,
      email: true,
      emailIsVerified: true,
      role: true,
      icon: true,
      aboutMe: true,
      website: true,
      isOnboarded: true,
    },
  })

  return user
}
