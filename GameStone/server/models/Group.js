import { Schema } from "mongoose";

export const GroupSchema = new Schema({
    name: { type: String, required: true, default: "New Group", minLength: 2, maxLength: 50 },
    description: { type: String, required: true, default: "Please add a description", minLength: 10, maxLength: 1000 },
    imgUrl: { type: String, required: true, default: "https://th.bing.com/th/id/OIP.TfKDEcKxFA1u41jGznCOuQHaHa?pid=ImgDet&rs=1" },
    isPublic: { type: Boolean, default: true },
    isDeleted: { type: Boolean, default: false },
    creatorId: { type: Schema.Types.ObjectId, required: true, ref: "Account" },
}, { timestamps: true, toJSON: { virtuals: true } })

GroupSchema.virtual("creator", {
    localField: "creatorId",
    foreignField: "_id",
    justOne: true,
    ref: "Account"
})