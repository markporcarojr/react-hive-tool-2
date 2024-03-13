// index.js
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import dotenv from 'dotenv';

import hiveRoutes from "./routes/hiveRoutes.js";
import inspectionRoutes from "./routes/inspectionRoutes.js";
import inventoryRoutes from "./routes/inventoryRoutes.js";
import treatmentRoutes from "./routes/treatmentRoutes.js";
import harvestRoutes from "./routes/harvestRoutes.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: `${__dirname}/../.env` });

const app = express();
const PORT = process.env.PORT || 5555; // Use environment variable or default to 5555
const MONGODB_URL = process.env.MONGODB_URL;

// ****************************************  MiddleWare  **************************************

// MiddleWare for parsing request body
app.use(express.json());

// Middleware for handling CORS Policy
app.use(cors());

app.get('/', (request, response) => {
    return response.status(234).send("Welcome!!");
});

// Middleware for the routes
app.use('/new-hive', hiveRoutes);
app.use('/inspections', inspectionRoutes);
app.use('/inventory', inventoryRoutes);
app.use('/treatments', treatmentRoutes);
app.use('/harvest', harvestRoutes);

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
