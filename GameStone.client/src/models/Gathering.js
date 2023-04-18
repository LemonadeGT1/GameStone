import { Profile } from "./Account"

export class Gathering {
    constructor(data) {
        this.id = data.id
        this.creatorId = data.creatorId
        this.description = data.description
        this.creator = data.creator ? new Profile(data.creator) : null
        this.name = data.name
        this.coverImg = data.coverImg ? data.coverImg : "https://www.cnet.com/a/img/resize/65ab2950e621e974d8e56bb8ee6381c985243042/hub/2021/02/24/1f043419-b826-4360-8abb-3afef86ead90/bravely-default-2-1.jpg?auto=webp&fit=crop&height=675&width=1200"
        this.location = data.location
        this.capacity = data.capacity
        this.isPublic = data.isPublic
        this.isCanceled = data.isCanceled
        this.type = data.type
        this.date = new Date(data.date).toLocaleDateString()
        this.time = new Date(data.date).toLocaleTimeString()
    }
}