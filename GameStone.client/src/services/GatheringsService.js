import { AppState } from "../AppState"
import { Gathering } from "../models/Gathering"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"


class GatheringsService {

    async getAllGatherings() {
        const res = await api.get('api/gatherings')
        logger.log('[ALL GATHERINGS]', res.data)
        AppState.gatherings = res.data.map(g => new Gathering(g))
        logger.log(AppState.gatherings, 'all appstate gatherings')
    }

    async searchGatherings(query) {
        const res = await api.get('api/gatherings', { params: { query: query } })
        logger.log('[searched posts]', res.data)
        AppState.query = query.query
        AppState.gatherings = res.data.map(g => new Gathering(g))
    }

    async getGatheringById(gatheringId) {
        const res = await api.get(`api/gatherings/${gatheringId}`)
        logger.log(res.data)
        AppState.activeGathering = new Gathering(res.data)
        logger.log(AppState.activeGathering, 'active gathering')
    }
}

export const gatheringsService = new GatheringsService()