import { dbContext } from "../db/DbContext.js"
import { BadRequest } from "../utils/Errors.js"
import { gatheringsService } from "./GatheringsService.js"


class PlayersService {
    async becomePlayer(playerData) {
        const aPlayer = dbContext.Players.find(playerData)
        if (aPlayer[0]) {
            throw new BadRequest("You can't take up more than one spot")
        }
        const gathering = await gatheringsService.getGatheringById(playerData.gatheringId)

        if (gathering.isCanceled) {
            throw new BadRequest("You can't play at a canceled gathering")
        }

        if (gathering.capacity < 1) {
            throw new BadRequest("No more spots available")
        } else {
            gathering.capacity -= 1
            gathering.save()
        }

        const player = await dbContext.Players.create(playerData)
        await player.populate('profile', 'name picture')
        await player.populate('gathering')
        return player
    }

}

export const playersService = new PlayersService()