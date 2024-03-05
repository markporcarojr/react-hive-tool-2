const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Schema
const inspectionSchema = new Schema({

    hiveNumber: {
        type: Number,
        required: true
    },

    temperament: {
        type: String,
        required: true
    },
    hiveStrength: {
        type: Number,
        required: true
    },
    queen: {
        type: String,
        required: false
    },
    queenCell: {
        type: String,
        required: false
    },
    brood: {
        type: String,
        required: false
    },
    disease: {
        type: String,
        required: false
    },
    eggs: {
        type: String,
        required: false
    },
    pests: {
        type: String,
        required: false
    },
    inspectionDate: {
        type: String,
        required: true
    },
    inspectionNote: {
        type: String,
        required: false
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Assuming your user model is named 'User'
        required: true
    }

},
    {
        timestamps: true,
    }


);



export const Inspection = mongoose.model('Inspection', inspectionSchema);
