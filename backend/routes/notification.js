// Import the sendSMS function from notifications.js
import { sendSMS } from "../notifications.js"

// Example route handler that sends an SMS notification
app.post('/send-notification', async (req, res) => {
    const { phoneNumber, message } = req.body;

    try {
        await sendSMS(phoneNumber, message);
        res.status(200).send('SMS notification sent successfully');
    } catch (error) {
        res.status(500).send('Failed to send SMS notification');
    }
});
