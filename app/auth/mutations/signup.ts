import { resolver, SecurePassword } from "blitz"
import db from "db"
import { Signup } from "app/auth/validations"
import { Role } from "types"
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

  await index.saveObject({
    objectID: addedUser?.id,
    name: addedUser?.handle,
    displayName: addedUser?.displayName,
    icon: addedUser?.icon,
  })

  return user
})
