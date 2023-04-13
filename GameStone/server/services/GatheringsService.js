import { dbContext } from "../db/DbContext.js"
import { BadRequest, Forbidden } from "../utils/Errors"
import { playersService } from "./PlayersService.js"



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
            throw new BadRequest('That Gathering Does Not Exist! Oh No!')
        }
        return gathering

    }

    async editGathering(gatheringEdits, gatheringId) {
        const originalGathering = await this.getGatheringById(gatheringId)
        if (originalGathering.isCanceled == true) {
            throw new BadRequest(`Gathering: ${originalGathering.name} is canceled and cannot be edited`)
        }
        originalGathering.name = gatheringEdits.name ? gatheringEdits.name : originalGathering.name
        originalGathering.description = gatheringEdits.description ? gatheringEdits.description : originalGathering.description
        originalGathering.coverImg = gatheringEdits.coverImg ? gatheringEdits.image_url : originalGathering.coverImg
        originalGathering.location = gatheringEdits.location ? gatheringEdits.location : originalGathering.location
        originalGathering.capacity = gatheringEdits.capacity ? gatheringEdits.capacity : originalGathering.capacity
        originalGathering.date = gatheringEdits.date ? gatheringEdits.date : originalGathering.date
        originalGathering.isPublic = gatheringEdits.isPublic ? gatheringEdits.isPublic : originalGathering.isPublic
        await originalGathering.save()
        return originalGathering

    }

    async createGathering(gData) {
        const gathering = await dbContext.Gatherings.create(gData)
        await gathering.populate("creator", "name picture")
        // await playersService.becomePlayer({ gatheringId: gData.id })
        return gathering
    }


    async cancelGathering(gatheringId, userId) {
        let gathering = await this.getGatheringById(gatheringId)
        if (gathering.creatorId != userId) {
            throw new Forbidden(`You do not have permission to cancel Gathering: ${gathering.name}. Fool! -_-`)
        }
        if (gathering.isCanceled == true) {
            throw new BadRequest(`Gathering: ${gathering.name} has already been canceled prior`)
        }
        gathering.isCanceled = true
        await gathering.save()
        return `Gathering: ${gathering.name} has been canceled`
    }

}

export const gatheringsService = new GatheringsService()