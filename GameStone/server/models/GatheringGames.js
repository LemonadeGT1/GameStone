import { Schema } from "mongoose";


export const GatheringGamesSchema = new Schema({
    gatheringId: { type: Schema.Types.ObjectId, required: true, ref: "Gathering" },
    gameName: { type: String, required: true, maxLength: 50 },
    gameId: { type: Schema.Types.ObjectId, required: true, ref: "Game" },
    gameImg: { type: String, required: true }
}, { timestamps: true, toJSON: {virtuals: true } })

GatheringGamesSchema.virtual("gathering", {
    localField: "gatheringId",
    foreignField: "_id",
    justOne: true,
    ref: "Gathering"
})