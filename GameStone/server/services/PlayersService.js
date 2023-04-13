import { dbContext } from "../db/DbContext.js"


class PlayersService {
    async becomePlayer(playerData) {
        const player = await dbContext.Players.create(playerData)
        await player.populate('profile')
        await player.populate('gathering')
    }

}

export const playersService = new PlayersService()