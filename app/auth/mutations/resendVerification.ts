import { resolver } from "blitz"
import db from "db"
import { Ctx } from "blitz"
import { generateCode } from "../verify-email-utils"
import sendEmailWithTemplate from "mailers/sendEmailWithTemplate"

export default resolver.pipe(async (_, ctx: Ctx) => {
  const user = await db.user.findFirst({
    where: {
      id: ctx.session.$publicData.userId!,
    },
  })

  const emailCode = await generateCode(user!.hashedPassword!)
  const origin = process.env.APP_ORIGIN || process.env.BLITZ_DEV_SERVER_ORIGIN

  await sendEmailWithTemplate({
    From: "hello@postreview.org",
    To: user?.email,
    TemplateAlias: "welcome",
    TemplateModel: {
      product_url: process.env.PUBLIC_URL,
      product_name: "PostReview",
      name: user?.handle,
      expire_in: 30,
      action_url: `${origin}/verify-email/${emailCode}?userId=${user?.id}`,
      operating_system: "operating_system_Value",
      browser_name: "browser_name_Value",
      support_url: "hello@postreview.org",
      company_name: "PostReview",
      company_address: "",
    },
  })

  return true
})
