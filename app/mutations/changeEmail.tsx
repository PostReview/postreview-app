import db from "db"
import { Ctx, AuthorizationError } from "blitz"
import * as z from "zod"

const inputData = z.object({
  id: z.number(),
  email: z.string(),
})

export default async function changeEmail(input: z.infer<typeof inputData>, ctx: Ctx) {
  const data = inputData.parse(input)
  ctx.session.$authorize()

  if (!ctx.session.userId) {
    throw new AuthorizationError()
  }

  const result = await db.user.update({
    where: { id: data.id },
    data: {
      email: data.email,
    },
  })
  return result
}
