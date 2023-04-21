import { SocketHandler } from '../utils/SocketHandler'

export class TestHandler extends SocketHandler {
  /**
   * @param {import("socket.io").Server} io
   * @param {import("socket.io").Socket} socket
   */
  constructor(io, socket) {
    super(io, socket)
    this
      .on('SOCKET_TEST', this.testEvent)
      .on('c:joining:room', this.joiningRoom)
  }

  joiningRoom(payload) {
    if (!payload.gatheringName) {
      this.socket.emit("error", {error: 'error'})
      return
    }
    this.socket.join(payload.gatheringName)
    this.io.to(payload.gatheringName).emit('s:joined:room', this.user)
  }

  leavingRoom(payload) {
    if (!payload.gatheringName) {
      this.socket.emit("error", {error: "something went wrong."})
      return
    }
    this.socket.leave(payload.gatheringName)
    this.io.to(payload.gatheringName).emit("s:leaving:room", this.user)
  }
  
  async testEvent(payload) {
    this.socket.emit('IS_TESTED', payload)
  }
}
