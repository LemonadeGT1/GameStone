import { dbContext } from "../db/DbContext"
import { BadRequest, Forbidden } from "../utils/Errors"
import { groupsService } from "./GroupsService"


class GroupMemberService {

    async createMember(memberData) {
        const member = await dbContext.GroupMember.create(memberData)
        if (member[0]) {
            throw new BadRequest("You can't take up another spot.")
        }
        const group = await groupsService.getGroupById(memberData.groupId)
        if (group.isPublic !== false) {
            throw new Forbidden("This is a private group.")
        }
        await member.populate("profile", "name picture")
        await member.populate("group")
        return member
    }

    async getMyGroups(groupId) {
        let groups = await dbContext.Groups.find({ groupId })
        .populate({
            path: "group",
            populate: {
                path: "profile",
                select: "name picture"
            }
        })
        return groups
    }

    async getGroupMembers(profileId) {
        let members = await dbContext.GroupMember.find({ profileId })
        .populate('profile', 'name picture')
        return members
    }
}

export const groupMemberService = new GroupMemberService()