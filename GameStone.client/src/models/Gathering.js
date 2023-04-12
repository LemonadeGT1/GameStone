import { Profile } from "./Account"

export class Gathering{
    constructor(data) {
        this.id = data.id
        this.creatorId = data.creatorId
        this.creator = data.creator ? new Profile(data.creator) : null
        this.name = data.name
        this.coverImg = data.coverImg
        this.location = data.location
        this.capacity = data.capacity
        this.isPublic = data.isPublic
        this.type = data.type
        this.date = data.date
    }
}