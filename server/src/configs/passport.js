import passport from "passport";
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';

passport.use(
  new GoogleStrategy({
    clientID: process.env.OAUTH_CLIENT_ID,
    clientSecret: process.env.OAUTH_CLIENT_SECRET,
    callbackURL: '/api/auth/google/callback'
  },
    async (accessToken, refreshToken, profile, done) => {
      // profile contains verified Google user
      return done(null, profile);
    }
  )
)

export default passport;