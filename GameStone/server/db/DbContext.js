import mongoose from 'mongoose'
import { AccountSchema } from '../models/Account'
import { ValueSchema } from '../models/Value'
import { GatheringSchema } from '../models/Gathering.js';
import { GameSchema } from '../models/Game.js';

class DbContext {
  Values = mongoose.model('Value', ValueSchema);
  Account = mongoose.model('Account', AccountSchema);

  Gatherings = mongoose.model('Gathering', GatheringSchema);
  Games = mongoose.model('Game', GameSchema);
}

export const dbContext = new DbContext()
