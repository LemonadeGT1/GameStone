import BaseController from "../utils/BaseController.js";




export class GamesController extends BaseController {
    constructor() {
        super('/search')
        this.router
        .get('', this.getGames)
    }

    async getGames(req, res, next) {
        try {
            
        } catch (error) {
            next(error)
        }
    }
}