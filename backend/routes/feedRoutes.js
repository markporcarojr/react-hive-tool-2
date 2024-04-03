import express from "express";
import { createFeed, getFeed, getFeeds, updateFeed, deleteFeed } from "../controllers/feedController.js"

const router = express.Router();

router.post('/', createFeed);
router.get('/', getFeeds);
router.get('/:id', getFeed);
router.put('/:id', updateFeed);
router.delete('/:id', deleteFeed);


export default router;