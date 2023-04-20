import { Auth0Provider } from "@bcwdev/auth0provider";
import BaseController from "../utils/BaseController";
import { socketProvider } from "../SocketProvider"
import { chatsService } from "../services/ChatsService";


export class ChatController extends BaseController {
    constructor() {
        super('api/chats')
        this.router
        .use(Auth0Provider.getAuthorizedUserInfo)
        .post('', this.createChat)
        .delete('/:id', this.deleteChat)
    }

    async createChat(req, res, next) {
        try {
            let chatData = req.body
            chatData.profileId = req.userInfo.id
            let chat = await chatsService.createChat(chatData)
            socketProvider.messageRoom(chat.gatheringId.toString(), "s:created:chat", chat)
            res.send(chat)
        } catch (error) {
            next(error)
        }
    }

    async deleteChat(req, res, next) {
        try {
            let chatId = req.params.id
            let userId = req.userInfo.id
            let chat = await chatsService.deleteChat(chatId, userId)
            return res.send(chat)
        } catch (error) {
            next(error)
        }
    }
}