<template>
    <form @submit.prevent="searchGatherings()">
        <input type="text" v-model="editable.query" class="col-6" id="gatheringsSearch">
        <button type="submit"><i class="mdi mdi-magnify"></i></button>
    </form>
</template>







<script>
import { ref } from 'vue';
import { logger } from '../utils/Logger.js';
import Pop from '../utils/Pop.js';
import { gatheringsService } from '../services/GatheringsService.js';



export default {
    setup() {

        const editable = ref({})
        return {
            editable,

            async searchGatherings() {
                try {
                    const query = editable.value
                    logger.log(query)
                    await gatheringsService.searchGatherings(query)
                } catch (error) {
                    logger.log(error.message)
                    Pop.error(error.message)
                }
            }
        };
    },
};
</script>








<style></style>