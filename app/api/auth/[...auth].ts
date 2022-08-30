// app/api/auth/[...auth].ts
import { passportAuth } from "blitz"
import db from "db"
import { Strategy as GoogleStrategy } from "passport-google-oauth20"
import algoliasearch from "algoliasearch"

// Initialize Algolia
const client = algoliasearch(process.env.ALGOLIA_APP_ID!, process.env.ALGOLIA_API_ADMIN_KEY!)
const index = client.initIndex(`${process.env.ALGOLIA_PREFIX}_users`)

export default passportAuth({
  // TODO: If success, pass the email, icon, displayname to the success redirectURL?
  successRedirectUrl: "/signup",
  errorRedirectUrl: "/",
  strategies: [
    {
      strategy: new GoogleStrategy(
        {
          clientID: process.env.GOOGLE_CLIENT_ID as string,
          clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
          callbackURL:
            process.env.NODE_ENV === "production"
              ? // deployment target
                "https://postreview-app.herokuapp.com/api/auth/google/callback"
              : process.env.GOOGLE_CALLBACK_URL,
          scope: ["email", "profile"],
        },
        // TODO: Ask users to set their own handle,
        async function (_token, _tokenSecret, profile, done) {
          const email = profile.emails && profile.emails[0]?.value

          const userData = {
            email,
            // Remove any whitespaces from the display name and make it a handle
            handle: profile.displayName.replace(/ /g, ""),
            displayName: profile.displayName,
            icon: profile.photos[0]?.value,
            // Assume Google Email is verified
            emailIsVerified: true,
          }

          const user = await db.user.upsert({
            where: { email },
            create: {
              ...userData,
            },
            update: { email },
          })

          const publicData = {
            userId: user.id,
            roles: [user.role],
            source: "google",
          }

          // Update Algolia
          // Update Algolia
          await index.saveObject({
            objectID: user.id,
            ...userData,
            createdAt_timestamp: Date.now(),
            updatedAt_timestamp: Date.now(),
          })

          done(null, { publicData })
        }
      ),
    },
  ],
})
