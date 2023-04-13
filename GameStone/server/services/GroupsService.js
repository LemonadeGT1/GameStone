import { dbContext } from "../db/DbContext"


class GroupsService {

    async getAllGroups() {
        const groups = await dbContext.Groups.find()
        .populate("creator", "name picture")
        return groups
    }
}

export const groupsService = new GroupsService()