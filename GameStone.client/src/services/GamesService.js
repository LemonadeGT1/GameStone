import { AppState } from "../AppState.js"
import { logger } from "../utils/Logger.js"
import { atlasApi } from "./AxiosService.js"
import { Game } from "../models/Game.js"




class GamesService {

    async getGames() {
        const res = await atlasApi.get(`search?skip=${AppState.gameSkip}`)
        logger.log('[GETTING GAMES]', res.data)
        AppState.games = res.data.games.map(g => new Game(g))
        logger.log('Games from AppState', AppState.games)
    }

    async getGameById(gameId) {
        const res = await atlasApi.get(`search?ids=${gameId}`)
        logger.log('res.data', res.data)
        AppState.activeGame = res.data.games[0]
        return AppState.activeGame
    }

    async changePage(num) {
        if (num > 0 && AppState.gameSkip <= 152947) {
            AppState.gameSkip += num
        } else if (num <= 0) { 
            AppState.gameSkip += num
            if (AppState.gameSkip < 0) AppState.gameSkip =0
        }
        this.getGames()
        // const res = await atlasApi.get(`search/skip=${num}`)
        // logger.log('[CHANGING PAGE]', res.data)
    }

}

export const gamesService = new GamesService()