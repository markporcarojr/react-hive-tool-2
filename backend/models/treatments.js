import mongoose from "mongoose";
const Schema = mongoose.Schema;

// Schema
const treatmentSchema = new Schema({
    hiveNumber: {
        type: Number,
        required: true
    },

    treatmentType: {
        type: String,
        required: true
    },

    treatmentDate: {
        type: String,
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
},
    {
        timestamps: true,
    }

);



export const Treatment = mongoose.model('Treatment', treatmentSchema);
