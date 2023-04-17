import { Auth0Provider } from '@bcwdev/auth0provider'
import { accountService } from '../services/AccountService'
import BaseController from '../utils/BaseController'
import { gatheringsService } from '../services/GatheringsService.js'
import { groupMemberService } from '../services/GroupMembersService'

export class AccountController extends BaseController {
  constructor() {
    super('account')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .get('', this.getUserAccount)
      .get('/groupMembers', this.getMyGroups)
      .get('/players', this.getGatheringsPlayingIn)
      .get('/gatherings', this.getMyGatherings)
  }
  async getMyGatherings(req, res, next) {
    try {
      let accountId = req.userInfo.id
      const gatherings = await gatheringsService.getMyGatherings(accountId)
      res.send(gatherings)
    } catch (error) {
      next(error)
    }
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

  async getMyGroups(req, res, next) {
    try {
      let profileId = req.userInfo.id
      let groups = await groupMemberService.getMyGroups(profileId)
      res.send(groups)
    } catch (error) {
      next(error)
    }
  }
}
