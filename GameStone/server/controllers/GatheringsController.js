import { Auth0Provider } from "@bcwdev/auth0provider";
import BaseController from "../utils/BaseController.js";
import { gatheringsService } from "../services/GatheringsService.js";


export class GatheringsController extends BaseController {
    constructor() {
        super('api/gatherings')
        this.router
            .get("", this.getAllGatherings)
            .get("/:id", this.getGatheringById)
            .use(Auth0Provider.getAuthorizedUserInfo)
            .post("", this.createGathering)
    }


    //Get All Gatherings
    async getAllGatherings(req, res, next) {
        try {
            let gatherings = await gatheringsService.getAllGatherings()
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


    // Create Gathering
    async createGathering(req, res, next) {
        try {
            let gData = req.body
            gData.creatorId = req.userInfo.id
            let gathering = await gatheringsService.createGathering(gData)
            res.send(gathering)
        } catch (error) {
            next(error)
        }
    }
}