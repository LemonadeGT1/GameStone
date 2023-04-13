import { Schema } from "mongoose";


export const GatheringSchema = new Schema({
    name: { type: String, required: true, default: "New Gathering", minLength: 2, maxLength: 50 },
    description: { type: String, require: true, default: "Please add a description of gathering", minLength: 10, maxLength: 1000 },
    coverImg: { type: String, maxLength: 1000 },
    description: { type: String, required: true, default: "Please add a description of gathering", minLength: 10, maxLength: 1000 },
    image_url: { type: String, maxLength: 1000 },
    location: { type: String, maxLength: 200, required: true, default: "tbd" },
    capacity: { type: Number, min: 2, max: 10000 },
    date: { type: Date, required: true, default: new Date },
    isPublic: { type: Boolean, default: true, required: true },
    creatorId: { type: Schema.Types.ObjectId, required: true, ref: "Account" },
    isCanceled: { type: Boolean, default: false },
}, { timestamps: true, toJSON: { virtuals: true } })


GatheringSchema.virtual("creator", {
    localField: "creatorId",
    foreignField: "_id",
    justOne: true,
    ref: "Account"
})