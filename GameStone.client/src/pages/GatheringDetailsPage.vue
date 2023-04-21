<template>
    <section class="row justify-content-center m-5">
        <div class="col-md-10 p-0 bg-secondary rounded">
            <section class="row">
                <div class="col-md-8 py-3 px-5">
                    <div>
                        <h1>{{ gathering?.name }}</h1>
                        <h1 v-if="gathering?.isCanceled" class="cancel-color">Cancelled</h1>
                        <h2>Host: {{ gathering?.creator.name }}</h2>
                        <h4>{{ gathering?.date }}</h4>
                        <h4>{{ gathering?.time }}</h4>
                        <h5>{{ gathering?.description }}</h5>
                        <p>Capacity: {{ gathering?.capacity }}</p>
                    </div>
                    <div class="row">
                        <div class="col-md-8 gatheringGamesSpot rounded p-2 d-flex align-items-center flex-wrap">
                            <h4 class="pe-2">Games:</h4>
                            <img :title="g?.gameName" class="gatheringGameCard selectable" v-for="g in gathering?.games"
                                :key="g?.id" :src="g?.gameImg" :alt="g?.gameName" @click="goToGameDetails(g?.gameId)">
                        </div>
                    </div>
                </div>
                <div class="col-md-4 text-end">
                    <img class="gathering-img rounded-end" :src="gathering?.coverImg" :alt="gathering?.name">
                </div>
            </section>


        </div>
        <div class="col-9 text-end my-4">
            <button v-if="!gathering?.isCanceled && !isPlayer && account.id" @click="becomePlayer(gathering?.id)"
                class="btn btn-info border rounded-pill selectable">Become Player</button>
            <button v-if="!gathering?.isCanceled && isPlayer && account.id" @click="quit(player?.id)"
                class="btn btn-danger rounded-pill">Quit</button>
        </div>
        <div class="col-11 card bg-secondary">
            <div>
                <h2>Current Players</h2>
                <div class="d-flex flex-wrap">
                    <img v-if="!gathering?.isCanceled" v-for="p in players" class="m-2 profile-img" :title="p.profile.name"
                        :src="p.profile.picture" :alt="p.profile.name">
                </div>
            </div>
            <div class="text-end">
                <div class="m-3">
                    <button v-if="!gathering?.isCanceled && account?.id == gathering?.creatorId"
                        class="btn btn-info border rounded-pill selectable" data-bs-toggle="modal"
                        data-bs-target="#gatheringModal">Edit
                        Gathering</button>
                </div>
                <div class="m-2">
                    <button v-if="!gathering?.isCanceled && account?.id == gathering?.creatorId"
                        @click="deleteGathering(gathering?.id)" class="btn btn-danger rounded-pill">Cancel
                        Gathering</button>
                </div>
            </div>
        </div>
    </section>
    <div class="row m-2">
        <textarea @keydown.enter.prevent="createChat(chatData)" class="rounded col-4 align-items-center py-2"
            placeholder="Write a message..." v-model="editable.body" name="description" cols="5" rows="3"></textarea>
    </div>

    <section class="row m-3">
        <div class="col-4 mt-3 rounded-pill bg-secondary d-flex align-items-center" v-for="c in chats" :key="c?.id">

            <div class="col-1 me-3">
                <img :src="c.profile?.picture" :alt="c.profile?.name" class="profilePicture">
            </div>
            <div class="col-4">
                <p>{{ c.body }}</p>
            </div>
        </div>
    </section>
    <Modal id="gatheringModal">

        <template #header>
            <h5>Create Gathering!</h5>
        </template>

        <template #modalBody>
            <CreateGatheringForm />
        </template>

    </Modal>
</template>


<script>
import { onMounted, ref, watchEffect } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { logger } from '../utils/Logger.js';
import Pop from '../utils/Pop.js';
import { gatheringsService } from '../services/GatheringsService.js';
import { chatsService } from '../services/ChatsService'
import { computed } from '@vue/reactivity';
import { AppState } from '../AppState.js';
import { playersService } from '../services/PlayersService.js';
import { socketService } from '../services/SocketService';


