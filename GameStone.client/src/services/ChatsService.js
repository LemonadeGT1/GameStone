import { Chat } from "../models/Chat"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"


class ChatsService {

    async createChat(chatData) {
        const res = await api.post("api/chats", chatData)
        logger.log(new Chat(res.data))
    }
}

export const chatsService = new ChatsService()