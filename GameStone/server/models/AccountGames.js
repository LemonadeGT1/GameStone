import { Schema } from "mongoose";


export const AccountGamesSchema = new Schema({
    gameId: { type: String, required: true },
    gameName: { type: String, required: true, maxLength: 50 },
    gameImg: { type: String, required: true },
    accountId: { type: Schema.Types.ObjectId, required: true, ref: "Account" }
}, { timestamps: true, toJSON: {virtuals: true } })

AccountGamesSchema.virtual("account", {
    localField: "accountId",
    foreignField: "_id",
    justOne: true,
    ref: "Account"
})