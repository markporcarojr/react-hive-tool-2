// // authRoutes.js

import express from "express";
import passport from "passport";

const router = express.Router();

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

router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));

// router.get("/google/callback", passport.authenticate("google", {
//     successRedirect: "http://localhost:5173/",
//     failureRedirect: "http://localhost:5173/login"
// }))

router.get("/google/callback", passport.authenticate("google", {
    successRedirect: "http://localhost:5173/",
    failureRedirect: "/login/failed"
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
export default router;
