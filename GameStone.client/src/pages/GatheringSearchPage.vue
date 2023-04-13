<template>
    <div class="card">
        

    </div>
</template>


<script>
import { AppState } from '../AppState';
import { computed, reactive, onMounted } from 'vue';
import Pop from '../utils/Pop';
import { gatheringsService } from '../services/GatheringsService';
import { logger } from '../utils/Logger';
export default {
    setup(){
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

    }
    }
};
</script>


<style lang="scss" scoped>

</style>