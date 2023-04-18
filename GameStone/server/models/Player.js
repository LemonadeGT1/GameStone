import { Schema } from "mongoose";


export const PlayerSchema = new Schema({
    gatheringId: { type: Schema.Types.ObjectId, required: true, ref: "Gathering" },
    profileId: { type: Schema.Types.ObjectId, required: true, ref: "Account" },
}, { timestamps: true, toJSON: { virtuals: true } })


PlayerSchema.virtual('gathering', {
    localField: 'gatheringId',
    foreignField: '_id',
    justOne: true,
    ref: 'Gathering'
})

PlayerSchema.virtual('profile', {
    localField: 'profileId',
    foreignField: '_id',
    justOne: true,
    ref: 'Account'
})