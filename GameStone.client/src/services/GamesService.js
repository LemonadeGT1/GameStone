import { AppState } from "../AppState.js"
import { logger } from "../utils/Logger.js"
import { atlasApi } from "./AxiosService.js"
import { Game } from "../models/Game.js"




class GamesService {

    async getGames() {
        const res = await atlasApi.get('')
        logger.log('[GETTING GAMES]', res.data)
        AppState.games = res.data.games.map(g => new Game(g))
        logger.log('Games from AppState', AppState.games)
    }

}

export const gamesService = new GamesService()