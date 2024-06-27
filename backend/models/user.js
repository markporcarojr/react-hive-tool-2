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
    username: {
        type: String,
        required: false,
    },
    zipcode: {
        type: Number,
    },

},
    {
        timestamps: true
    }


);

userSchema.pre('save', function (next) {
    if (!this.userName) {
        this.userName = this.email;
    }
    next();
});

export const User = mongoose.model('User', userSchema);
