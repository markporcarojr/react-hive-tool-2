//userController.js

import { User } from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';

export const getUsers = async (req, res) => {
    try {
        const users = await User.find({});
        if (!users) {
            return res.send({
                message: "no users were found."
            })
        }
        return res.send({
            userCount: users.length,
            users
        })

    } catch (error) {
        console.log(error);
        return res.send({
            message: 'getting all users callback error',
            error,
        })
    }

};

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
            message: `${user.apiaryName} is logged in.`,
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
        const { email, password, apiaryName } = req.body;
        if (!email || !password || !apiaryName) {
            return res.send({
                message: 'all fields are required'
            })
        }
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.send({
                message: "user is already registered.",
            })
        }
        const hashedPassword = await bcrypt.hash(password, 12);
        const user = new User({ email, apiaryName, password: hashedPassword })
        await user.save();
        return res.send({
            message: "user was registered successfully.",
            user,
        })

    }
    catch (error) {
        console.log(error);
        return res.send({
            message: "registering a user callback error.",
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
        const { id } = req.params;
        const user = await User.findByIdAndDelete(id);
        if (user) {
            return res.send({
                message: "User was deleted successfully.",
                user,
            })
        }
    } catch (error) {
        console.log(error);
        return res.send({
            message: "Deleting a user callback error.",
            error,
        })
    }
};


export const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { apiaryName, userName } = req.body;

        // Check if apiaryName, userName is provided in the request body
        if (!apiaryName || !userName) {
            return res.status(400).json({ message: "Apiary Name and Username are required" });
        }

        // Update the user's apiaryName, userName
        const updatedUser = await User.findByIdAndUpdate(id, { apiaryName, userName }, { new: true });

        // Check if user with the given ID exists
        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({ message: "User updated successfully", user: updatedUser });
    } catch (error) {
        console.error("Updating user error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};


