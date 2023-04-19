<template>
    <div class="container-fluid px-0">
        <h5>Profile Page</h5>
        <section class="d-flex justify-content-start banner-size">
            <img class="hero-img mx-0 elevation-3" :src="profile?.coverImg" :alt="profile?.name">
            <img class="img-relative profile-picture img-fluid" :src="profile?.picture" :alt="profile?.name + profile?.id">
        </section>
    </div>
    <div class="container-fluid test-trans">
        <section class="row p-3">
            <div class="col-md-3">
            </div>
            <div class="col-md-8 p-3 bio-background">
                <h3 class="pb-3">Name: {{ profile?.name }}</h3>
                <h6>Biography:</h6>
                <p>{{ profile?.bio }}</p>
            </div>
        </section>
        <section class="row pt-3">
            <div class="col-md-3 my-stuff-buttons selectable p-2" @click="getProfileGames()">My Games</div>
            <div class="col-md-3 my-stuff-buttons selectable p-2" @click="getProfileGatherings()">My Gatherings</div>
            <div class="col-md-3 my-stuff-buttons selectable p-2" @click="getGatheringsIOwn()">Gatherings I'm Hosting</div>
            <div class="col-md-3 my-stuff-buttons selectable p-2" @click="getProfileGroups()">My Groups</div>
        </section>
    </div>
</template>

<script>
import { computed, onMounted } from 'vue'
import { AppState } from '../AppState'
import { useRoute } from 'vue-router'
import { gatheringsService } from '../services/GatheringsService.js'
import { gamesService } from '../services/GamesService.js'
import { groupsService } from '../services/GroupsService.js'
import { logger } from '../utils/Logger.js';
import Pop from '../utils/Pop.js';
import { profilesService } from '../services/ProfilesService.js'




export default {
    setup() {

        const route = useRoute()

        async function getProfileById() {
            try {
                const profileId = route.params.accountId
                logger.log("[logging profile Id]", profileId)
                await profilesService.getProfileById(profileId)
            } catch (error) {
                logger.log(error.message)
                Pop.error(error.message)
            }
        }

        onMounted(() => {
            getProfileById()
        })



        return {
            account: computed(() => AppState.account),
            profile: computed(() => AppState.activeProfile),


            async getProfileGames() {
                try {
                    const accountId = this.profile.id
                    // logger.log("is this stupid thing working? pls be", accountId)
                    await gamesService.getProfileGames(accountId)
                } catch (error) {
                    logger.error(error.message)
                    Pop.error(error.message)
                }
            },

            async getProfileGatherings() {
                try {
                    const profileId = this.account.id
                    await gatheringsService.getProfileGatherings(profileId)
                } catch (error) {
                    logger.error(error.message)
                    Pop.error(error.message)
                }
            },

            async getGatheringsIOwn() {
                try {
                    const profileId = this.account.id
                    await gatheringsService.getGatheringsIOwn(profileId)
                } catch (error) {
                    logger.error(error.message)
                    Pop.error(error.message)
                }
            },

            async getProfileGroups() {
                try {
                    const profileId = this.account.id
                    await groupsService.getProfileGroups(profileId)
                } catch (error) {
                    logger.error(error.message)
                    Pop.error(error.message)
                }
            },
        }
    }
}
</script>

<style scoped>
/* img {
    max-width: 100px;
  } */

.img-relative {
    position: relative;
    bottom: -267px;
    left: 100px;
}

.profile-picture {
    height: 200px;
    width: 200px;
    border-radius: 50%;
    border-style: solid;
    border-color: #0e0d0d;
    border-width: 2px;
}



.hero-img {
    position: absolute;
    object-fit: cover;
    object-position: center;
    height: 39vh;
    width: 100vw;
    border-bottom: #0e0d0d;
    border-style: solid;
    border-width: 2px;
}

.banner-size {
    height: 39vh;
    width: 100vw;
}

.my-stuff-buttons {
    border-style: solid;
    border-width: 2px;
    border-color: #0e0d0d;
    text-align: center;
}

.my-stuff-buttons:hover {
    text-decoration: underline;
}

.bio-background {
    background: rgba(0, 131, 145, 0.419);
    border-radius: 16px;
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(0px);
    -webkit-backdrop-filter: blur(0px);
    border: 1px solid rgba(255, 251, 251, 0.548);


}
</style>
  