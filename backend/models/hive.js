import mongoose from 'mongoose';
const Schema = mongoose.Schema;

// Schema
const hiveSchema = new Schema(
    {
        hiveNumber: {
            type: Number,
            required: true
        },
        breed: {
            type: String,
            required: false
        },
        hiveStrength: {
            type: Number,
            required: true
        },
        hiveDate: {
            type: String,
            required: true
        },
        // userId: {
        //     type: mongoose.Schema.Types.ObjectId,
        //     ref: 'User',
        //     required: true
        // },
    },
    {
        timestamps: true,
    }
);



export const Hive = mongoose.model('Hive', hiveSchema);
