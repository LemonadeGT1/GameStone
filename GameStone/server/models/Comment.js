import { Schema } from "mongoose";

export const CommentSchema = new Schema({
    creatorId: { type: Schema.Types.ObjectId, required: true, ref: "Account" },
    groupId: { type: Schema.Types.ObjectId, required: true, ref: "Group" },
    body: { type: String, required: true, default: "Leave a comment", minLength: 5, maxLength: 1000 },
    isAttending: { type: Boolean, required: true, default: true },
}, { timestamps: true, toJSON: { virtuals: true } })

CommentSchema.virtual("creator", {
    localField: "creatorId",
    foreignField: "_id",
    justOne: true,
    ref: "Account"
})

CommentSchema.virtual("group", {
    localField: "groupId",
    foreignField: "_id",
    justOne: true,
    ref: "Group"
})