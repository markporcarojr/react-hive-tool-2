import mongoose from "mongoose";
const Schema = mongoose.Schema;

// Schema
const feedSchema = new Schema({
    hiveNumber: {
        type: Number,
        required: true
    },
    feed: {
        type: String,
        required: true
    },

    feedDate: {
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
        timestamps: true
    }
);



export const Feed = mongoose.model('Feed', feedSchema);
