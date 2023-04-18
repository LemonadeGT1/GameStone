import { playersService } from "../services/PlayersService.js";
import BaseController from "../utils/BaseController.js";
import { Auth0Provider } from "@bcwdev/auth0provider";


export class PlayersController extends BaseController {
    constructor() {
        super('api/players')
        this.router
            .use(Auth0Provider.getAuthorizedUserInfo)
            .post('', this.becomePlayer)
            .delete('/:id', this.quit)
    }
    async quit(req, res, next) {
        try {
            let playerId = req.params.id
            let userId = req.userInfo.id
            let message = await playersService.quit(playerId, userId)
            res.send(message)
        } catch (error) {
            next(error)

        }
    }
    async becomePlayer(req, res, next) {
        try {
            let playerData = req.body
            playerData.profileId = req.userInfo.id
            let player = await playersService.becomePlayer(playerData)
            res.send(player)
        } catch (error) {
            next(error)
        }
    }
}