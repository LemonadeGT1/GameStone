import { AppState } from "../AppState"
import { Gathering } from "../models/Gathering"
import { logger } from "../utils/Logger"
import { api, atlasApi } from "./AxiosService"
import { Player } from "../models/Player.js"


class GatheringsService {

    async getProfileGatherings(profileId) {
        const res = await api.get(`api/profiles/${profileId}/gatherings`)
        logger.log('profile gatherings', res.data)
        AppState.profileGatherings = res.data.map(p => new Player(p))
        logger.log('added player gathering', AppState.profileGatherings)
    }

    async getGatheringsIOwn(profileId) {
        const res = await api.get(`api/profiles/${profileId}/hostedGatherings`)
        logger.log('gatherings im hosting', res.data)
        AppState.profileHostedGatherings = res.data.map(g => new Gathering(g))
        logger.log('mapped our hosted gatherings', AppState.profileHostedGatherings)
    }

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

    async createGathering(gatheringData) {
        const res = await api.post('api/gatherings', gatheringData)
        logger.log('created gathering', res.data)
        const newGathering = new Gathering(res.data)
        AppState.gatherings.push(newGathering)
        return newGathering
    }

    async deleteGathering(gatheringId) {
        const res = await api.delete(`api/gatherings/${gatheringId}`)
        logger.log(res.data)
    }

    async editGathering(gatheringData) {
        const res = await api.put(`api/gatherings/${gatheringData.id}`, gatheringData)
        logger.log(res.data, 'edited gathering')
        AppState.activeGathering = new Gathering(res.data)
    }

    async getMyGatherings(profileId) {
        const res = await api.get('account/gatherings')
        AppState.gathering = res.data.map(g => new Gathering(g))

    }
    // async getGatheringsByGames(gatheringQuery) {
    //     const res = await api.get(`api/gatherings/${gatheringQuery}`)
    //     AppState.gatheringQuery = gatheringQuery
    //     AppState.gatherings = res.data.gatherings.map(g => new Gathering(g))
    //     logger.log('[find gatherings]', gatheringQuery)
    // }
}

export const gatheringsService = new GatheringsService()