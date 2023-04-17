import { Schema } from "mongoose";


export const GatheringSchema = new Schema({
    name: { type: String, minLength: 2, default: "New Gathering", maxLength: 50 },
    description: { type: String, default: "Please add a description of gathering", maxLength: 1000 },
    coverImg: { type: String, maxLength: 1000, default: "https://mykindofmeeple.com/wp-content/uploads/2019/03/board-game-pieces-1602-27042020.jpg.webp" },
    location: { type: String, maxLength: 200, default: "tbd" },
    capacity: { type: Number, required: true, min: 2, max: 500, },
    date: { type: Date },
    isPublic: { type: Boolean, default: true },
    creatorId: { type: Schema.Types.ObjectId, required: true, ref: "Account" },
    isCanceled: { type: Boolean, default: false },
}, { timestamps: true, toJSON: { virtuals: true } })


GatheringSchema.virtual("creator", {
    localField: "creatorId",
    foreignField: "_id",
    justOne: true,
    ref: "Account"
})