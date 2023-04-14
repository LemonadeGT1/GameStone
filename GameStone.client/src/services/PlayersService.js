import { AppState } from "../AppState.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"


class PlayersService {


    async becomePlayer(gatheringId) {
        const res = await api.post('api/players', gatheringId)
        logger.log(res.data, 'becoming a player')
    }
}

export const playersService = new PlayersService()