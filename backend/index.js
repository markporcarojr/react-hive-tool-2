// index.js
import express from "express";
import connectDB from "../backend/config/db.js"
import cors from "cors";
import dotenv from 'dotenv';
dotenv.config();

import hiveRoutes from "./routes/hiveRoutes.js";
import inspectionRoutes from "./routes/inspectionRoutes.js";
import inventoryRoutes from "./routes/inventoryRoutes.js";
import treatmentRoutes from "./routes/treatmentRoutes.js";
import harvestRoutes from "./routes/harvestRoutes.js";
import swarmRoutes from "./routes/swarmRoutes.js";
import feedRoutes from "./routes/feedRoutes.js";
import userRoutes from "./routes/userRoutes.js"

const app = express();
const PORT = process.env.PORT || 5555;
connectDB();

// ****************************************  MiddleWare  **************************************

app.use(express.json());
app.use(cors());
// app.get('/', (request, response) => {
//     response.send("Welcome!!");
// });

// ****************************************  Routes  **************************************

app.use('/new-hive', hiveRoutes);
app.use('/inspections', inspectionRoutes);
app.use('/inventory', inventoryRoutes);
app.use('/treatments', treatmentRoutes);
app.use('/harvest', harvestRoutes);
app.use('/swarm', swarmRoutes);
app.use('/feed', feedRoutes);
app.use('/user', userRoutes)

app.listen(PORT, () => {
    console.log(`Listening on port: ${PORT}`);
});

