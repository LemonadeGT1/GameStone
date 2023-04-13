<template>
    <div class="container-fluid">
        <section class="row m-3">
            <div class="col-12">
                <div class="d-flex justify-content-between">
                    <h1>Gatherings</h1>
                    <button class="btn btn-info border rounded-pill">Create a Gathering</button>
                </div>
            </div>
            <div class="col-12">
                <div class="d-flex justify-content-between">
                    <h5>Search</h5>
                    <h5>Filter Bar</h5>
                </div>
            </div>
        </section>
        <section class="row">
            <div v-for="g in gatherings" :key="g.id" class="col-6">
                <GatheringCard :gathering="g" />
            </div>
        </section>
    </div>
</template>


<script>
import { AppState } from '../AppState';
import { computed, reactive, onMounted } from 'vue';
import Pop from '../utils/Pop';
import { gatheringsService } from '../services/GatheringsService';
import { logger } from '../utils/Logger';
import GatheringCard from '../components/GatheringCard.vue'

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
    }, components: { GatheringCard }
};
</script>


<style lang="scss" scoped></style>