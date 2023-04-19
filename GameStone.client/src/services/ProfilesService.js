import { AppState } from "../AppState.js"
import { Profile } from "../models/Account.js"
import { api } from "./AxiosService"
import { logger } from '../utils/Logger.js';






class ProfilesService {

    async getProfileById(profileId) {
        const res = await api.get(`api/profiles/${profileId}`)
        AppState.activeProfile = new Profile(res.data)
        logger.log(AppState.activeProfile)
    }

}
export const profilesService = new ProfilesService()