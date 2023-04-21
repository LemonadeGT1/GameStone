<template>
    <form @submit.prevent="searchGatherings()">
        <input type="text" v-model="search.query" class="col-3 rounded-pill border-dark px-3" id="Search"
            placeholder="  Search">
        <button v-if="account.lightMode" class="btn btn-border selectable" type="submit" title="search"><i
                class="mdi mdi-magnify"></i></button>
        <button v-else class="btn btn-border selectable text-white" type="submit" title="search"><i
                class="mdi mdi-magnify"></i></button>

    </form>
</template>







<script>
import { reactive, ref } from 'vue';
import { logger } from '../utils/Logger.js';
import Pop from '../utils/Pop.js';
import { gatheringsService } from '../services/GatheringsService.js';
import { computed } from '@vue/reactivity';
import { AppState } from '../AppState.js';



export default {
    setup() {

        // const editable = ref({})

        const search = reactive({
            query: ''
        })

        return {
            // editable,
            search,
            account: computed(() => AppState.account),

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
