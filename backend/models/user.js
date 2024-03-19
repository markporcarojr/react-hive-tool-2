import mongoose from "mongoose";
// const passportLocalMongoose = require('passport-local-mongoose');


const userSchema = new mongoose.Schema({

    email: {
        type: String,
        required: true,
        unique: true,
    },
    apiaryName: {
        type: String,
    },
    userName: {
        type: String,
    },
    // googleId: {
    //     type: String,
    //     unique: true,
    //     sparse: true, // Allows null values and enforces unique constraint
    // }
    password: {
        type: String,
        required: true,
    }

},
    {
        timestamps: true
    }


);

export const User = mongoose.model('User', userSchema);
