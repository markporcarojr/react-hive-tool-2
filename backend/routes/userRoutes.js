// userRoutes.js

import express from "express";
import { loginUser, registerUser, getUser, deleteUser, updateUser } from "../controllers/userController.js";

const router = express.Router();

router.get("/", getUser);
router.post("/login", loginUser);
router.post("/register", registerUser);
router.patch("/update/:id", updateUser)
router.delete("/delete/:id", deleteUser)

export default router;