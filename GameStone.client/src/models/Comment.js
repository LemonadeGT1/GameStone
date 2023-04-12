import { Profile } from "./Account"

export class Comment{
    constructor(data) {
        this.id = data.id
        this.creatorId = data.creatorId
        this.creator = data.creator ? new Profile(data.creator) : null
        this.gatheringId = data.gatheringId
        this.body = data.body
        this.profile = new Profile(data.profile)
    }
}