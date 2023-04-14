import mongoose from 'mongoose'
import { AccountSchema } from '../models/Account'
import { ValueSchema } from '../models/Value'
import { GatheringSchema } from '../models/Gathering.js';
import { GameSchema } from '../models/Game.js';
import { GroupSchema } from '../models/Group';
import { PlayerSchema } from '../models/Player.js';
import { CommentSchema } from '../models/Comment';
import { ChatSchema } from '../models/Chat';
import { GroupMemberSchema } from '../models/GroupMember';
import { GatheringGamesSchema } from '../models/GatheringGames';

class DbContext {
  Values = mongoose.model('Value', ValueSchema);
  Account = mongoose.model('Account', AccountSchema);
  Groups = mongoose.model('Group', GroupSchema)
  Gatherings = mongoose.model('Gathering', GatheringSchema);
  Games = mongoose.model('Game', GameSchema);
  Comments = mongoose.model('Comment', CommentSchema)
  Players = mongoose.model('Player', PlayerSchema);
  Chat = mongoose.model('Chat', ChatSchema)
  GroupMember = mongoose.model('GroupMember', GroupMemberSchema)
  GatheringGames = mongoose.model('GatheringGames', GatheringGamesSchema)
}

export const dbContext = new DbContext()
