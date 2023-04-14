import { Profile } from "./Account.js";


export class GroupMember extends Profile {
    constructor(data) {
        super(data.profile)
        this.memberId = data.id
    }
}