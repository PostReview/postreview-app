import { resolver, SecurePassword } from "blitz"
import db from "db"
import { Signup } from "app/auth/validations"
import { Role } from "types"
import { generateCode } from "../verify-email-utils"
import sendEmailWithTemplate from "mailers/sendEmailWithTemplate"
import algoliasearch from "algoliasearch"

// Initialize Algolia
const client = algoliasearch(process.env.ALGOLIA_APP_ID!, process.env.ALGOLIA_API_ADMIN_KEY!)
const index = client.initIndex(`${process.env.ALGOLIA_PREFIX}_users`)

export default resolver.pipe(resolver.zod(Signup), async ({ email, handle, password }, ctx) => {
  const hashedPassword = await SecurePassword.hash(password.trim())
  const user = await db.user.create({
    data: { email: email.toLowerCase().trim(), handle: handle, hashedPassword, role: "USER" },
    select: { id: true, handle: true, displayName: true, email: true, role: true },
  })

  await ctx.session.$create({ userId: user.id, role: user.role as Role })

  // Get added user
  const addedUser = await db.user.findFirst({ where: { handle: handle } })

  // Send a password verification email
  const emailCode = await generateCode(hashedPassword)
  const origin = process.env.APP_ORIGIN || process.env.BLITZ_DEV_SERVER_ORIGIN

  const datetime = new Date()

  const msg = {
    From: "'PostReview'<info@postreview.org>",
    To: user.email,
    TemplateAlias: "welcome",
    TemplateModel: {
      product_url: process.env.PUBLIC_URL,
      name: addedUser?.handle,
      action_url: `${origin}/verify-email/${emailCode}?userId=${user.id}`,
      support_url: "info@postreview.org",
      year: datetime.getFullYear(),
    },
  }

  await sendEmailWithTemplate(msg)

  // Update Algolia
  await index.saveObject({
    objectID: addedUser?.id,
    handle: addedUser?.handle,
    displayName: addedUser?.displayName,
    pronoun: addedUser?.pronoun,
    icon: addedUser?.icon,
    createdAt: addedUser?.createdAt,
    updatedAt: addedUser?.updatedAt,
    createdAt_timestamp: addedUser?.createdAt.valueOf(),
    updatedAt_timestamp: addedUser?.updatedAt.valueOf(),
  })

  return user
})
