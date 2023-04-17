import { dbContext } from "../db/DbContext"
import { BadRequest } from "../utils/Errors"


class AccountGamesService {

    async addAccountGame(gameData) {
        const game = await dbContext.AccountGames.create(gameData)
        if (game[0]) {
            throw new BadRequest("Game is already in your Account.")
        }
        await game.populate("account", "name picture")
        return game
    }

    async getAccountGames(accountId) {
        let games = await dbContext.AccountGames.find({ accountId })
        return games
    }

    async deleteAccountGame(accountGameId) {
        let accountGame = await dbContext.AccountGames.findById(accountGameId)
        if (accountGame == null) {
            throw new BadRequest("This game does not exist.")
        }
        await accountGame.remove()
    }
}

export const accountGamesService = new AccountGamesService()