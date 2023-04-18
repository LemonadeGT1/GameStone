import { dbContext } from "../db/DbContext"
import { BadRequest, Forbidden } from "../utils/Errors"


class AccountGamesService {

    async addAccountGame(gameData) {
        const gameCheck = await dbContext.AccountGames.exists(gameData)
        if (gameCheck) {
            throw new BadRequest("Game is already in your Account.")
        }
        const game = await dbContext.AccountGames.create(gameData)
        await game.populate("account", "name picture")
        return game
    }

    async getAccountGames(accountId) {
        let games = await dbContext.AccountGames.find({ accountId })
        return games
    }

    async deleteAccountGame(accountGameId, userId) {
        let accountGame = await dbContext.AccountGames.findById(accountGameId)
        if (accountGame == null) {
            throw new BadRequest("This game does not exist.")
        }

        if (accountGame.accountId != userId) {
            throw new Forbidden("You are not allowed to delete this.")
        }
        await accountGame.remove()
    }
}

export const accountGamesService = new AccountGamesService()