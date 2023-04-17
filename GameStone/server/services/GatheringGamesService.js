import { dbContext } from "../db/DbContext"


class GatheringGamesService {
    async deleteGatheringGame(gatheringGameId) {
        let gatheringGame = await dbContext.GatheringGames.findById(gatheringGameId)
        await gatheringGame.remove()
    }

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
        return games
    }
}

export const gatheringGamesService = new GatheringGamesService()