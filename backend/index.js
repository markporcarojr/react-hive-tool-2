// index.js
import express from "express";
import connectDB from "../backend/config/db.js"
import cors from "cors";
import dotenv from 'dotenv';
import session from 'express-session';
import passport from "passport";

import hiveRoutes from "./routes/hiveRoutes.js";
import inspectionRoutes from "./routes/inspectionRoutes.js";
import inventoryRoutes from "./routes/inventoryRoutes.js";
import treatmentRoutes from "./routes/treatmentRoutes.js";
import harvestRoutes from "./routes/harvestRoutes.js";
import swarmRoutes from "./routes/swarmRoutes.js";
import feedRoutes from "./routes/feedRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import authRoutes from './routes/authRoutes.js'
import userDataRoutes from "./routes/userDataRoutes.js"

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5555;
connectDB();

// ****************************************  MiddleWare  **************************************

app.use(express.json());
app.use(
    cors({
        origin: "http://localhost:5173",
        methods: "GET, POST, PUT, DELETE",
        credentials: true,
    })
);

app.use(
    session({
        name: 'session',
        secret: process.env.SESSION_SECRET_KEY,
        resave: false,
        saveUninitialized: false,
        cookie: {
            maxAge: 24 * 60 * 60 * 1000,
            httpOnly: true,
            secure: false,
        },
    })
);


app.use(passport.initialize());
app.use(passport.session());

// ****************************************  Routes  **************************************

app.use('/new-hive', hiveRoutes);
app.use('/inspections', inspectionRoutes);
app.use('/inventory', inventoryRoutes);
app.use('/treatments', treatmentRoutes);
app.use('/harvest', harvestRoutes);
app.use('/swarm', swarmRoutes);
app.use('/feed', feedRoutes);
app.use('/user', userRoutes);
app.use('/auth', authRoutes);
app.use('/user-data', userDataRoutes);


app.listen(PORT, () => {
    console.log(`Listening on port: ${PORT}`);
});

