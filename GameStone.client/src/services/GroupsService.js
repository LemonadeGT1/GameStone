import { AppState } from "../AppState.js"
import { Group } from "../models/Group.js"
import { GroupMember } from "../models/GroupMember.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"


class GroupsService {

    async getProfileGroups(profileId) {
        const res = await api.get(`api/profiles/${profileId}/groups`)
        logger.log('profile group', res.data)
        AppState.profileGroups = res.data.map(g => new GroupMember(g))
        logger.log('group member', AppState.profileGroups)
    }

    async getAllGroups() {
        const res = await api.get('api/groups')
        logger.log(res.data)
        AppState.groups = res.data.map(g => new Group(g))
        logger.log(AppState.groups, 'appstate group')
    }

    async searchGroups(query) {
        const res = await api.get('api/groups', { params: { query: query } })
        logger.log('[Searching Groups]', res.data)
        AppState.query = query.query
        AppState.groups = res.data.map(g => new Group(g))
    }

    async getGroupById(groupId) {
        const res = await api.get(`api/groups/${groupId}`)
        AppState.activeGroup = new Group(res.data)
    }

    async createGroup(groupData) {
        const res = await api.post('api/groups', groupData)
        logger.log('creating group', res.data)
        const newGroup = new Group(res.data)
        AppState.groups.push(newGroup)
        return newGroup
    }

    async deleteGroup(groupId) {
        const res = await api.delete(`api/groups/${groupId}`)
        logger.log('Deleting Group from service', res.data)
        AppState.groups = AppState.groups.filter(g => g.group != groupId)
    }

    async editGroup(groupData, groupId) {
        logger.log('Edit Group from service', groupData, groupId)
        const res = await api.put(`api/groups/${groupId}`, groupData)
        logger.log('Edited Group', res.data)
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

    async getCommentsByGroupId(groupId) {
        logger.log('getting group comments', groupId)
        const res = await api.get(`/api/groups/${groupId}/comments`)
        logger.log('res.data', res.data)
        AppState.activeGroupComments = res.data
        logger.log('AppState.activeGroupComments', AppState.activeGroupComments)
    }

}

export const groupsService = new GroupsService()