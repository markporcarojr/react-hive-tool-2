import express from "express";
import { Feed } from "../models/feed.js";

const router = express.Router();

// Route to create a Feeding
router.post('/', async (req, res) => {
    try {
        if (
            !req.body.hiveNumber ||
            !req.body.feed ||
            !req.body.feedDate

        ) {
            return res.status(400).send({
                message: "Send all required fields"
            });
        }

        const newFeed = {
            hiveNumber: req.body.hiveNumber,
            feed: req.body.feed,
            feedDate: req.body.feedDate,

        };
        const feed = await Feed.create(newFeed);

        return res.status(201).send(feed);
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message })
    }
})

// Route to all Feedings
router.get('/', async (req, res) => {
    try {
        const feeds = await Feed.find({});

        return res.status(200).json(feeds);
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }
})

// Route for getting Feeding by ID
router.get('/:id', async (req, res) => {
    try {

        const { id } = req.params;

        const feed = await Feed.findById(id);

        return res.status(200).json(feed);
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }
})

// Route to update Feeding
router.put("/:id", async (req, res) => {
    try {
        if (!req.body.hiveNumber ||
            !req.body.feed ||
            !req.body.feedDate

        ) {
            return res.status(400).send({
                message: "Must fill out all required fields",
            });
        }

        const { id } = req.params;
        const result = await Feed.findByIdAndUpdate(id, req.body);

        if (!result) {
            return res.status(404).json({ message: 'Feeding not found' })
        }

        return res.status(200).send({ message: "Feeding updated Successfully" })

    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message })
    }
})

// Route to Delete a Feeding
router.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const result = await Feed.findByIdAndDelete(id);

        if (!result) {
            return res.status(404).json({ message: "Feeding not found" });
        }
        return res.status(200).send({ message: "Feeding Deleted Successfully" })
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message })
    }
})

export default router;