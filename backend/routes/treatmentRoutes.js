import express from "express";
import { createTreatment, getTreatment, getTreatments, updateTreatment, deleteTreatment } from "../controllers/treatmentController.js";
const router = express.Router();

router.post('/', createTreatment);
router.get('/', getTreatments);
router.get('/:id', getTreatment);
router.put('/:id', updateTreatment);
router.delete('/:id', deleteTreatment);


export default router;