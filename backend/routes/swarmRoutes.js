import express from "express";
import { createSwarm, getSwarm, getSwarms, updateSwarm, deleteSwarm } from "../controllers/swarmController.js";
const router = express.Router();

router.post('/', createSwarm);
router.get('/', getSwarms);
router.get('/:id', getSwarm);
router.put('/:id', updateSwarm);
router.delete('/:id', deleteSwarm);


export default router;