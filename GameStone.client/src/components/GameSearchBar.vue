<template>
        <form @submit.prevent="searchGames()">
        <input type="text" v-model="search.query" class="col-5" id="Search" placeholder="Search">
        <button type="submit"><i class="mdi mdi-magnify"></i></button>
    </form>
</template>


<script>
import { AppState } from '../AppState';
import { computed, reactive, onMounted } from 'vue';
import { logger } from '../utils/Logger.js';
import { gamesService } from '../services/GamesService.js';
import Pop from '../utils/Pop.js';
export default {
    setup(){

        const search = reactive({
            query: ''
        })

    return { 
        search,

        async searchGames() {
            try {
                const query = search.query
            logger.log(query)
            await gamesService.searchGames(query)
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