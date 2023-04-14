import { Profile } from "./Account.js"

export class Player {
    constructor(data) {
        this.id = data.id
        this.gatheringId = data.gatheringId
        this.isInvited = data.isInvited
        this.accepted = data.accepted
        this.accountId = data.accountId
        this.profile = new Profile(data.profile)
    }
}