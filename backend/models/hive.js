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
        queenColor: {
            type: String,
            required: false
        },
        queenAge: {
            type: String,
            required: false
        },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        // inspections: [{ type: Schema.Types.ObjectId, ref: 'Inspection' }],
        // feeds: [{ type: Schema.Types.ObjectId, ref: 'Feed' }],
        // treatments: [{ type: Schema.Types.ObjectId, ref: 'Treatment' }]
    },
    {
        timestamps: true,
    }
);



export const Hive = mongoose.model('Hive', hiveSchema);
