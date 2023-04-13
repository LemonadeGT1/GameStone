import { Schema } from "mongoose";


export const PlayerSchema = new Schema({
    gatheringId: { type: Schema.Types.ObjectId, required: true },
    accountId: { type: Schema.Types.ObjectId, required: true },
}, { timestamps: true, toJSON: { virtuals: true } })


PlayerSchema.virtual('gathering', {
    localField: 'gatheringId',
    foreignField: '_id',
    justOne: true,
    ref: 'Gathering'
})