import { dbContext } from "../db/DbContext"
import { BadRequest } from "../utils/Errors.js"
import { gatheringsService } from "./GatheringsService.js"


class GatheringGamesService {
    async deleteGatheringGame(gatheringGameId) {
        let gatheringGame = await dbContext.GatheringGames.findById(gatheringGameId)

        if (gatheringGame == null) {
            throw new BadRequest("Game does not exist")
        }

        await gatheringGame.remove()
    }

    async getAGame(gameId) {
        const game = await dbContext.Games.findById(gameId)
            .populate("gathering")
        return game
    }

    async addGame(gameData) {

        const foundGame = await dbContext.GatheringGames.find({ gameId: gameData.gameId, gatheringId: gameData.gatheringId })

        if (foundGame[0]) {
            throw new BadRequest("game is already added")
        }

        const gathering = await gatheringsService.getGatheringById(gameData.gatheringId)

        if (gathering.isCanceled) {
            throw new BadRequest("You can't play at a canceled gathering")
        }

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