import { Schema } from "mongoose";

export const GroupSchema = new Schema({
    name: { type: String, required: true, default: "New Group", minLength: 2, maxLength: 50 },
    description: { type: String, required: true, default: "Please add a description", minLength: 10, maxLength: 1000 },
    isPublic: { type: Boolean, default: true },
    creatorId: { type: Schema.Types.ObjectId, required: true, ref: "Account" },
}, { timestamps: true, toJSON: { virtuals: true } })

GroupSchema.virtual("creator", {
    localField: "creatorId", 
    foreignField: "_id",
    justOne: true,
    ref: "Account"
})