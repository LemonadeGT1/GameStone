import { dbContext } from "../db/DbContext.js"
import { BadRequest, Forbidden } from "../utils/Errors"
import { playersService } from "./PlayersService.js"



class GatheringsService {
    async getHostedGatherings(creatorId) {
        let gatherings = await dbContext.Gatherings.find({ creatorId })
            .populate('creator', 'name picture')
        return gatherings
    }
    async getMyGatherings(profileId) {
        let gatherings = await dbContext.Gatherings.find({ creatorId: profileId })
        return gatherings
    }
    async getGatheringsPlayingIn(profileId) {
        let gatherings = await dbContext.Players.find({ profileId })
            .populate({
                path: "gathering",
                populate: {
                    path: "creator",
                    select: "name picture"
                }
            })
        return gatherings
    }


    // i says make all lowercase, g says look everywhere
    // $xor, if both match then dont bring back, cool note XD
    async getAllGatherings(query = '') {
        const filter = new RegExp(query, 'ig')
        const gatherings = await dbContext.Gatherings.find({ $or: [{ name: { $regex: filter } }, { description: { $regex: filter } }], date: { $gte: Date.now() }, isCanceled: false, isPublic: true })


            // const gatherings = await dbContext.Gatherings.find({ name: { $regex: `${query}` } })
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

    async editGathering(gatheringEdits, gatheringId, userId) {
        const originalGathering = await this.getGatheringById(gatheringId)
        if (originalGathering.isCanceled == true) {
            throw new BadRequest(`Gathering: ${originalGathering.name} is canceled and cannot be edited`)
        }
        if (originalGathering.creatorId != userId) {
            throw new Forbidden("You are not allowed to edit this.")
        }
        originalGathering.name = gatheringEdits.name ? gatheringEdits.name : originalGathering.name
        originalGathering.description = gatheringEdits.description ? gatheringEdits.description : originalGathering.description
        originalGathering.coverImg = gatheringEdits.coverImg ? gatheringEdits.coverImg : originalGathering.coverImg
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
        await playersService.becomePlayer({ gatheringId: gathering.id, accountId: gData.creatorId })
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

    // async getChats(gatheringId) {
    //     let chats = await dbContext.Chat.find({gatheringId})
    //     .populate("profile", 'name picture')
    //     return chats
    // }
}

export const gatheringsService = new GatheringsService()