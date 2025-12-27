import mongoose, { Schema } from "mongoose";
const trackerSchema = new Schema({
    tracker: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    risk: {
        type: String,
        required: true
    },
    explanation: {
        type: String,
        required: true
    },
    action: {
        type: String,
        required: true
    }

}, { timestamps: true })

export const Tracker = mongoose.model('Tracker', trackerSchema)

