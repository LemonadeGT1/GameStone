<template>
    <section class="row justify-content-center m-5">
        <div class="col-10 d-flex justify-content-between p-0 bg-secondary rounded">
            <div class="mx-5 my-2">
                <h1>{{ gathering?.name }}</h1>
                <h2>{{ gathering?.date }}</h2>
                <h5>{{ gathering?.description }}</h5>
                <p>Capacity: {{ gathering?.capacity }}</p>
            </div>
            <div>
                <img class="img-fluid gathering-img rounded-end" :src="gathering?.coverImg" :alt="gathering?.name">
            </div>
        </div>
        <div class="col-9 text-end my-4">
            <button @click="becomePlayer(gathering?.id)" class="btn btn-info border rounded-pill">Become Player</button>
        </div>
        <div class="col-11">
            <h2>Current Players</h2>

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
import { playersService } from '../services/PlayersService.js';


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

            gathering: computed(() => AppState.activeGathering),

            async becomePlayer(gatheringId) {
                try {
                    if (await Pop.confirm('Become a Player?'))
                        await playersService.becomePlayer({ gatheringId })
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
.gathering-img {
    height: 28vh;
    width: 40vh;
    object-fit: cover;
    object-position: center;
}

.bg-grey {
    background-color: #d9d9d9;
}
</style>