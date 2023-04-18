import { Logger } from "sass"
import { dbContext } from "../db/DbContext"
import { BadRequest, Forbidden } from "../utils/Errors"
import { groupsService } from "./GroupsService"


class GroupMemberService {

    async createMember(memberData) {
        const member = await dbContext.GroupMember.create(memberData)
        if (member.isRestricted == true) {
            throw new BadRequest("You can't take up another spot.")
        }
        const group = await groupsService.getGroupById(memberData.groupId)
        if (group.isPublic == false) {
            throw new Forbidden("This is a private group.")
        }
        await member.populate("profile", "name picture")
        await member.populate("group")
        member.isRestricted = true
        await member.save()
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

    async getGroupMembers(groupId) {
        let members = await dbContext.GroupMember.find({ groupId })
            .populate('profile', 'name picture')
        return members
    }

    async getGroupMemberById(groupMemberId) {
        const groupMember = await dbContext.GroupMember.findById(groupMemberId)
            .populate("profile", "name picture")
        if (groupMember == null) {
            throw new BadRequest("ERROR ERROR")
        }
        return groupMember
    }

    async deleteGroupMember(groupMemberId, userId) {
        let groupMember = await this.getGroupMemberById(groupMemberId)
        if (groupMember.profileId != userId) {
            throw new Forbidden("You are not allowed to delete this.")
        }
        if (groupMember == null) {
            throw new BadRequest('That member is not found.')
        }
        await groupMember.remove()

        // groupMember.isRestricted == true
        // if (groupMember.isRestricted == true) {
        //     throw new BadRequest("You cannot access this group.")
        // }
        // groupMember.isRestricted = true
        // await groupMember.save()
        return groupMember
    }
}

export const groupMemberService = new GroupMemberService()