import { Feed } from "../models/feed.js";

export const createFeed = async (req, res) => {
    try {
        const { feed, feedDate, userId, hiveId, hiveNumber } = req.body;
        if (
            !hiveId ||
            !feed ||
            !feedDate ||
            !hiveNumber

        ) {
            return res.status(400).send({
                message: "Fill out all required fields"
            });
        }

        const newFeed = {
            hiveNumber,
            feed,
            feedDate,
            userId,
            hiveId

        };
        const feeding = await Feed.create(newFeed);

        return res.status(201).send(feeding);
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message })
    }
};

export const getFeeds = async (req, res) => {
    try {
        const userId = req.query.userId;
        const feeds = await Feed.find({ userId });

        return res.status(200).json(feeds);
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }
};

export const getFeed = async (req, res) => {
    try {

        const { id } = req.params;

        const feed = await Feed.findById(id);

        return res.status(200).json(feed);
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }
};

export const updateFeed = async (req, res) => {
    try {
        if (
            !req.body.feed ||
            !req.body.feedDate

        ) {
            return res.status(400).send({
                message: "Fill out all required fields",
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
}

export const deleteFeed = async (req, res) => {
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
}

