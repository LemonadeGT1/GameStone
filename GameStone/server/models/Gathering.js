import { Schema } from "mongoose";
import { GroupSchema } from "./Group.js";


export const GatheringSchema = new Schema({
    name: { type: String, minLength: 2, default: "New Gathering", required: true, maxLength: 50 },
    description: { type: String, default: "Please add a description of gathering", required: true, minLength: 10, maxLength: 1000 },
    coverImg: { type: String, required: true, maxLength: 1000, default: "https://mykindofmeeple.com/wp-content/uploads/2019/03/board-game-pieces-1602-27042020.jpg.webp" },
    location: { type: String, required: true, maxLength: 200, default: "tbd" },
    capacity: { type: Number, required: true, min: 2, max: 500, },
    date: { type: Date, required: true, default: new Date },
    isPublic: { type: Boolean, default: true },
    creatorId: { type: Schema.Types.ObjectId, required: true, ref: "Account" },
    isCanceled: { type: Boolean, default: false },
    games: { type: [Object] }
}, { timestamps: true, toJSON: { virtuals: true } })


GatheringSchema.virtual("creator", {
    localField: "creatorId",
    foreignField: "_id",
    justOne: true,
    ref: "Account"
})