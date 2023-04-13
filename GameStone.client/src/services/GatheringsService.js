import { AppState } from "../AppState"
import { Gathering } from "../models/Gathering"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"


class GatheringsService {

    async getAllGatherings() {
        const res = await api.get('api/gatherings')
        AppState.gatherings = res.data.map(g => new Gathering(g))
        logger.log('[ALL GATHERINGS]', res.data)
    }
}

export const gatheringsService = new GatheringsService()