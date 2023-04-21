import { Profile } from "./Account"

export class Chat{
    constructor(data) {
        this.id = data.id
        this.profileId = data.profileId
        this.profile = data.profile ? new Profile(data.profile) : null
        this.gatheringId = data.gatheringId
        this.body = data.body
        this.isAttending = data.isAttending
    }
}