import { Schema } from "mongoose";


export const GatheringGamesSchema = new Schema({
    gatheringId: { type: Schema.Types.ObjectId, required: true, ref: "Gathering" },
    gameId: { type: String, required: true },
    gameName: { type: String, required: true, maxLength: 50 },
    gameImg: { type: String, required: true }
}, { timestamps: true, toJSON: { virtuals: true } })

GatheringGamesSchema.virtual("gathering", {
    localField: "gatheringId",
    foreignField: "_id",
    justOne: true,
    ref: "Gathering"
})