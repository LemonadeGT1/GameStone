<template>
    <div class="container-fluid">
        <!-- SECTION HEADER SEARCH FILTER -->
        <section class="row">
            <div class="col-12 p-3">
                <h1 class="text-secondary">Games</h1>
            </div>
            <div class="col-6 p-3">
                <button class="btn btn-info border rounded-pill">Search</button>
            </div>
            <div class="col-6 text-end p-3">
                <button class="btn btn-info border rounded-pill">Filter</button>
            </div>
        </section>
        <!-- SECTION GAME CARDS -->
        <section class="row justify-content-center p-3">
            <div class="col-md-4"></div>
        </section>
    </div>
</template>


<script>
import { AppState } from '../AppState';
import { computed, reactive, onMounted } from 'vue';
import { logger } from '../utils/Logger.js';
import Pop from '../utils/Pop.js';
import { gamesService } from '../services/GamesService.js';
export default {
    setup(){

        async function getGames() {
            try {
                await gamesService.getGames()
            } catch (error) {
                logger.error(error.message)
                Pop.error(error.message)
            }
        }

        onMounted(() => {
            getGames()
        })
        
    return { 

        games: computed(() => AppState.games),
    }
    }
};
</script>


<style lang="scss" scoped>
.siteText {
    color: #008291;
}
</style>