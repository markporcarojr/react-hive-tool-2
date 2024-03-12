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

    inventoryDate: {
        type: String,
        required: false
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



export const Inventory = mongoose.model('Inventory', inventorySchema);
