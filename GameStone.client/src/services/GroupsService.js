import { AppState } from "../AppState.js"
import { Group } from "../models/Group.js"
import { GroupMember } from "../models/GroupMember.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"


class GroupsService {

    async getAllGroups() {
        const res = await api.get('api/groups')
        // logger.log(res.data)
        AppState.groups = res.data.map(g => new Group(g))
        logger.log(AppState.groups, 'appstate group')
    }

    async searchGroups(query) {
        const res = await api.get('api/groups', { params: { query: query } })
        logger.log('[Searching Groups]', res.data)
    }

    async getGroupById(groupId) {
        const res = await api.get(`api/groups/${groupId}`)
        AppState.activeGroup = new Group(res.data)
    }

    async getMembersByGroupId(groupId) {
        const res = await api.get(`api/groups/${groupId}/groupMembers`)
        AppState.groupMembers = res.data
    }

    async becomeMember(groupId) {
        const res = await api.post('api/groupMembers', groupId)
        AppState.groupMembers.push(res.data)
    }

    async leaveGroup(groupMemberId) {
        const res = await api.delete(`api/groupMembers/${groupMemberId}`)
        AppState.groupMembers = AppState.groupMembers.filter(gm => gm.id != groupMemberId)
    }

}

export const groupsService = new GroupsService()