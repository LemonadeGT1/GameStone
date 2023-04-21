export class Profile {
  constructor(data) {
    this.id = data.id
    this.name = data.name
    this.picture = data.picture
    this.coverImg = data.coverImg ? data.coverImg : "https://www.colorhexa.com/008291.png"
    this.bio = data.bio ? data.bio : "(Holder)Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quos saepe voluptates dolorum unde dolores nemo, at animi explicabo corrupti eligendi sint tenetur quis nesciunt possimus ullam voluptas, facilis exercitationem enim"
    this.lightMode = data.lightMode
    // TODO add additional properties if needed
  }
}

export class Account extends Profile {
  constructor(data) {
    super(data)
    this.email = data.email
  }
}