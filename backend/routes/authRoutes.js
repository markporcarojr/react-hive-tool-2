// // authRoutes.js

import express from "express";
import passport from "passport";
import nodemailer from "nodemailer";
import { User } from "../models/user.js";
import bcrypt from 'bcrypt';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';

const router = express.Router();

const generateResetToken = async () => {
    try {
        const token = crypto.randomBytes(32).toString('hex');
        const hashedToken = await bcrypt.hash(token, 10); // Hash the token using bcrypt
        return hashedToken;
    } catch (error) {
        throw new Error('Error generating reset token');
    }
};

router.get('/login/success', (req, res) => {
    if (req.user) {
        res.status(200).json({
            error: false,
            message: "Succesfully Logged In",
            user: req.user,
        });
    } else {
        res.status(403).json({ error: true, message: "Not Authorized" })
    }
});

router.get('/login/failed', (req, res) => {
    res.status(401).json({
        error: true,
        message: "Login Failed",
    });
});


// POST route for user logout
router.post('/logout', (req, res) => {
    req.logout(); // Passport logout function
    res.redirect("http://localhost:5173/login")
    res.send('Logged out');
});

// // POST route for user login
// router.post('/login', passport.authenticate('local'), (req, res) => {
//     // Redirect or send response after successful login
//     res.send('Login Successful');
// });

router.get("/google", passport.authenticate("google", { scope: ["email"] }));

router.get("/google/callback", passport.authenticate("google", {
    successRedirect: "http://localhost:5173/",
    failureRedirect: "/login"
}), async (req, res) => {
    // Check if user exists in database
    const existingUser = await User.findOne({ email: req.user.email });

    if (existingUser) {
        // User already exists, log them in (session or JWT)
        req.session.userId = existingUser._id; // Using session for example
        res.redirect('/');
    } else {
        // Create a new user document
        const newUser = new User({
            email: req.user.email,
            name: req.user.displayName,
            googleId: req.user.id
        });
        await newUser.save();
        req.session.userId = newUser._id; // Update session
        res.redirect('/');
    }
});

// POST route for password reset
router.post("/forgot-password", async (req, res) => {
    const { email } = req.body;
    User.findOne({ email: email })
        .then(user => {
            if (!user) {
                return res.send({ Status: "User Not Found" })
            }
            const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' })

            var transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: process.env.MY_GMAIL,
                    pass: process.env.MY_GMAIL_PASSWORD
                }
            });

            var mailOptions = {
                from: process.env.MY_GMAIL,
                to: email,
                subject: 'Reset Your Password',
                text: `http://localhost:5173/reset-password/${user._id}/${token}`
            };

            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    console.log(error);
                } else {
                    return res.send({ Status: "Success " })
                }
            });

        })

});

router.post("/reset-password/:id/:token", (req, res) => {
    const { id, token } = req.params
    const { password } = req.body

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.json({ Status: "Error" })
        } else {
            bcrypt.hash(password, 10)
                .then(hash => {
                    User.findByIdAndUpdate({ _id: id }, { password: hash })
                        .then(u => res.send({ Status: "Success" }))
                        .catch(err => res.send({ Status: err }))
                })
                .catch(err => res.send({ Status: err }))
        }
    })
})


export default router;
