import { dbContext } from "../db/DbContext.js"


class GatheringsService {
    async createGathering(gData) {
        const gathering = await dbContext.Gatherings.create(gData)
        await gathering.populate("creator", "name picture")
        return gathering
    }

}

export const gatheringsService = new GatheringsService()