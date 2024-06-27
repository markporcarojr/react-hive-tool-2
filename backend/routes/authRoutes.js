// // authRoutes.js

import express from "express";
import nodemailer from "nodemailer";
import { User } from "../models/user.js";
import bcrypt from 'bcrypt';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const REDIRECT_URI = process.env.REDIRECT_URI;

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

router.get('/google', (req, res) => {
    const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${GOOGLE_CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code&scope=email%20profile`;
    res.redirect(authUrl);
});

// Callback endpoint to handle Google's response
router.get('/google/callback', async (req, res) => {
    const code = req.query.code;
    if (!code) {
        return res.status(400).json({ error: 'Authorization code missing' });
    }

    try {
        // Exchange authorization code for access token
        const tokenUrl = 'https://oauth2.googleapis.com/token';
        const params = new URLSearchParams();
        params.append('code', code);
        params.append('client_id', GOOGLE_CLIENT_ID);
        params.append('client_secret', GOOGLE_CLIENT_SECRET);
        params.append('redirect_uri', REDIRECT_URI);
        params.append('grant_type', 'authorization_code');
        const tokenResponse = await fetch(tokenUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: params,
        });
        const tokenData = await tokenResponse.json();

        // Use the access token to fetch user information
        const { access_token } = tokenData;
        const userInfoUrl = `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${access_token}`;
        const userInfoResponse = await fetch(userInfoUrl);
        const userData = await userInfoResponse.json();

        // Here you can handle user authentication and create a session or JWT token
        // For example, you can check if the user already exists in your database
        // If not, you can create a new user record based on the received user data

        // Send the user data or authentication token back to the frontend
        res.json(userData);
    } catch (error) {
        console.error('Google auth error:', error);
        res.status(500).json({ error: 'Google authentication failed' });
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
                text: `${import.meta.env.VITE_BACKEND_API}/${user._id}/${token}`
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
