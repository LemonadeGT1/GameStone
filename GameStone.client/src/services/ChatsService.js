import { AppState } from "../AppState"
import { Chat } from "../models/Chat"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"


class ChatsService {

    async createChat(chatData) {
        const res = await api.post("api/chats", chatData)
        const newChat = new Chat(res.data)
        AppState.chats.push(newChat)
        logger.log(res.data)
        return newChat
    }
}

export const chatsService = new ChatsService()