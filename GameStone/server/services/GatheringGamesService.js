import { dbContext } from "../db/DbContext"


class GatheringGamesService {

    async getAGame(gameId) {
        const game = await dbContext.Games.findById(gameId)
        .populate("gathering")
        return game
    }

    async addGame(gameData) {
        const game = await dbContext.GatheringGames.create(gameData)
        await game.populate("gathering")
        return game
    }

    async getGatheringGames(gatheringId) {
        let games = await dbContext.GatheringGames.find({ gatheringId })
        .populate('gathering')
        return games
    }
}

export const gatheringGamesService = new GatheringGamesService()