import express from "express";
import { createHarvest, getHarvest, getHarvests, updateHarvest, deleteHarvest } from "../controllers/harvestController.js";

const router = express.Router();

router.post('/', createHarvest);
router.get('/', getHarvests);
router.get('/:id', getHarvest);
router.put('/:id', updateHarvest);
router.delete('/:id', deleteHarvest);


export default router;