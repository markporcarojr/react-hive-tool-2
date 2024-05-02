import mongoose from "mongoose";
const Schema = mongoose.Schema;

// Schema
const todoSchema = new Schema({

    todo: {
        type: String,
        required: true
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



export const Todo = mongoose.model('Todo', todoSchema);
