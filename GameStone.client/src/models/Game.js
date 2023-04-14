export class Game{
    constructor(data) {
        this.id = data .id
        this.name = data.name
        this.description = data.description
        this.image_url = data.image_url
        this.min_players = data.min_players
        this.max_players = data.max_players
        this.min_playtime = data.min_playtime
        this.max_playtime = data.max_playtime
        this.mechanics = data.mechanics
        this.categories = data.categories
        this.min_age = data.min_age
    }
}