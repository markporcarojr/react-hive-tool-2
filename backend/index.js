// index.js
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from 'dotenv';

import hiveRoutes from "./routes/hiveRoutes.js";
import inspectionRoutes from "./routes/inspectionRoutes.js";
import inventoryRoutes from "./routes/inventoryRoutes.js";
import treatmentRoutes from "./routes/treatmentRoutes.js";
import harvestRoutes from "./routes/harvestRoutes.js";
import swarmRoutes from "./routes/swarmRoutes.js";
import feedRoutes from "./routes/feedRoutes.js";
dotenv.config();


const app = express();
const PORT = process.env.PORT || 5555; // Use environment variable or default to 5555
const MONGODB_URL = process.env.MONGODB_URL;

// ****************************************  MiddleWare  **************************************

// MiddleWare for parsing request body
app.use(express.json());

// Middleware for handling CORS Policy
app.use(cors());

app.get('/', (request, response) => {
    response.send("Welcome!!");
});

// ****************************************  Routes  **************************************

// Route Definition
app.use('/new-hive', hiveRoutes);
app.use('/inspections', inspectionRoutes);
app.use('/inventory', inventoryRoutes);
app.use('/treatments', treatmentRoutes);
app.use('/harvest', harvestRoutes);
app.use('/swarm', swarmRoutes);
app.use('/feed', feedRoutes);

mongoose
    .connect(MONGODB_URL)
    .then(() => {
        console.log("Connected to MongoDB");
        app.listen(PORT, () => {
            console.log(`Listening on port: ${PORT}`);
        });
    })
    .catch((error) => {
        console.log(error)
    });
