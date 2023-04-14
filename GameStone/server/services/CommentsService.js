import { dbContext } from "../db/DbContext"
import { BadRequest, Forbidden } from "../utils/Errors"
import { groupsService } from "./GroupsService"


class CommentsService {

    async createComment(commentData, groupId) {
        let comment = await dbContext.Comments.create(commentData)
        let group = dbContext.Groups.findById(groupId)
        await comment.populate("creator", "name picture")
        await group.populate("group")
        return comment
    }

    async getGroupComments(groupId) {
        let comments = await dbContext.Comments.find({groupId})
        .populate("creator")
        return comments
    }

    async deleteComment(commentId, userId) {
        let comment = await dbContext.Comments.findById(commentId)
        if (comment == null) {
            throw new BadRequest("There are no comments to delete.")
        }
        if (userId != comment.creatorId) {
            throw new Forbidden("You cannot delete this.")
        }
        const groupId = comment.groupId
        await comment.remove()
    }
}

export const commentsService = new CommentsService()