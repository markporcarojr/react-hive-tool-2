import { Inspection } from "../models/inspections.js";

export const createInspection = async (req, res) => {
    try {
        const { hiveNumber, hiveStrength, temperament, inspectionDate, userId, queen, queenCell, disease, pests, eggs, inspectionNote, brood, hiveId } = req.body;

        if (
            !hiveId ||
            !hiveNumber ||
            !temperament ||
            hiveStrength == null ||
            !inspectionDate
        ) {
            return res.status(400).send({
                message: "Fill out all required fields"
            });
        }

        const newInspection = {
            hiveId,
            hiveNumber,
            hiveStrength,
            temperament,
            inspectionDate,
            userId,
            queen,
            queenCell,
            disease,
            pests,
            eggs,
            inspectionNote,
            brood,

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
        const userId = req.query.userId;
        const inspections = await Inspection.find({ userId });

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
            !req.body.temperament ||
            req.body.hiveStrength == null ||
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