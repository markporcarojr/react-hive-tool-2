// NotificationRoutes.js
import express from 'express';
import { setReminder } from '../controllers/notificationController.js';

const router = express.Router();

router.post('/set-reminder', setReminder);

export default router;
