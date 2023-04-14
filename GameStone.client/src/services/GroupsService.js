import { AppState } from "../AppState.js"
import { Group } from "../models/Group.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"


class GroupsService {

    async getAllGroups() {
        const res = await api.get('api/groups')
        // logger.log(res.data)
        AppState.groups = res.data.map(g => new Group(g))
        logger.log(AppState.groups, 'appstate group')
    }

    async getGroupById(groupId) {
        const res = await api.get(`api/groups/${groupId}`)
        // logger.log(res.data)
        AppState.activeGroup = new Group(res.data)
        logger.log(AppState.activeGroup, 'appstate active group')
    }

}

export const groupsService = new GroupsService()