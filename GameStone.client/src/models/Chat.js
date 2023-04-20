import { Profile } from "./Account"

export class Chat{
    constructor(data) {
        this.id = data.id
        this.profileId = data.profileId
        this.creator = data.creator ? new Profile(data.creator) : null
        this.gatheringId = data.gatheringId
        this.body = data.body
        this.isAttending = data.isAttending
    }
}