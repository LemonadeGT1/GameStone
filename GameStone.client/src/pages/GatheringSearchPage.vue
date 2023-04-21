<template>
    <div class="container-fluid">
        <section class="row m-3">
            <div class="col-12">
                <div class="d-flex justify-content-between">
                    <h1 class="text-secondary">Gatherings</h1>
                    <button v-if="account?.id" class="btn btn-info border rounded-pill selectable" data-bs-toggle="modal"
                        data-bs-target="#gatheringModal" @click="getProfileGames()">Create Gathering</button>
                </div>
            </div>
            <div class="col-12">
                <div class="row">
                    <GatheringSearchBar />
                    <div class="col-6">
                        <!-- <h5>Ideal: Location Filtering</h5> -->
                    </div>
                </div>
            </div>
        </section>
        <section class="row justify-content-center">
            <div class="col-12">
                <div class="row justify-content-center">
                    <div v-for="g in gatherings" :key="g.id" class=" col-11 col-lg-5 gathering-card my-3 mx-4 py-2">
                        <GatheringCard :gathering="g" />
                    </div>
                    <div class="col-5 mx-4">
                        <h1 class="text-center" v-if="!gatherings[0]">No Results</h1>
                    </div>
                </div>
            </div>
        </section>

    </div>
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
import { AppState } from '../AppState';
import { computed, reactive, onMounted } from 'vue';
import Pop from '../utils/Pop';
import { gatheringsService } from '../services/GatheringsService';
import { logger } from '../utils/Logger';
import GatheringCard from '../components/GatheringCard.vue'
import CreateGatheringForm from '../components/CreateGatheringForm.vue';
import { gamesService } from '../services/GamesService.js';

export default {
    setup() {
        async function getAllGatherings() {
            try {
                AppState.activeGathering = null
                await gatheringsService.getAllGatherings()
            } catch (error) {
                Pop.error(error.message)
                logger.error(error.message)
            }
        }
        onMounted(() => {
            getAllGatherings()
        })
        return {
            gatherings: computed(() => AppState.gatherings),
            account: computed(() => AppState.account),

            async getProfileGames() {
                try {
                    AppState.profileGames = []
                    const accountId = AppState.account.id
                    // logger.log("is this stupid thing working? pls be", accountId)
                    await gamesService.getProfileGames(accountId)
                } catch (error) {
                    logger.error(error.message)
                    Pop.error(error.message)
                }
            }
        }
    }, components: { GatheringCard, CreateGatheringForm }
};
</script>


<style lang="scss" scoped>
// .gathering-card {
//     box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.3);
//     transition: 0.3s;
//     border-radius: 30px;
//     background-color: #d9d9d9;
// }

// .title-look {
//     background-color: #060235;
// }
</style>