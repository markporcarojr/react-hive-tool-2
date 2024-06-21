// NotificationController.js
import nodemailer from 'nodemailer';
import cron from 'node-cron';

let reminders = [];

// Set up nodemailer transporter
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.MY_GMAIL,
        pass: process.env.MY_GMAIL_PASSWORD,
    },
});

export const setReminder = (req, res) => {
    const { email, interval, message } = req.body;

    // Validate the input
    if (!email || !interval || !message) {
        return res.status(400).json({ error: "All fields are required" });
    }

    try {
        const reminder = { email, interval, message };
        reminders.push(reminder);

        // Schedule the reminder
        cron.schedule(`0 0 */${interval} * *`, () => {
            const mailOptions = {
                from: process.env.MY_GMAIL,
                to: email,
                subject: 'Reminder',
                text: message,
            };

            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.error("Error sending email:", error);
                    return;
                }
                console.log('Reminder sent: %s', info.messageId);
            });
        });

        res.json({ message: 'Reminder set successfully' });
    } catch (error) {
        console.error("Error setting reminder:", error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
