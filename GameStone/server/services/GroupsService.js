import { dbContext } from "../db/DbContext"
import { BadRequest, Forbidden } from "../utils/Errors"
import { logger } from "../utils/Logger.js"


class GroupsService {

    async getAllGroups(query = '') {
        const filter = new RegExp(query, 'ig')
        const groups = await dbContext.Groups.find({ $or: [{ name: { $regex: filter } }, { description: { $regex: filter } }]})
            .populate("creator", "name picture")
        return groups
    }

    async createGroup(groupData) {
        const group = await dbContext.Groups.create(groupData)
        await group.populate("creator", "name picture")
        return group
    }

    async getGroupById(groupId) {
        const group = await dbContext.Groups.findById(groupId)
            .populate("creator", "name picture")
        if (group == null) {
            throw new BadRequest('This Group does not exist.')
        }
        return group
    }

    async editGroup(groupEdit, groupId, userId) {
        const originalGroup = await this.getGroupById(groupId)
        if (originalGroup.isPublic == false) {
            throw new Forbidden(`${originalGroup.name} is a private group.`)
        }
        if (userId != originalGroup.creatorId) {
            throw new Forbidden("You cannot edit this.")
        }
        originalGroup.name = groupEdit.name ? groupEdit.name : originalGroup.name
        originalGroup.description = groupEdit.description ? groupEdit.description : originalGroup.description
        originalGroup.isPublic = groupEdit.isPublic ? groupEdit.isPublic : originalGroup.isPublic
        await originalGroup.save()
        return originalGroup
    }

    async deleteGroup(groupId, userId) {
        let group = await this.getGroupById(groupId)
        if (group.creatorId != userId) {
            throw new Forbidden('You are not allowed to delete this.')
        }
        if (group.isDeleted == true) {
            throw new BadRequest(`${group.name} has already been deleted.`)
        }
        group.isDeleted = true
        await group.save()
        return `${group.name} has been deleted`
    }
}

export const groupsService = new GroupsService()