import express from "express";
import { Inspection } from "../models/inspections.js";

const router = express.Router();

// Route to create an Inspection
router.post('/', async (req, res) => {
    try {
        if (
            !req.body.hiveNumber ||
            !req.body.temperament ||
            !req.body.hiveStrength ||
            !req.body.queen ||
            !req.body.queenCell ||
            !req.body.brood ||
            !req.body.disease ||
            !req.body.eggs ||
            !req.body.pests ||
            !req.body.inspectionDate ||
            !req.body.inspectionNote ||
            // userId here

        ) {
            return res.status(400).send({
                message: "Send all required fields"
            });
        }

        const newHive = {
            hiveNumber: req.body.hiveNumber,
            temperament: req.body.temperament,
            hiveStrength: req.body.hiveStrength,
            queen: req.body.queen,
            queenCell: req.body.queenCell,
            brood: req.body.brood,
            disease: req.body.disease,
            pests: req.body.pests,
            eggs: req.body.eggs,
            inspectionDate: req.body.inspectionDate,
            inspectionNote: req.body.inspectionNote,

        };
        const inspection = await Inspection.create(newInspection);

        return res.status(201).send(inspection);
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message })
    }
})

// Route to all Inspections
router.get('/', async (req, res) => {
    try {
        const inspections = await Inspection.find({});

        return res.status(200).json(inspections);
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }
})

// Route for getting hive by ID
router.get('/:id', async (req, res) => {
    try {

        const { id } = req.params;

        const inspection = await Inspection.findById(id);

        return res.status(200).json(inspection);
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }
})

// Route to update Hive
router.put("/:id", async (req, res) => {
    try {
        if (!req.body.hiveNumber ||
            !req.body.breed ||
            !req.body.hiveStrength ||
            !req.body.hiveDate

        ) {
            return res.status(400).send({
                message: "Must fill out all required fields",
            });
        }

        const { id } = req.params;
        const result = await Hive.findByIdAndUpdate(id, req.body);

        if (!result) {
            return res.status(404).json({ message: 'Hive not found' })
        }

        return res.status(200).send({ message: "Hive updated Successfully" })

    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message })
    }
})

// Route to Delete a hive
router.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const result = await Inspection.findByIdAndDelete(id);

        if (!result) {
            return res.status(404).json({ message: "Inspection not found" });
        }
        return res.status(200).send({ message: "Inspection Deleted Successfully" })
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message })
    }
})

export default router;