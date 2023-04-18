import { Auth0Provider } from "@bcwdev/auth0provider";
import { gatheringGamesService } from "../services/GatheringGamesService";
import BaseController from "../utils/BaseController";


export class GatheringGamesController extends BaseController {
    constructor() {
        super('api/gatheringGames')
        this.router
            .get("/:id", this.getAGame)
            .use(Auth0Provider.getAuthorizedUserInfo)
            .post("", this.addGame)
            .delete("/:id", this.deleteGatheringGame)
    }

    async deleteGatheringGame(req, res, next) {
        try {
            let gatheringGameId = req.params.id
            let message = await gatheringGamesService.deleteGatheringGame(gatheringGameId)
            res.send(message)
        } catch (error) {
            next(error)
        }
    }

    async addGame(req, res, next) {
        try {
            let gameData = req.body
            let userId = req.userInfo.id
            gameData.creatorId = userId
            let game = await gatheringGamesService.addGame(gameData)
            res.send(game)
        } catch (error) {
            next(error)
        }
    }

    async getAGame(req, res, next) {
        try {
            let gameId = req.params.id
            let game = await gatheringGamesService.getAGame(gameId)
            res.send(game)
        } catch (error) {
            next(error)
        }
    }
}