import { Profile } from "./Account.js";
import { Group } from "./Group.js";


export class GroupMember extends Profile {
    constructor(data) {
        super(data.profile)
        this.memberId = data.id
        // NOTE MAKE SURE TO CLEAR DATABASE 
        if(data.group) {
        this.group = new Group(data.group)
        }
        }
    }

