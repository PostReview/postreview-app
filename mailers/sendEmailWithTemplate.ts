const sendEmailWithTemplate = async (msg) => {
  let postmark = require("postmark")
  const serverToken = process.env.POSTMARK_TOKEN
  let client = new postmark.ServerClient(serverToken)
  await client.sendEmailWithTemplate(msg)
}

export default sendEmailWithTemplate
