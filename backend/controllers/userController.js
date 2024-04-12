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
        const refreshToken = jwt.sign({ userId: user._id }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '7d' });
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        return res.send({
            message: `${user.email} is logged in.`,
            user,
            token,
            refreshToken,
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
        const user = new User({ email, username, password: hashedPassword })
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
        const token = req.header('Authorization').replace('Bearer ', '');
        console.log('Received Token:', token); // Log the received token

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log('Decoded Token:', decoded); // Log the decoded token

        const user = await User.findById(decoded.userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ user });
    } catch (error) {
        console.error('Fetch user error:', error);
        res.status(500).json({ message: 'Internal server error' });
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
        const { apiaryName, email, password } = req.body;
        const user = await User.findByIdAndUpdate(id, req.body, { new: true });
        return res.send({
            message: "User was updated successfully.",
            user,
        })
    }
    catch (error) {
        console.log(error);
        return res.send({
            message: "updating a user callback error.",
            error,
        })
    }
};

export const refresh = async (req, res) => {
    const refreshToken = req.body.refreshToken;

    if (!refreshToken) {
        return res.status(401).send({ message: 'Refresh token not provided.' });
    }

    try {
        // Verify the refresh token
        const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);

        // Check if the decoded token contains the required user information (e.g., user ID)
        if (!decoded.userId) {
            return res.status(401).send({ message: 'Invalid refresh token.' });
        }

        // Generate a new access token
        const accessToken = jwt.sign({ userId: decoded.userId }, process.env.JWT_SECRET, { expiresIn: '1h' });

        // Send the new access token to the client
        return res.send({ accessToken });
    } catch (error) {
        console.error('Error refreshing token:', error);
        return res.status(401).send({ message: 'Invalid refresh token.' });
    }
};