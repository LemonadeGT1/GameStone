import { dbContext } from "../db/DbContext"


class CommentsService {

    async createComment(commentData) {
        let comment = await dbContext.Comments.create(commentData)
        await comment.populate("creator", "name picture")
        await comment.populate("gathering")
        return comment
    }
}

export const commentsService = new CommentsService()