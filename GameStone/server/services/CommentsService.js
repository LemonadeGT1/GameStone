import { dbContext } from "../db/DbContext"


class CommentsService {

    async createComment(commentData) {
        let comment = await dbContext.Comments.create(commentData)
        await comment.populate("creator", "name picture")
        return comment
    }
}

export const commentsService = new CommentsService()