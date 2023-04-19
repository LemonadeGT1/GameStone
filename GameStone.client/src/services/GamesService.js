import { AppState } from "../AppState.js"
import { logger } from "../utils/Logger.js"
import { atlasApi } from "./AxiosService.js"
import { Game } from "../models/Game.js"
import { Profile } from "../models/Account.js"
import { api } from "./AxiosService"




class GamesService {

    async getProfileGames(accountId) {
        // logger.log(accountId)
        const res = await api.get(`account/${accountId}/accountGames`)
        logger.log(res.data)
        // AppState.profileGames.push(res.data)
        // logger.log(AppState.profileGames)
    }

    async getGames() {
        const res = await atlasApi.get(`search?skip=${AppState.gameSkip}`)
        logger.log('[GETTING GAMES]', res.data)
        AppState.games = res.data.games.map(g => new Game(g))
        logger.log('Games from AppState', AppState.games)
    }

    async clearAll() {
        AppState.query = ''
        AppState.categoryQuery = ''
        AppState.mechanicQuery = ''
        AppState.gameSkip = 0
        this.getGames()
    }

    async searchGames(query) {
        const res = await atlasApi.get(`search?name=${query}`)
        logger.log('[SEARCHED GAME]', res.data)
        AppState.query = query
        AppState.games = res.data.games.map(g => new Game(g))
        logger.log('appstate query', query)
    }

    async filterByCategory(categoryQuery) {
        const res = await atlasApi.get(`search?categories=${categoryQuery}`)
        logger.log('[SEARCHED BY CATEGORY]', res.data)
        AppState.categoryQuery = categoryQuery
        AppState.games = res.data.games.map(g => new Game(g))
        logger.log('appstate categoryQuery', categoryQuery)

    }

    async filterByMechanic(mechanicQuery) {
        const res = await atlasApi.get(`search?mechanics=${mechanicQuery}`)
        logger.log('[SEARCHED BY MECHANIC]', res.data)
        AppState.mechanicQuery = mechanicQuery
        AppState.games = res.data.games.map(g => new Game(g))
        logger.log('appstate mechanicQuery', mechanicQuery)

    }

    async getGameById(gameId) {
        const res = await atlasApi.get(`search?ids=${gameId}`)
        logger.log('res.data', res.data)
        AppState.activeGame = res.data.games[0]
        return AppState.activeGame
    }

    async changePage(num) {
        const query = AppState.query
        const categoryQuery = AppState.categoryQuery
        const mechanicQuery = AppState.mechanicQuery
        if (num > 0 && AppState.gameSkip <= 152947) {
            AppState.gameSkip += num
        } else if (num <= 0) {
            AppState.gameSkip += num
            if (AppState.gameSkip < 0) AppState.gameSkip = 0
        }
        // this.getGames()
        logger.log('appstate query', query)
        const res = await atlasApi.get(`search?skip=${AppState.gameSkip}&name=${query}&categories=${categoryQuery}&mechanics=${mechanicQuery}`)
        logger.log('[GETTING SEARCH GAMES]', res.data)
        AppState.games = res.data.games.map(g => new Game(g))
        logger.log('Games from AppState', AppState.games)
    }



}



export const gamesService = new GamesService()