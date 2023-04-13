import { Auth0Provider } from '@bcwdev/auth0provider'
import { accountService } from '../services/AccountService'
import BaseController from '../utils/BaseController'
import { gatheringsService } from '../services/GatheringsService.js'

export class AccountController extends BaseController {
  constructor() {
    super('account')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .get('/players', this.getUserAccount)
  }

  async getUserAccount(req, res, next) {
    try {
      const account = await accountService.getAccount(req.userInfo)
      res.send(account)
    } catch (error) {
      next(error)
    }
  }

  async getGatheringsPlayingIn(req, res, next) {
    try {
      let accountId = req.userInfo.id
      let gatherings = await gatheringsService.getGatheringsPlayingIn(accountId)
      res.send(gatherings)
    } catch (error) {
      next(error)
    }
  }
}
