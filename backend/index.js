import express from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
// import Hive from "./models/hive.js";
import hiveRoutes from './routes/hiveRoutes.js'
import cors from "cors";

const app = express();

// ****************************************  MiddleWare  **************************************

// MiddleWare for parsing request body
app.use(express.json());

// Middleware for handling CORS Policy
// Option 1: Allow all origins with default(*)
app.use(cors());
// Option 2: Allow Custom Origins
// app.use(cors({
//     origin: "http://localhost3000",
//     methods: ["GET", "PUT", "POST", "DElETE"],
//     allowedHeaders: ["Cntent-Type"],
// }))

app.get('/', (request, response) => {
    console.log(request)
    return response.status(234).send("Welcome!!")
});

app.use('/new-hive', hiveRoutes)

mongoose
    .connect(mongoDBURL)
    .then(() => {
        console.log("Connected to mongoDB");
        app.listen(PORT, () => {
            console.log(`Listening on port: ${PORT}`);
        });
    })
    .catch((error) => {
        console.log(error)
    })