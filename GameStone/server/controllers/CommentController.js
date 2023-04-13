import { Auth0Provider } from "@bcwdev/auth0provider";
import { commentsService } from "../services/CommentsService";
import BaseController from "../utils/BaseController";


export class CommentController extends BaseController {
    constructor() {
        super('api/comments')
        this.router
        .use(Auth0Provider.getAuthorizedUserInfo)
        .post("", this.createComment)
    }

    async createComment(req, res, next) {
        try {
            let commentData = req.body
            commentData.creatorId = req.userInfo.id
            let comment = await commentsService.createComment(commentData)
            return res.send(comment)
        } catch (error) {
            next(error)
        }
    }
}