// user.js
import mongoose from "mongoose";
const Schema = mongoose.Schema;



const userSchema = new Schema({

    email: {
        type: String,
        required: true,
        unique: true,
    },
    apiaryName: {
        type: String,
    },
    apiaryImage: {
        type: String,
    },
    password: {
        type: String,
        required: true,
    },
    userName: {
        type: String,
    },
    zipcode: {
        type: Number,
    },

},
    {
        timestamps: true
    }


);

export const User = mongoose.model('User', userSchema);
