// user.js
import mongoose from "mongoose";
import passportLocalMongoose from 'passport-local-mongoose'
const Schema = mongoose.Schema;

// const passportLocalMongoose = require('passport-local-mongoose');


const userSchema = new Schema({

    googleId: {
        type: String,
        required: false,
        unique: true,
    },
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
    password: {
        type: String,
        required: true,
    }

},
    {
        timestamps: true
    }


);

// userSchema.statics.findOrCreate = async function (condition, doc) {
//     try {
//         const user = await this.findOne(condition);
//         if (user) {
//             return user;
//         } else {
//             return this.create(doc);
//         }
//     } catch (error) {
//         throw error;
//     }
// };

userSchema.plugin(passportLocalMongoose);

export const User = mongoose.model('User', userSchema);
