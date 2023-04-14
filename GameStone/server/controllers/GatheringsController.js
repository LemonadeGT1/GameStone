import { Auth0Provider } from "@bcwdev/auth0provider";
import BaseController from "../utils/BaseController.js";
import { gatheringsService } from "../services/GatheringsService.js";
import { playersService } from "../services/PlayersService.js";
import { chatsService } from "../services/ChatsService.js";


export class GatheringsController extends BaseController {
    constructor() {
        super('api/gatherings')
        this.router
            .get("", this.getAllGatherings)
            .get("/:id", this.getGatheringById)
            .get("/:id/chats", this.getGatheringChats)
            .get("/:id/players", this.getGatheringPlayers)
            .use(Auth0Provider.getAuthorizedUserInfo)
            .put("/:id", this.editGathering)
            .post("", this.createGathering)
            .delete("/:id", this.cancelGathering)
    }
    async getGatheringPlayers(req, res, next) {
        try {
            let gatheringId = req.params.id
            let players = await playersService.getGatheringPlayers(gatheringId)
            res.send(players)
        } catch (error) {
            next(error)
        }
    }



    //Get All Gatherings
    async getAllGatherings(req, res, next) {
        try {
            let query = req.query
            let gatherings = await gatheringsService.getAllGatherings(query)
            res.send(gatherings)
        } catch (error) {
            next(error)
        }
    }



    // Get One Gathering
    async getGatheringById(req, res, next) {
        try {
            let gatheringId = req.params.id
            let gathering = await gatheringsService.getGatheringById(gatheringId)
            res.send(gathering)

        } catch (error) {
            next(error)
        }
    }

    // Edit Gathering
    async editGathering(req, res, next) {
        try {
            const gatheringEdits = req.body
            const gatheringId = req.params.id
            const editedGathering = await gatheringsService.editGathering(gatheringEdits, gatheringId)
            res.send(editedGathering)
        } catch (error) {
            next(error)
        }
    }



    // Create Gathering
    async createGathering(req, res, next) {
        try {
            let gData = req.body
            let userId = req.userInfo.id
            gData.creatorId = userId
            let gathering = await gatheringsService.createGathering(gData)
            res.send(gathering)
        } catch (error) {
            next(error)
        }
    }

    //Cancel Gathering
    async cancelGathering(req, res, next) {
        try {
            let userId = req.userInfo.id
            let gatheringId = req.params.id
            let message = await gatheringsService.cancelGathering(gatheringId, userId)
            res.send(message)
        } catch (error) {
            next(error)
        }
    }

    async getGatheringChats(req, res, next) {
        try {
            let gatheringId = req.params.id
            let chats = await chatsService.getGatheringChats(gatheringId)
            return res.send(chats)
        } catch (error) {
            next(error)
        }
    }
}