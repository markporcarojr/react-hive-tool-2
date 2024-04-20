import mongoose from 'mongoose';
const Schema = mongoose.Schema;

// Schema
const hiveSchema = new Schema(
    {
        hiveDate: {
            type: String,
            required: true
        },
        hiveNumber: {
            type: Number,
            required: true
        },
        hiveSource: {
            type: String,
            required: true
        },
        hiveImage: {
            type: String,
            required: false
        },
        hiveStrength: {
            type: Number,
            required: true
        },
        queenColor: {
            type: String,
            required: false
        },
        queenAge: {
            type: String,
            required: false
        },
        breed: {
            type: String,
            required: false
        },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
    },
    {
        timestamps: true,
    }
);



export const Hive = mongoose.model('Hive', hiveSchema);
