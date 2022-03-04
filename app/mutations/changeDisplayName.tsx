import db from "db"
import { Ctx, AuthorizationError } from "blitz"
import * as z from "zod"

const inputData = z.object({
  id: z.number(),
  displayName: z.string(),
})

export default async function changeDisplayName(input: z.infer<typeof inputData>, ctx: Ctx) {
  const data = inputData.parse(input)
  ctx.session.$authorize()

  if (!ctx.session.userId) {
    throw new AuthorizationError()
  }

  const result = await db.user.update({
    where: { id: data.id },
    data: {
      displayName: data.displayName,
    },
  })
  return result
}
