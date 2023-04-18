import { AppState } from "../AppState.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"


class CommentsService {

  async addGroupComment(commentData) {
    const res = await api.post('api/comments', commentData)
    logger.log('addGroupComment service', res.data)
    AppState.activeGroupComments.push(res.data)
    logger.log('Service AppState.comments', AppState.activeGroupComments)
  }
}

export const commentsService = new CommentsService()