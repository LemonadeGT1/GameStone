import { Schema } from "mongoose";


export const GroupMemberSchema = new Schema({
    groupId: { type: Schema.Types.ObjectId, required: true, ref: "Group" },
    profileId: { type: Schema.Types.ObjectId, required: true, ref: "Account" },
    isRestricted: { type: Boolean, required: true, default: false },
}, { timestamps: true, toJSON: { virtuals: true } })

GroupMemberSchema.virtual("group", {
    localField: "groupId", 
    foreignField: "_id",
    justOne: true,
    ref: "Group"
})

GroupMemberSchema.virtual("profile", {
    localField: "profileId",
    foreignField: "_id",
    justOne: true,
    ref: "Account"
})