import { Hive } from "../models/hive.js";


export const createHive = async (req, res) => {
    try {
        const { hiveNumber, breed, hiveStrength, hiveDate, userId, queenColor, queenAge, hiveSource, hiveImage, queenExcluder, superBoxes, broodBoxes, frames } = req.body;

        if (!hiveNumber || !breed || hiveStrength == null || !hiveDate) {
            return res.status(400).send({
                message: "Fill out all required fields"
            });
        }

        const newHive = new Hive({
            hiveNumber,
            breed,
            frames,
            hiveStrength,
            hiveDate,
            hiveSource,
            userId,
            queenColor,
            queenAge,
            queenExcluder,
            superBoxes,
            broodBoxes,
            hiveImage
        });

        const hive = await newHive.save();

        return res.status(201).send(hive);
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }
};
export const getHives = async (req, res) => {
    try {
        const userId = req.query.userId;
        const hives = await Hive.find({ userId });

        return res.status(200).json(hives);
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }
};
export const getHive = async (req, res) => {
    try {

        const { id } = req.params;

        const hive = await Hive.findById(id);

        return res.status(200).json(hive);
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }
};
export const checkHiveNumber = async (req, res) => {
    const { userId, hiveNumber } = req.query;

    try {
        const hive = await Hive.findOne({ userId, hiveNumber });
        if (hive) {
            res.json({ exists: true });
        } else {
            res.json({ exists: false });
        }
    } catch (error) {
        console.error('Error checking hive number:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
export const updateHive = async (req, res) => {
    try {
        if (!req.body.hiveNumber ||
            !req.body.breed ||
            req.body.hiveStrength == null ||
            !req.body.hiveDate ||
            !req.body.hiveSource

        ) {
            return res.status(400).send({
                message: "Fill out all required fields",
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
};
export const deleteHive = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await Hive.findByIdAndDelete(id);

        if (!result) {
            return res.status(404).json({ message: "Hive not found" });
        }
        return res.status(200).send({ message: "Hive Deleted Successfully" })
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message })
    }
};

