import { Profile } from "./Account.js"
import { Gathering } from "./Gathering.js"

export class Player {
    constructor(data) {
        this.id = data.id
        this.gatheringId = data.gatheringId
        this.isInvited = data.isInvited
        this.accepted = data.accepted
        this.accountId = data.profileId
        this.profile = new Profile(data.profile)
        this.gathering = new Gathering(data.gathering)
    }
}