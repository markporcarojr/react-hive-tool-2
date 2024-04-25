import { Swarm } from "../models/swarm.js"

export const createSwarm = async (req, res) => {
    try {
        const { swarmNumber, swarmDate, location, userId, swarmImage } = req.body;
        if (
            !swarmNumber ||
            !location ||
            !swarmDate

        ) {
            return res.status(400).send({
                message: "Fill out all required fields"
            });
        }

        const newSwarm = {
            swarmNumber,
            location,
            swarmDate,
            userId,
            swarmImage

        };
        const swarm = await Swarm.create(newSwarm);

        return res.status(201).send(swarm);
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message })
    }
}
export const getSwarms = async (req, res) => {
    try {
        const userId = req.query.userId;
        const swarms = await Swarm.find({ userId });

        return res.status(200).json(swarms);
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }
}
export const getSwarm = async (req, res) => {
    try {

        const { id } = req.params;

        const swarm = await Swarm.findById(id);

        return res.status(200).json(swarm);
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }
}
export const updateSwarm = async (req, res) => {
    try {
        if (!req.body.swarmNumber ||
            !req.body.location ||
            !req.body.swarmDate

        ) {
            return res.status(400).send({
                message: "Fill out all required fields",
            });
        }

        const { id } = req.params;
        const result = await Swarm.findByIdAndUpdate(id, req.body);

        if (!result) {
            return res.status(404).json({ message: 'Swarm not found' })
        }

        return res.status(200).send({ message: "Swarm updated Successfully" })

    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message })
    }
}
export const deleteSwarm = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await Swarm.findByIdAndDelete(id);

        if (!result) {
            return res.status(404).json({ message: "Swarm not found" });
        }
        return res.status(200).send({ message: "Swarm Deleted Successfully" })
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message })
    }
}