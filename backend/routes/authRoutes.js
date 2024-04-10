// // authRoutes.js

import express from "express";
import { Passport } from "passport";
import passport from "../config/passport.js";
const router = express.Router();

// // router.get('/login/success', (req, res) => {
// //     if (req.user) {
// //         res.status(200).json({
// //             success: true,
// //             message: "Succesful",
// //             user: req.user,
// //             // cookies: req.cookies
// //         });

// //     }
// // });

// // router.get('/login/failed', (req, res) => {
// //     res.status(401).json({
// //         success: false,
// //         message: "Auth Failed",
// //     });
// // });

// // POST route for user login
// router.post('/login', passport.authenticate('local'), (req, res) => {
//     // Redirect or send response after successful login
//     res.send('Login Successful');
// });

// // POST route for user logout
// router.post('/logout', (req, res) => {
//     req.logout(); // Passport logout function
//     res.send('Logged out');
// });


router.get("/google", passport.authenticate("google", { scope: ["profile"] }));

router.get("/google/callback", passport.authenticate("google", {
    successRedirect: "http://localhost:5173/",
    failureRedirect: "http://localhost:5173/login"
}))

export default router;
