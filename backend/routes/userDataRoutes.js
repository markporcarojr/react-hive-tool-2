// userDataRoutes.js
import { Inspection } from '../models/inspections.js';
import { Feed } from '../models/feed.js';
import { Treatment } from '../models/treatments.js';
import express from 'express';

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const hiveId = req.query.hiveId;


        const userInspections = await Inspection.find({ hiveId });
        const userFeeds = await Feed.find({ hiveId });
        const userTreatments = await Treatment.find({ hiveId });


        res.json({ userInspections, userFeeds, userTreatments });
    } catch (error) {

        console.error('Error fetching user data:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});




export default router;
