<template>
    <div class="container-fluid">
        <section class="row m-3">
            <div class="col-12">
                <div class="d-flex justify-content-between">
                    <h1 class="text-secondary">Gatherings</h1>
                    <button class="btn btn-info border rounded-pill" data-bs-toggle="modal"
                        data-bs-target="#gatheringModal">Create a Gathering</button>
                </div>
            </div>
            <div class="col-12">
                <div class="row">
                    <GatheringSearchBar />
                    <div class="col-6">
                        <h5>Ideal: Location Filtering</h5>
                    </div>
                </div>
            </div>
        </section>
        <section class="row justify-content-center ">
            <div class="col-10">
                <div class="row justify-content-center">
                    <div v-for="g in gatherings" :key="g.id" class="col-md-5 gathering-card  my-3 mx-4 py-2">
                        <GatheringCard :gathering="g" />
                    </div>
                    <div class="col-5 mx-4"></div>
                </div>
            </div>

        </section>
    </div>

    <Modal id="gatheringModal">

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

export default {
    setup() {
        async function getAllGatherings() {
            try {
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
            gatherings: computed(() => AppState.gatherings)
        }
    }, components: { GatheringCard, CreateGatheringForm }
};
</script>


<style lang="scss" scoped>
.gathering-card {
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.3);
    transition: 0.3s;
    border-radius: 30px;
    background-color: #d9d9d9;
    // height: 130px;
}

// .titleText {
//     color: ;
// }
</style>