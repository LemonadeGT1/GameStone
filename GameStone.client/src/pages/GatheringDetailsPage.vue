<template>
    <section class="row justify-content-center m-5">
        <div class="col-10 d-flex">
            <div>
                <h1>{{ gathering.name }}</h1>
                <h2>{{ gathering.date }}</h2>
                <h5>{{ gathering.description }}</h5>
                <p>{{ gathering.capacity }}</p>
            </div>
            <div>
                <img class="img-fluid gathering-img" :src="gathering.coverImg" :alt="gathering.name">
            </div>
        </div>

    </section>
</template>


<script>
import { onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { logger } from '../utils/Logger.js';
import Pop from '../utils/Pop.js';
import { gatheringsService } from '../services/GatheringsService.js';
import { computed } from '@vue/reactivity';
import { AppState } from '../AppState.js';


export default {
    setup() {

        let route = useRoute()
        async function getGatheringById() {
            try {
                let gatheringId = route.params.gatheringId
                await gatheringsService.getGatheringById(gatheringId)
            } catch (error) {
                logger.error(error.message)
                Pop.error(error.message)
            }
        }

        onMounted(() => getGatheringById())

        return {

            gathering: computed(() => AppState.activeGathering)
        }
    }
};
</script>


<style lang="scss" scoped>
.gathering-img {
    height: 30vh;
    width: auto;
}
</style>