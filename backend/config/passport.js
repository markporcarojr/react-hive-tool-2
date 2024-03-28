// config/passport.js

import passport from 'passport';
import LocalStrategy from 'passport-local';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { User } from "../models/user.js";
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
dotenv.config();


// ===================Configure Google OAuth2 Strategy=========================

// const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
// const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;

// passport.use(new GoogleStrategy({
//     clientID: GOOGLE_CLIENT_ID,
//     clientSecret: GOOGLE_CLIENT_SECRET,
//     callbackURL: '/auth/google/callback',
// },

//     async (accessToken, refreshToken, profile, cb) => {
//         try {
//             // Check if the user exists in your database
//             let user = await User.findOne({ googleId: profile.id });

//             // If user doesn't exist, create a new user
//             if (!user) {
//                 user = new User({
//                     googleId: profile.id,
//                     email: profile.emails[0].value, // Use the first email from Google profile
//                     // Add other relevant user data here
//                 });
//                 await user.save();
//             }

//             // Pass the user to Passport
//             return cb(null, user);
//         } catch (error) {
//             return cb(error, null);
//         }
//     }));

// // Serialize user
// passport.serializeUser((user, done) => {
//     done(null, user.id);
// });

// // Deserialize user
// passport.deserializeUser(async (id, done) => {
//     try {
//         const user = await User.findById(id);
//         done(null, user);
//     } catch (err) {
//         done(err, null);
//     }
// });

// ===================Configure Local Strategy=========================

passport.use(User.createStrategy());

// passport.serializeUser(User.serializeUser());
// passport.deserializeUser(User.deserializeUser());

// Serialize user
passport.serializeUser((user, done) => {
    console.log('Serializing user:', user);
    done(null, user.id);
});

// Deserialize user
passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id);
        console.log('Deserialized user:', user);
        done(null, user);
    } catch (err) {
        console.error('Error deserializing user:', err);
        done(err, null);
    }
});



export default passport; // Export configured Passport instance
