import mongoose, { Schema } from "mongoose";

const commentsSchema: Schema = new Schema({
    comment:{
        type: String,
        required: true,
    },
    userName: {
        type: String,
        required: true
    },
    productId: {
        type: Number,
        required: true
    }
},{
    timestamps: true
})

export default mongoose.model("Comments", commentsSchema)