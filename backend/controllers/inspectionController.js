import { Inspection } from "../models/inspections.js";

export const createInspection = async (req, res) => {
    try {
        if (
            !req.body.hiveNumber ||
            !req.body.temperament ||
            !req.body.hiveStrength ||
            !req.body.inspectionDate
        ) {
            return res.status(400).send({
                message: "Fill out all required fields"
            });
        }

        const newInspection = {
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
}
export const getInspections = async (req, res) => {
    try {
        const inspections = await Inspection.find({});

        return res.status(200).json(inspections);
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }
}
export const getInspection = async (req, res) => {
    try {

        const { id } = req.params;

        const inspection = await Inspection.findById(id);

        return res.status(200).json(inspection);
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }
}
export const updateInspection = async (req, res) => {
    try {
        if (
            !req.body.hiveNumber ||
            !req.body.temperament ||
            !req.body.hiveStrength ||
            !req.body.inspectionDate

        ) {
            return res.status(400).send({
                message: "Fill out all required fields"
            });
        }

        const { id } = req.params;
        const result = await Inspection.findByIdAndUpdate(id, req.body);

        if (!result) {
            return res.status(404).json({ message: 'Inspection not found' })
        }

        return res.status(200).send({ message: "Inspection updated Successfully" })

    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message })
    }
}
export const deleteInspection = async (req, res) => {
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
}