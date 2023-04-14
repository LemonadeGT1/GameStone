import { dbContext } from "../db/DbContext"


class ChatsService {

    async createChat(chatData) {
        let chat = await dbContext.Chat.create(chatData)
        await chat.populate("profile", "name picture")
        return chat
    }

    async getGatheringChats(gatheringId) {
        let chats = await dbContext.Chat.find({gatheringId})
        .populate("profile")
        return chats
    }
}

export const chatsService = new ChatsService()