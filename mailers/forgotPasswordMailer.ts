/* TODO - You need to add a mailer integration in `integrations/` and import here.
 *
 * The integration file can be very simple. Instantiate the email client
 * and then export it. That way you can import here and anywhere else
 * and use it straight away.
 */

type ResetPasswordMailer = {
  to: string
  token: string
}

export function forgotPasswordMailer({ to, token }: ResetPasswordMailer) {
  // In production, set APP_ORIGIN to your production server origin
  const origin = process.env.APP_ORIGIN || process.env.BLITZ_DEV_SERVER_ORIGIN
  const resetUrl = `${origin}/reset-password?token=${token}`

  let postmark = require("postmark")
  const serverToken = process.env.POSTMARK_TOKEN
  let client = new postmark.ServerClient(serverToken)

  const msg = {
    From: "hello@postreview.org",
    To: to,
    TemplateAlias: "password-reset",
    TemplateModel: {
      product_url: process.env.PUBLIC_URL,
      product_name: "PostReview",
      action_url: resetUrl,
      operating_system: "operating_system_Value",
      browser_name: "browser_name_Value",
      support_url: "hello@postreview.org",
      company_name: "PostReview",
      company_address: "",
    },
  }

  return {
    async send() {
      await client.sendEmailWithTemplate(msg)
    },
  }
}
