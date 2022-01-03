import db from "db"
import { Ctx, AuthorizationError } from "blitz"

export default async function deleteUser(currentUserId, ctx: Ctx) {
  ctx.session.$authorize()

  if (!ctx.session.userId) {
    throw new AuthorizationError()
  }

  const result = await db.user.delete({ where: { id: currentUserId } })

  return result
}
