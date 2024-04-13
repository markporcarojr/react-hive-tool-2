// userDataRoutes.js
import { Inspection } from '../models/inspections.js';
import express from 'express';

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const hiveId = req.query.hiveId;


        const userInspections = await Inspection.find({ hiveId });

        res.json({ userInspections });
    } catch (error) {

        console.error('Error fetching user data:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Map out Objects on backend


export default router;
