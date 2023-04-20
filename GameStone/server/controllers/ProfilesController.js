import { accountGamesService } from '../services/AccountGamesService.js'
import { playersService } from '../services/PlayersService.js'
import { profileService } from '../services/ProfileService.js'
import BaseController from '../utils/BaseController'

export class ProfilesController extends BaseController {
  constructor() {
    super('api/profiles')
    this.router
      .get('', this.getProfiles)
      .get('/:id', this.getProfile)
      .get('/:id/games', this.getProfileGames)
      .get('/:id/gatherings', this.getProfileGatherings)
  }
  async getProfileGatherings(req, res, next) {
    try {
      let profileId = req.params.id
      let gatherings = await playersService.getProfileGatherings(profileId)
      res.send(gatherings)
    } catch (error) {
      next(error)
    }
  }
  async getProfileGames(req, res, next) {
    try {
      let accountId = req.params.id
      let games = await accountGamesService.getAccountGames(accountId)
      res.send(games)
    } catch (error) {
      next(error)
    }
  }

  async getProfiles(req, res, next) {
    try {
      const profiles = await profileService.findProfiles(req.query.name, req.query.offset)
      res.send(profiles)
    } catch (error) {
      next(error)
    }
  }

  async getProfile(req, res, next) {
    try {
      const profile = await profileService.getProfileById(req.params.id)
      res.send(profile)
    } catch (error) {
      next(error)
    }
  }
}
