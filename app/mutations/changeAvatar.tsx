import db from "db"
import { Ctx, AuthorizationError } from "blitz"
import * as z from "zod"

const inputData = z.object({
  id: z.number(),
  avatar: z.string(),
})

export default async function changeAvatar(input: z.infer<typeof inputData>, ctx: Ctx) {
  const data = inputData.parse(input)
  ctx.session.$authorize()

  if (!ctx.session.userId) {
    throw new AuthorizationError()
  }

  const result = await db.user.update({
    where: { id: data.id },
    data: {
      icon: data.avatar,
    },
  })
  return result
}
