import mongoose from "mongoose";
const Schema = mongoose.Schema;

// Schema
const harvestSchema = new Schema({
    harvestType: {
        type: String,
        required: true
    },

    harvestAmount: {
        type: Number,
        required: true
    },

    harvestDate: {
        type: String,
        required: true
    },
    // userId: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'User', // Assuming your user model is named 'User'
    //     required: true
    // }
},
    {
        timestamps: true,
    }
);



export const Harvest = mongoose.model('Harvest', harvestSchema);
