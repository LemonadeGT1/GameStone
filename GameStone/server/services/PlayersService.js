import { dbContext } from "../db/DbContext.js"
import { BadRequest, Forbidden } from "../utils/Errors.js"
import { gatheringsService } from "./GatheringsService.js"


class PlayersService {
    async getProfileGatherings(profileId) {
        let gatherings = await dbContext.Players.find({ profileId })
            .populate('gathering')
        return gatherings
    }
    async getGatheringPlayers(gatheringId) {
        let players = await dbContext.Players.find({ gatheringId }).populate("profile", 'name picture')
            .populate({
                path: "gathering",
                populate: {
                    path: "creator",
                    select: "name picture"
                }
            })
        return players
    }

    async quit(playerId, userId) {
        let player = await dbContext.Players.findById(playerId)

        if (player == null) {
            throw new BadRequest("Player doesn't exist")
        }

        if (userId != player.profileId) {
            throw new Forbidden("You can't make other people quit")
        }
        await player.remove()


        let gathering = await gatheringsService.getGatheringById(player.gatheringId)
        if (gathering == null) {
            throw new BadRequest("Gathering doesn't exist")
        }
        gathering.capacity++
        gathering.save()
        return "You quit this game"
    }
    async becomePlayer(playerData) {
        const playerCheck = await dbContext.Players.exists(playerData)
        if (playerCheck) {
            throw new BadRequest("You can't take up more than one spot")
        }
        // const aPlayer = await dbContext.Players.find(playerData)
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