import { Schema } from "mongoose"

export const ProfileGamesSchema = new Schema({
    gameId: { type: String, required: true },
    gameName: { type: String, required: true, maxLength: 50 },
    gameImg: { type: String, required: true },
    profileId: { type: Schema.Types.ObjectId, required: true, ref: "Account" }
}, { timestamps: true, toJSON: { virtuals: true } })

ProfileGamesSchema.virtual("profile", {
    localField: "profileId",
    foreignField: "_id",
    justOne: true,
    ref: "Account"
})