import { Schema } from "mongoose";


export const ChatSchema = new Schema({
    profileId: { type: Schema.Types.ObjectId, required: true, ref: "Account" },
    gatheringId: { type: Schema.Types.ObjectId, required: true, ref: "Gathering"},
    body: { type: String, required: true, default: "What do you have to say?", minLength: 5, maxLength: 1000 },
    isAttending: { type: Boolean, required: true, default: true },
}, { timestamps: true, toJSON: { virtuals: true } })

ChatSchema.virtual("profile", {
    localField: "profileId",
    foreignField: "_id",
    justOne: true,
    ref: "Account"
})