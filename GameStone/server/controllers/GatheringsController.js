import { Auth0Provider } from "@bcwdev/auth0provider";
import BaseController from "../utils/BaseController.js";
import { gatheringsService } from "../services/GatheringsService.js";


export class GatheringsController extends BaseController {
    constructor() {
        super('api/gatherings')
        this.router
            .use(Auth0Provider.getAuthorizedUserInfo)
            .post("", this.createGathering)
    }
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