// index.js
import express from "express";
import connectDB from "../backend/config/db.js"
import cors from "cors";
import dotenv from 'dotenv';
import session from 'express-session';
import MongoStore from "connect-mongo";

import hiveRoutes from "./routes/hiveRoutes.js";
import inspectionRoutes from "./routes/inspectionRoutes.js";
import inventoryRoutes from "./routes/inventoryRoutes.js";
import harvestRoutes from "./routes/harvestRoutes.js";
import swarmRoutes from "./routes/swarmRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import authRoutes from './routes/authRoutes.js'
import todoRoutes from './routes/todoRoutes.js'
import notificationRoutes from "./routes/notificationRoutes.js"

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5555;
const store = MongoStore.create({
    mongoUrl: process.env.MONGODB_URI,
    touchAfter: 24 * 60 * 60,
    crypto: {
        secret: process.env.SESSION_SECRET_KEY
    }
})

connectDB();

// ****************************************  MiddleWare  **************************************

app.use(express.json());
app.use(
    cors({
        origin: ["https://hive-tool.netlify.app", "https://api.openweathermap.org", "http://localhost:5173"],
        methods: "GET, POST, PUT, DELETE, PATCH",
        credentials: true,
    })
);

app.use(session({
    store,
    secret: process.env.SESSION_SECRET_KEY,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 24 * 60 * 60 * 1000, // 1 day
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
    }
}));

// ****************************************  Routes  **************************************

app.use('/new-hive', hiveRoutes);
app.use('/inspections', inspectionRoutes);
app.use('/inventory', inventoryRoutes);
app.use('/harvest', harvestRoutes);
app.use('/swarm', swarmRoutes);
app.use('/user', userRoutes);
app.use('/auth', authRoutes);
app.use('/todo', todoRoutes);
app.use('/api', notificationRoutes);

app.listen(PORT, () => {
    console.log(`Listening on port: ${PORT}`);
});

