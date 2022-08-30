import { resolver, SecurePassword } from "blitz"
import db from "db"
import { Signup } from "app/auth/validations"
import { Role } from "types"
import { generateCode } from "../verify-email-utils"
import sendEmailWithTemplate from "mailers/sendEmailWithTemplate"
import algoliasearch from "algoliasearch"

// Initialize Algolia
const client = algoliasearch(process.env.ALGOLIA_APP_ID!, process.env.ALGOLIA_API_ADMIN_KEY!)
const index = client.initIndex(`${process.env.ALGOLIA_PREFIX}_articles`)

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

  const msg = {
    From: "hello@postreview.org",
    To: user.email,
    TemplateAlias: "welcome",
    TemplateModel: {
      product_url: process.env.PUBLIC_URL,
      product_name: "PostReview",
      name: addedUser?.handle,
      expire_in: 30,
      action_url: `${origin}/verify-email/${emailCode}?userId=${user.id}`,
      operating_system: "operating_system_Value",
      browser_name: "browser_name_Value",
      support_url: "hello@postreview.org",
      company_name: "PostReview",
      company_address: "",
    },
  }

  // Update Algolia
  await index.saveObject({
    objectID: addedUser?.id,
    handle: addedUser?.handle,
    displayName: addedUser?.displayName,
    icon: addedUser?.icon,
    createdAt_timestamp: addedUser?.createdAt.valueOf(),
    updatedAt_timestamp: addedUser?.updatedAt.valueOf(),
  })

  await sendEmailWithTemplate(msg)

  return user
})
