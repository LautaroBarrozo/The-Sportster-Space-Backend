import mongoose, { Schema } from "mongoose";

const userSchema: Schema = new Schema({
    userName: {
        type: String,
        required: true,
        trim: true
    },
    userEmail: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    userPassword: {
        type: String,
        required: true
    }
}, {
    timestamps: true
})

export default mongoose.model('User', userSchema)