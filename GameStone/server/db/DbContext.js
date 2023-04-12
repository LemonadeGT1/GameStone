import mongoose from 'mongoose'
import { AccountSchema } from '../models/Account'
import { ValueSchema } from '../models/Value'
import { GatheringSchema } from '../models/Gathering.js';

class DbContext {
  Values = mongoose.model('Value', ValueSchema);
  Account = mongoose.model('Account', AccountSchema);

  Gatherings = mongoose.model('Gathering', GatheringSchema)
}

export const dbContext = new DbContext()
