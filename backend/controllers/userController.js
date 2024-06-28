//userController.js

import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';
import { OAuth2Client } from 'google-auth-library';
import { User } from '../models/user.js';
import { Hive } from '../models/hive.js';
import { Swarm } from '../models/swarm.js';
import { Inspection } from '../models/inspections.js'
import { Inventory } from '../models/inventory.js';
import { Todo } from '../models/todo.js';
import { Harvest } from '../models/harvest.js';

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.send({
                message: "both fields are required.",
            })
        }
        const user = await User.findOne({ email });
        if (!user) {
            return res.send({
                message: "user is not registered.",
            })
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.send({
                message: "credentials entered are invalid.",
            })
        }
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
        return res.send({
            message: `${user.email} is logged in.`,
            user,
            token,
        });

    } catch (error) {
        console.log(error);
        return res.send({
            message: "logging in a user callback error.",
            error,
        })
    }
};

export const registerUser = async (req, res) => {
    try {
        const { email, password, username } = req.body;
        if (!email || !password || !username) {
            return res.send({
                message: 'All fields are required'
            })
        }
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.send({
                message: "User is already registered.",
            })
        }
        const hashedPassword = await bcrypt.hash(password, 12);
        const user = new User({ email, password: hashedPassword, username })
        await user.save();
        return res.send({
            message: "User was registered successfully.",
            user,
        })

    }
    catch (error) {
        console.log(error);
        return res.send({
            message: "Registering a user callback error.",
            error,
        })
    }
};

export const getUser = async (req, res) => {
    try {
        // Extract the JWT token from the authorization header
        const token = req.header("Authorization")?.replace("Bearer ", "");

        if (!token) {
            return res.status(401).json({ message: "Authorization token not provided" });
        }

        // Verify the JWT token and extract the user ID
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if (!decoded || !decoded.userId) {
            return res.status(401).json({ message: "Invalid authorization token" });
        }

        // Fetch the user based on the extracted user ID
        const user = await User.findById(decoded.userId);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Return the user data in the response
        res.status(200).json({ user });
    } catch (error) {
        console.error("Fetch user error:", error);
        if (error.name === "JsonWebTokenError") {
            res.status(401).json({ message: "Invalid authorization token" });
        } else {
            res.status(500).json({ message: "Internal server error" });
        }
    }
};

export const deleteUser = async (req, res) => {
    try {
        const userId = req.params.id;

        // Delete documents associated with the user
        await Hive.deleteMany({ userId });
        await Swarm.deleteMany({ userId });
        await Inspection.deleteMany({ userId });
        await Inventory.deleteMany({ userId });
        await Todo.deleteMany({ userId });
        await Harvest.deleteMany({ userId });

        // Delete user
        await User.findByIdAndDelete(userId);

        res.status(200).send({ message: 'User and associated documents deleted successfully' });
    } catch (error) {
        console.error('Error deleting user and associated documents:', error);
        res.status(500).send({ error: 'Error deleting user and associated documents' });
    }
};

export const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { apiaryName, username, zipcode, apiaryImage } = req.body;

        // Retrieve the current user data
        const currentUser = await User.findById(id);

        // Check if the user with the given ID exists
        if (!currentUser) {
            return res.status(404).json({ message: "User not found" });
        }

        // Update only the provided fields
        const updatedFields = {};
        if (apiaryName) {
            updatedFields.apiaryName = apiaryName;
        }
        if (username) {
            updatedFields.username = username;
        }
        if (zipcode) {
            updatedFields.zipcode = zipcode;
        }
        if (apiaryImage) {
            updatedFields.apiaryImage = apiaryImage;
        }

        // Update the user with the modified fields
        const updatedUser = await User.findByIdAndUpdate(id, updatedFields, { new: true });
        res.status(200).json({ message: "User updated successfully", user: updatedUser });
    } catch (error) {
        console.error("Updating user error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

// Login With Google Auth
// export const loginUser = async (req, res) => {
//     try {
//         const { email, password, googleOAuthToken } = req.body;

//         if (googleOAuthToken) {
//             // Handle Google OAuth login
//             const ticket = await client.verifyIdToken({
//                 idToken: googleOAuthToken,
//                 audience: process.env.GOOGLE_CLIENT_ID, // Your Google OAuth client ID
//             });
//             const payload = ticket.getPayload();
//             const googleEmail = payload.email;

//             // Check if the user with this googleEmail exists in your database
//             let user = await User.findOne({ email: googleEmail });

//             if (!user) {
//                 // Create a new user if not found
//                 user = await User.create({
//                     email: googleEmail,
//                     // Additional user properties as needed
//                 });
//             }

//             // Generate JWT token for the user
//             const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });

//             return res.status(200).send({
//                 message: `${user.apiaryName || 'User'} is logged in via Google OAuth.`,
//                 user,
//                 token,
//             });
//         }

//         // Handle email/password login
//         if (!email || !password) {
//             return res.status(400).send({ message: "Both email and password are required." });
//         }

//         const user = await User.findOne({ email });
//         if (!user) {
//             return res.status(404).send({ message: "User is not registered." });
//         }

//         const isMatch = await bcrypt.compare(password, user.password);
//         if (!isMatch) {
//             return res.status(401).send({ message: "Invalid credentials." });
//         }

//         // Generate JWT token for the user
//         const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });

//         res.status(200).send({
//             message: `${user.apiaryName || 'User'} is logged in.`,
//             user,
//             token,
//         });
//     } catch (error) {
//         console.error("Login error:", error);
//         res.status(500).send({ message: "An error occurred during login." });
//     }
// };



