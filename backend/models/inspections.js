import mongoose from 'mongoose';
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
    inspectionDate: {
        type: String,
        required: true
    },
    inspectionImage: {
        type: String,
        required: false
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
    feeding: {
        type: String,
        required: false
    },
    treatments: {
        type: String,
        required: false
    },
    inspectionNote: {
        type: String,
        required: false
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    hiveId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Hive',
        required: true
    },
    weatherCondition: {
        type: String,
        required: false
    },
    weatherTemp: {
        type: String,
        required: false
    },
},
    {
        timestamps: true,
    }


);



export const Inspection = mongoose.model('Inspection', inspectionSchema);
