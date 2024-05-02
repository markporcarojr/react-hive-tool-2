// index.js
import express from "express";
import connectDB from "../backend/config/db.js"
import cors from "cors";
import dotenv from 'dotenv';
import session from 'express-session';

import hiveRoutes from "./routes/hiveRoutes.js";
import inspectionRoutes from "./routes/inspectionRoutes.js";
import inventoryRoutes from "./routes/inventoryRoutes.js";
import harvestRoutes from "./routes/harvestRoutes.js";
import swarmRoutes from "./routes/swarmRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import authRoutes from './routes/authRoutes.js'
import todoRoutes from './routes/todoRoutes.js'

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5555;
connectDB();

// ****************************************  MiddleWare  **************************************

app.use(express.json());
app.use(
    cors({
        origin: "http://localhost:5173",
        methods: "GET, POST, PUT, DELETE, PATCH",
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


// ****************************************  Routes  **************************************

app.use('/new-hive', hiveRoutes);
app.use('/inspections', inspectionRoutes);
app.use('/inventory', inventoryRoutes);
app.use('/harvest', harvestRoutes);
app.use('/swarm', swarmRoutes);
app.use('/user', userRoutes);
app.use('/auth', authRoutes);
app.use('/todo', todoRoutes);


app.listen(PORT, () => {
    console.log(`Listening on port: ${PORT}`);
});

