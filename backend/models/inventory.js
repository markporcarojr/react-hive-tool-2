import mongoose from "mongoose";
const Schema = mongoose.Schema;

// Schema
const inventorySchema = new Schema({

    inventoryType: {
        type: String,
        required: true
    },

    inventoryAmount: {
        type: Number,
        required: true
    },

    inventoryLocation: {
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



export const Inventory = mongoose.model('Inventory', inventorySchema);
