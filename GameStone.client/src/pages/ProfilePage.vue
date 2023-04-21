<template>
    <div class="container-fluid px-0">
        <section class="d-flex justify-content-start banner-size mx-0">
            <img class="hero-img mx-0 elevation-3 w-100" :src="profile?.coverImg" :alt="profile?.name">
            <img class="img-relative profile-picture img-fluid" :src="profile?.picture" :alt="profile?.name + profile?.id">
        </section>
    </div>
    <div class="container-fluid">
        <section class="row p-3">
            <div class="col-md-3">
            </div>
            <div class="col-md-8 p-3 bio-background d-flex justify-content-between align-items-end">
                <div>
                    <h3 class="pb-3">Name: {{ profile?.name }}</h3>
                    <h6>Biography:</h6>
                    <p>{{ profile?.bio }}</p>
                </div>
                <button v-if="profile?.id == account?.id" class="btn btn-info" title="Edit Profile"><i
                        class="mdi mdi-pencil text-dark" @click="gotoAccount(account?.id)"></i></button>
            </div>

        </section>
        <section class="row pt-3 mx-1">
            <div class="col-md-3 my-stuff-buttons selectable p-2" @click="getMyProfileGames()">My Games</div>
            <div class="col-md-3 my-stuff-buttons selectable p-2" @click="getProfileGatherings()">My Gatherings</div>
            <div class="col-md-3 my-stuff-buttons selectable p-2" @click="getGatheringsIOwn()">Gatherings I'm Hosting</div>
            <div class="col-md-3 my-stuff-buttons selectable p-2" @click="getProfileGroups()">My Groups</div>
        </section>
        <section class="row justify-content-center p-3 align-items-center">
            <div class="col-md-6  col-lg-4 col-xl-3" v-for="p in profileGames" :key="p.id">
                <ProfileGameCard :game="p" />
            </div>
        </section>
        <section class="row justify-content-center container-fluid">
            <div class="col-12">
                <div class="row justify-content-center">
                    <div v-for="g in gatherings" :key="g.id" class="col-lg-5 gathering-card my-3 mx-4 py-2">
                        <GatheringCard :gathering="g.gathering" />
                        <!-- //NOTE - how dis work lol, it is going inside the player object, to the gathering -->
                    </div>
                    <div class="col-5 mx-4"></div>
                </div>
            </div>
        </section>
        <section class="row justify-content-center container-fluid">
            <div class="col-12">
                <div class="row justify-content-center">
                    <div v-for="g in hostedGatherings" :key="g.id" class="col-lg-5 gathering-card my-3 mx-4 py-2">
                        <GatheringCard :gathering="g" />
                    </div>
                    <div class="col-5 mx-4"></div>
                </div>
            </div>
        </section>
        <section class="row justify-content-center">
            <div v-for="g in groups" class="col-md-9">
                <GroupCard :group="g.group" />
            </div>
        </section>
    </div>
</template>

<script>
import { computed, onMounted } from 'vue'
import { AppState } from '../AppState'
import { useRoute, useRouter } from 'vue-router'
import { gatheringsService } from '../services/GatheringsService.js'
import { gamesService } from '../services/GamesService.js'
import { groupsService } from '../services/GroupsService.js'
import { logger } from '../utils/Logger.js';
import Pop from '../utils/Pop.js';
import { profilesService } from '../services/ProfilesService.js'




export default {
    setup() {

        const route = useRoute()
        const router = useRouter()



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

        async function getProfileGames() {
            try {
                AppState.profileGames = []
                AppState.profileGatherings = []
                AppState.profileHostedGatherings = []
                AppState.profileGroups = []
                const accountId = route.params.accountId
                // logger.log("is this stupid thing working? pls be", accountId)
                await gamesService.getProfileGames(accountId)
            } catch (error) {
                logger.error(error.message)
                Pop.error(error.message)
            }
        }

        onMounted(() => {
            getProfileById()
            getProfileGames()
        })



        return {
            route,
            router,
            account: computed(() => AppState.account),
            profile: computed(() => AppState.activeProfile),
            profileGames: computed(() => AppState.profileGames),
            gatherings: computed(() => AppState.profileGatherings),
            hostedGatherings: computed(() => AppState.profileHostedGatherings),
            groups: computed(() => AppState.profileGroups),

            async resetOthers() {
                AppState.profileGames = []
                AppState.profileGatherings = []
                AppState.profileHostedGatherings = []
                AppState.profileGroups = []

            },

            async getMyProfileGames() {
                try {
                    this.resetOthers()
                    const accountId = route.params.accountId
                    // logger.log("is this stupid thing working? pls be", accountId)
                    await gamesService.getProfileGames(accountId)
                } catch (error) {
                    logger.error(error.message)
                    Pop.error(error.message)
                }
            },


            async getProfileGatherings() {
                try {
                    this.resetOthers()
                    const profileId = this.profile?.id
                    await gatheringsService.getProfileGatherings(profileId)
                } catch (error) {
                    logger.error(error.message)
                    Pop.error(error.message)
                }
            },

            async getGatheringsIOwn() {
                try {
                    this.resetOthers()
                    const profileId = this.profile?.id
                    await gatheringsService.getGatheringsIOwn(profileId)
                } catch (error) {
                    logger.error(error.message)
                    Pop.error(error.message)
                }
            },

            async getProfileGroups() {
                try {
                    this.resetOthers()
                    const profileId = this.profile?.id
                    await groupsService.getProfileGroups(profileId)
                } catch (error) {
                    logger.error(error.message)
                    Pop.error(error.message)
                }
            },

            gotoAccount(profileId) {
                logger.log(profileId)
                router.push({ name: 'Account', params: { accountId: profileId } })
            },
        }
    }
}
</script>

<style scoped>
.img-relative {
    position: relative;
    bottom: -267px;
    left: 100px;
}

@media screen and (max-width: 768px) {
    .img-relative {
        bottom: -138px;
    }
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
    /* width: 100vw; */
    border-bottom: #0e0d0d;
    border-style: solid;
    border-width: 2px;
}

.banner-size {
    height: 39vh;
    /* width: 100vw; */
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