export default {
    setup() {
        const router = useRouter()
        const editable = ref({})
        const route = useRoute()


        watchEffect(() => {
            route.params.id
            joiningRoom()
            getChats()
        })

        router.beforeEach((to, from) => {
            if (from.name == "Gathering") {
                leaveRoom(from.params.id)
            }
        })

        function leaveRoom(id) {
            try {
                let payload = { gatheringName: id }
                socketService.emit("c:leaving:room", payload)
            } catch (error) {
                Pop.error('[error]', error.message)
            }
        }

        function joiningRoom() {
            try {
                let payload = { gatheringName: route.params.gatheringId }
                socketService.emit("c:joining:room", payload)
            } catch (error) {
                Pop.error(error.message)
            }
        }
        async function getGatheringById() {
            try {
                let gatheringId = route.params.gatheringId
                await gatheringsService.getGatheringById(gatheringId)
            } catch (error) {
                logger.error(error.message)
                Pop.error(error.message)
            }
        }


        async function getGatheringPlayers() {
            try {
                let gatheringId = route.params.gatheringId
                await playersService.getGatheringPlayers(gatheringId)
            } catch (error) {
                logger.error(error.message)
                Pop.error(error.message)
            }
        }

        async function getChats() {
            try {
                let gatheringId = route.params.gatheringId
                await gatheringsService.getChats(gatheringId)
            } catch (error) {
                Pop.error(error.message)
            }
        }

        onMounted(() => {
            getGatheringById()
            getGatheringPlayers()
            // getChats()
        })

        return {
            router,
            editable,
            chats: computed(() => AppState.chats),
            gathering: computed(() => AppState.activeGathering),
            players: computed(() => AppState.players),
            player: computed(() => AppState.players.find(p => p.accountId == AppState.account.id)),
            isPlayer: computed(() => AppState.players.find(p => p.accountId == AppState.account.id)),
            account: computed(() => AppState.account),
            // gatheringGames: computed(() => AppState.activeGathering.games),

            async createChat() {
                try {
                    let chatData = editable.value
                    chatData.gatheringId = route.params.gatheringId
                    await chatsService.createChat(chatData)
                } catch (error) {
                    Pop.error(('[error]'), error.message)
                }
            },

            async becomePlayer(gatheringId) {
                try {
                    if (await Pop.confirm('Become a Player?', ''))
                        await playersService.becomePlayer({ gatheringId })
                    this.gathering.capacity--
                } catch (error) {
                    logger.error(error.message)
                    Pop.error(error.message)
                }
            },
            async deleteGathering(gatheringId) {
                try {
                    if (await Pop.confirm('Are you sure you want to archive this gathering'))
                        await gatheringsService.deleteGathering(gatheringId)
                } catch (error) {
                    logger.error(error.message)
                    Pop.error(error.message)
                }
            },

            async quit(playerId) {
                try {
                    if (await Pop.confirm("Are you sure you want to quit", ''))
                        await playersService.quit(playerId)
                } catch (error) {
                    logger.error(error.message)
                    Pop.error(error.message)
                }
            },

            async goToGameDetails(gameId) {
                try {
                    logger.log(gameId)
                    router.push({ name: 'GameDetails', params: { gameId: gameId } })
                } catch (error) {
                    logger.error(error.message)
                    Pop.error(error.message)
                }
            }
        }
    }
};
</script>


<style lang="scss" scoped>
.profilePicture {
    height: 50px;
    width: 50px;
    aspect-ratio: 1/1;
    border-radius: 50%;
}

.gathering-img {
    height: 40vh;
    width: 100%;
    object-fit: cover;
    object-position: center;
}

.profile-img {
    height: 8vh;
    width: 8vh;
    border-radius: 50%;
}

.cancel-color {
    color: red;
}

.bg-grey {
    background-color: #d9d9d9;
}

.gatheringGameCard {
    height: 60px;
    width: 60px;
    border-radius: 50%;
    padding-left: 4px;
    padding-right: 4px;
}

.gatheringGamesSpot {
    border-style: double;
    border-color: #d9d9d9;
    border-width: 4px;
    // border-radius: 0.375rem;
}
</style>