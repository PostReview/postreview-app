// app/api/auth/[...auth].ts
import { passportAuth } from "blitz"
import db from "db"
import { Strategy as GoogleStrategy } from "passport-google-oauth20"

export default passportAuth({
  successRedirectUrl: "/",
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
                "https://example.com/api/auth/google/callback"
              : "http://localhost:3000/api/auth/google/callback",
          scope: ["email", "profile"],
        },
        async function (_token, _tokenSecret, profile, done) {
          const email = profile.emails && profile.emails[0]?.value
          const user = await db.user.upsert({
            where: { email },
            create: {
              email,
              name: profile.displayName,
              icon: profile.photos[0]?.value,
            },
            update: { email },
          })

          const publicData = {
            userId: user.id,
            roles: [user.role],
            source: "google",
          }

          done(null, { publicData })
        }
      ),
    },
  ],
})
