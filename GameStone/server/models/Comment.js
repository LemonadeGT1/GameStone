import { Schema } from "mongoose";

export const CommentSchema = new Schema({
    creatorId: { type: Schema.Types.ObjectId, required: true, ref: "Account" },
    gatheringId: { type: Schema.Types.ObjectId, required: true, ref: "Gathering" },
    body: { type: String, required: true, default: "Leave a comment", minLength: 5, maxLength: 1000 },
    isAttending: { type: Boolean, required: true, default: true },
}, { timestamps: true, toJSON: { virtuals: true } })

CommentSchema.virtual("creator", {
    localField: "creatorId",
    foreignField: "_id",
    justOne: true,
    ref: "Account"
})

CommentSchema.virtual("gathering", {
    localField: "gatheringId",
    foreignField: "_id",
    justOne: true,
    ref: "Gathering"
})