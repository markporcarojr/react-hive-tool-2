// config/passport.js

import passport from 'passport';
// import LocalStrategy from 'passport-local';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { User } from "../models/user.js";
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
dotenv.config();


// // ===================Configure Google OAuth2 Strategy=========================

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;

passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: '/auth/google/callback',
    scope: ["profile", "email"],
},

    function (accessToken, refreshToken, profile, cb) {
        cb(null, profile)
    }));

// Serialize user
passport.serializeUser((user, done) => {
    done(null, user);
});
// DeSerialize user
passport.deserializeUser((user, done) => {
    done(null, user);
});




export default passport; // Export configured Passport instance
