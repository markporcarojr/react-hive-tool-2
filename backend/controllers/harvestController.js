import { Harvest } from "../models/harvest.js"

export const createHarvest = async (req, res) => {
    try {
        if (
            !req.body.harvestAmount ||
            !req.body.harvestType ||
            !req.body.harvestDate

        ) {
            return res.status(400).send({
                message: "Fill out all required fields"
            });
        }

        const newHarvest = {
            harvestAmount: req.body.harvestAmount,
            harvestType: req.body.harvestType,
            harvestDate: req.body.harvestDate,

        };
        const harvest = await Harvest.create(newHarvest);

        return res.status(201).send(harvest);
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message })
    }
}
export const getHarvests = async (req, res) => {
    try {
        const harvests = await Harvest.find({});

        return res.status(200).json(harvests);
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }
}
export const getHarvest = async (req, res) => {
    try {

        const { id } = req.params;

        const harvest = await Harvest.findById(id);

        return res.status(200).json(harvest);
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }
}
export const updateHarvest = async (req, res) => {
    try {
        if (!req.body.harvestAmount ||
            !req.body.harvestType ||
            !req.body.harvestDate

        ) {
            return res.status(400).send({
                message: "Fill out all required fields",
            });
        }

        const { id } = req.params;
        const result = await Harvest.findByIdAndUpdate(id, req.body);

        if (!result) {
            return res.status(404).json({ message: 'Harvest not found' })
        }

        return res.status(200).send({ message: "Harvest updated Successfully" })

    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message })
    }
}
export const deleteHarvest = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await Harvest.findByIdAndDelete(id);

        if (!result) {
            return res.status(404).json({ message: "Harvest not found" });
        }
        return res.status(200).send({ message: "Harvest Deleted Successfully" })
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message })
    }
}