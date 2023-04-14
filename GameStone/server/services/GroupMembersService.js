import { dbContext } from "../db/DbContext"


class GroupMemberService {

    async createMember(memberData) {
        const member = await dbContext.GroupMember.create(memberData)
        await member.populate("profile", "name picture")
        await member.populate("group")
        return member
    }
}

export const groupMemberService = new GroupMemberService()