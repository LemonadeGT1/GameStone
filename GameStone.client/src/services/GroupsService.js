import { AppState } from "../AppState.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"


class GroupsService {

    async getAllGroups() {
        const res = await api.get('api/groups')
        logger.log(res.data)
        AppState.
    }

}

export const groupsService = new GroupsService()