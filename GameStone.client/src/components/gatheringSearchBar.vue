<template>
    <form @submit.prevent="searchGatherings()">
        <input type="text" v-model="search.query" class="col-5" id="Search" placeholder="Search">
        <button type="submit"><i class="mdi mdi-magnify"></i></button>
    </form>
</template>







<script>
import { reactive, ref } from 'vue';
import { logger } from '../utils/Logger.js';
import Pop from '../utils/Pop.js';
import { gatheringsService } from '../services/GatheringsService.js';



export default {
    setup() {

        // const editable = ref({})

        const search = reactive({
            query: ''
        })

        return {
            // editable,
            search,

            async searchGatherings() {
                try {
                    const query = search.query
                    // const query = { name: { $regex: editable.value } }
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