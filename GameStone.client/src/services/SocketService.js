import { AppState } from '../AppState'
import { Chat } from '../models/Chat'
import { Gathering } from '../models/Gathering'
import Pop from '../utils/Pop'
import { SocketHandler } from '../utils/SocketHandler'

class SocketService extends SocketHandler {
  constructor() {
    super()
    this
      .on('error', this.onError)
      .on("s:created:gathering", this.createdGathering)
      .on("s:created:chat", this.createdChat)
  }

  onError(e) {
    Pop.toast(e.message, 'error')
  }

  createdGathering(payload) {
    let newGathering = new Gathering(payload)
    if (!payload) {
      throw new Error("Something went wrong.")
    } else {
      if (AppState.account.id != newGathering.profileId) {
        Pop.toast(`${newGathering.name} has been created, join now!`)
      }
    }
    AppState.gatherings.push(newGathering)
  }

  createdChat(payload) {
    const chat = new Chat(payload)
    AppState.chats.push(chat)
  }
}

export const socketService = new SocketService()
