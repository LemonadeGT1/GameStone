import { Profile } from "./Account"

export class Group{
    constructor(data) {
        this.id = data.id
        this.name = data.name
        this.description = data.description
        this.isPublic = data.isPublic
        this.imgUrl = data.imgUrl
        this.creatorId = data.creatorId
        this.creator = data.creator ? new Profile(data.creator) : null
    }
}