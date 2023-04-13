import { dbContext } from "../db/DbContext"
import { BadRequest, Forbidden } from "../utils/Errors"


class GroupsService {

    async getAllGroups() {
        const groups = await dbContext.Groups.find()
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

    async editGroup(groupEdit, groupId) {
        const originalGroup = await this.getGroupById(groupId)
        if (originalGroup.isPublic == false) {
            throw new Forbidden(`${originalGroup.name} is a private group.`)
        }
        originalGroup.name = groupEdit.name ? groupEdit.name : originalGroup.name
        originalGroup.description = groupEdit.description ? groupEdit.description : originalGroup.description
        originalGroup.isPublic = groupEdit.isPublic ? groupEdit.isPublic : originalGroup.isPublic
        await originalGroup.save()
        return originalGroup
    }

    async 
}

export const groupsService = new GroupsService()