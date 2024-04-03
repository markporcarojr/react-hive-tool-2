import express from "express";
import { createHive, getHive, getHives, updateHive, deleteHive } from "../controllers/hiveController.js";

const router = express.Router();

router.post('/', createHive);
router.get('/', getHives);
router.get('/:id', getHive);
router.put('/:id', updateHive);
router.delete('/:id', deleteHive);

export default router;