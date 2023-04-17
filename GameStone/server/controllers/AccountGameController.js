import { Auth0Provider } from "@bcwdev/auth0provider";
import BaseController from "../utils/BaseController";
import { accountGamesService } from "../services/AccountGamesService";


export class AccountGameController extends BaseController {
    constructor() {
        super('api/accountGames')
        this.router
        .use(Auth0Provider.getAuthorizedUserInfo)
        .post("", this.addAccountGame)
    }

    async addAccountGame(req, res, next) {
        try {
            let gameData = req.body
            let userId = req.userInfo.id
            gameData.accountId = userId
            let game = await accountGamesService.addAccountGame(gameData)
            res.send(game)
        } catch (error) {
            next(error)
        }
    }
}