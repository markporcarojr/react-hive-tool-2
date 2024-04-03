import express from "express";
import { createInspection, getInspection, getInspections, updateInspection, deleteInspection } from "../controllers/inspectionController.js";

const router = express.Router();

router.post('/', createInspection);
router.get('/', getInspections);
router.get('/:id', getInspection);
router.put('/:id', updateInspection);
router.delete('/:id', deleteInspection);


export default router;