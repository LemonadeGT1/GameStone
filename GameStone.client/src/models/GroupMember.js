import { Profile } from "./Account.js";
import { Group } from "./Group.js";


export class GroupMember extends Profile {
    constructor(data) {
        super(data.profile)
        this.memberId = data.id
        this.group = new Group(data.group)
    }
}

