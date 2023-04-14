import { Auth0Provider } from "@bcwdev/auth0provider";
import BaseController from "../utils/BaseController";
import { groupMemberService } from "../services/GroupMembersService";


export class GroupMemberController extends BaseController {
    constructor() {
        super('api/groupMembers')
        this.router
        .use(Auth0Provider.getAuthorizedUserInfo)
        .post('', this.createMember)
    }

    async createMember(req, res, next) {
        try {
            let memberData = req.body
            memberData.profileId = req.userInfo.id
            let member = await groupMemberService.createMember(memberData)
            res.send(member)
        } catch (error) {
            next(error)
        }
    }
}