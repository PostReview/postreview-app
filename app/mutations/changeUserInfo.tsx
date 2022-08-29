import db from "db"
import { Ctx, AuthorizationError } from "blitz"
import * as z from "zod"

const inputData = z.object({
  id: z.number(),
  handle: z.string(),
  displayName: z.string().optional().nullable(),
  pronoun: z.string().optional().nullable(),
  aboutMe: z.string().optional().nullable(),
  website: z.string().optional().nullable(),
  icon: z.string().optional().nullable(),
  isOnboarded: z.boolean(),
})

export default async function changeUserInfo(input: z.infer<typeof inputData>, ctx: Ctx) {
  const data = inputData.parse(input)
  ctx.session.$authorize()

  if (!ctx.session.userId) {
    throw new AuthorizationError()
  }

  const { id, ...otherData } = data

  const result = await db.user.update({
    where: { id: data.id },
    data: {
      ...otherData,
    },
  })
  return result
}
