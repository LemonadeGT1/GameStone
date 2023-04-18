<template>
            <form @submit.prevent="searchGroups()">
        <input type="text" v-model="search.query" class="col-md-2 rounded-pill border-dark" id="Search" placeholder="Search Groups">
        <button class="btn btn-border" type="submit"><i class="mdi mdi-magnify"></i></button>
    </form>
</template>


<script>
import { AppState } from '../AppState';
import { computed, reactive, onMounted } from 'vue';
import { logger } from '../utils/Logger.js';
import Pop from '../utils/Pop.js';
import { groupsService } from '../services/GroupsService.js';
export default {
    setup(){

        const search = reactive({
            query: ''
        })
    return { 
        search,

        async searchGroups() {
            try {
                const query = search.query
                logger.log('Searching Groups', query)
                await groupsService.searchGroups(query)
            } catch (error) {
                logger.log(error.message)
                Pop.error(error.message)
            }
        }
     }
    }
};
</script>


<style lang="scss" scoped>

</style>