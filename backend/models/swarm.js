import mongoose from "mongoose";
const Schema = mongoose.Schema;

// Schema
const swarmSchema = new Schema({
    swarmNumber: {
        type: Number,
        required: true
    },

    location: {
        type: String,
        required: true
    },

    swarmDate: {
        type: String,
        required: true
    },
    // userId: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'User', 
    //     required: true
    // }

},

    {
        timestamps: true,
    }

);

export const Swarm = mongoose.model('Swarm', swarmSchema);
