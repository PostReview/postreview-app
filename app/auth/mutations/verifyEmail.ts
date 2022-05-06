import { resolver, SecurePassword } from "blitz"
import db from "db"
import algoliasearch from "algoliasearch"
import * as z from "zod"
import { Ctx } from "blitz"
import { verifyPassword } from "../verify-email-utils"

export async function verifyCode(code: string, secret: string | null) {
  try {
    const result = await verifyPassword(code, secret)
    return [SecurePassword.VALID, SecurePassword.VALID_NEEDS_REHASH].includes(result)
  } catch (error) {
    return false
  }
}

// Initialize Algolia
const client = algoliasearch(process.env.ALGOLIA_APP_ID!, process.env.ALGOLIA_API_ADMIN_KEY!)
const index = client.initIndex(`${process.env.ALGOLIA_PREFIX}_users`)

export default resolver.pipe(
  resolver.zod(z.object({ code: z.string(), userId: z.any() })),
  async ({ code, userId }, ctx: Ctx) => {
    const user = await db.user.findUnique({
      where: { id: parseInt(userId) },
    })
    const { hashedPassword } = user!

    const isValid = await verifyCode(code, hashedPassword)
    if (isValid) {
      await db.user.update({ where: { id: parseInt(userId) }, data: { emailIsVerified: true } })

      // Save to Algolia only when the email is verified
      await index.saveObject({
        objectID: user?.id,
        name: user?.handle,
        displayName: user?.displayName,
        icon: user?.icon,
      })

      return true
    } else {
      return false
    }
  }
)
