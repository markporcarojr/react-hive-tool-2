import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import User from '../models/user.js'; // Assuming this is your User model

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;

passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: '/auth/google/callback',
    scope: ["profile", "email"],
},
    async (accessToken, refreshToken, profile, done) => {
        try {
            // Check if user exists in your database
            let user = await User.findOne({ googleId: profile.id });
            if (!user) {
                // Create a new user if not found
                user = new User({
                    googleId: profile.id,
                    email: profile.emails[0].value,
                    // Other user properties as needed
                });
                await user.save();
            }
            return done(null, user); // Return the user object for authentication
        } catch (error) {
            return done(error, false); // Error handling
        }
    }
)
);

// Serialize user for session management
passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id);
        done(null, user);
    } catch (error) {
        done(error, null);
    }
});



