import { dbContext } from "../db/DbContext"
import { BadRequest, Forbidden } from "../utils/Errors"


class ChatsService {

    async createChat(chatData) {
        let chat = await dbContext.Chat.create(chatData)
        await chat.populate("profile", "name picture")
        return chat
    }

    // async getGatheringChats(gatheringId) {
    //     let chats = await dbContext.Chat.find({gatheringId})
    //     .populate("profile", 'name picture')
    //     return chats
    // }

    async deleteChat(chatId, userId) {
        let chat = await dbContext.Chat.findById(chatId)
        if (chat == null) {
            throw new BadRequest("There are no messages to delete.")
        }
        if (userId != chat.profileId) {
            throw new Forbidden("You are not allowed to delete this.")
        }
        await chat.remove()
        return 'Deleted Message.'
    }
}

export const chatsService = new ChatsService()