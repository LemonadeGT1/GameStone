import { dbContext } from "../db/DbContext.js"
import { BadRequest, Forbidden } from "../utils/Errors"



class GatheringsService {

    async getAllGatherings() {
        const gatherings = await dbContext.Gatherings.find()
            .populate("creator", "name picture")
        return gatherings
    }


    async getGatheringById(gatheringId) {
        const gathering = await dbContext.Gatherings.findById(gatheringId)
            .populate("creator", "name picture")

        if (gathering == null) {
            throw new BadRequest('That Gathering Does Not Exist!')
        }
    }



    async createGathering(gData) {
        const gathering = await dbContext.Gatherings.create(gData)
        await gathering.populate("creator", "name picture")
        return gathering
    }

}

export const gatheringsService = new GatheringsService()