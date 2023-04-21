<template>
    <form @submit.prevent="searchGames()">
        <input type="text" v-model="search.query" class="col-md-2 rounded-pill border-dark ps-3" id="Search"
            placeholder="  Search">
        <button class="btn btn-border selectable mx-2" type="submit" title="search"><i class="mdi mdi-magnify"></i></button>
    </form>
</template>


<script>
import { AppState } from '../AppState';
import { computed, reactive, onMounted } from 'vue';
import { logger } from '../utils/Logger.js';
import { gamesService } from '../services/GamesService.js';
import Pop from '../utils/Pop.js';
export default {
    setup() {

        const search = reactive({
            query: ''
        })

        return {
            search,

            async searchGames() {
                try {
                    const query = search.query
                    logger.log(query)
                    Pop.toast('Searching Games!', 'success', 'top', 10000)
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


<style lang="scss" scoped></style>