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
        return `${gatheringGame.gameName} has been deleted.`
    }

    async getAGame(gameId) {
        const game = await dbContext.Games.findById(gameId)
            .populate("gathering")
        return game
    }

    async addGame(gameData) {
        // const gameCheck = await dbContext.GatheringGames.exists(gameData)
        
        const gameCheck = await dbContext.GatheringGames.exists({ gameId: gameData.gameId, gatheringId: gameData.gatheringId })
        if (gameCheck) {
            throw new BadRequest("game is already added")
        }

        const gathering = await gatheringsService.getGatheringById(gameData.gatheringId)

        if (gathering.isCanceled == true) {
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