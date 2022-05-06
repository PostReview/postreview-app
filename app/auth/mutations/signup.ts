import { resolver, SecurePassword } from "blitz"
import db from "db"
import { Signup } from "app/auth/validations"
import { Role } from "types"
import { generateCode } from "../verify-email-utils"
import sendEmailWithTemplate from "mailers/sendEmailWithTemplate"

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

  await sendEmailWithTemplate(msg)

  return user
})
