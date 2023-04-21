import { Schema } from "mongoose";


export const GameSchema = new Schema({
  name: { type: String, required: true, maxLength: 200 },
  description: { type: String, required: true, maxLength: 2000 },
  image_url: { type: String, required: true, maxLength: 1000 },
  min_players: { type: Number, required: true, min: 1 },
  max_players: { type: Number, required: true, min: 1 },
  min_playtime: { type: Number, required: true },
  max_playtime: { type: Number, required: true },
  categories: { type: Array },
  mechanics: { type: Array },
  id: { type: String, required: true }
},
  { timestamps: true, toJSON: { virtuals: true } })

