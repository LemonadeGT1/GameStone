<template>
    <div class="container-fluid">
        <!-- SECTION HEADER SEARCH FILTER -->
        <section class="row">
            <div class="col-12 p-3">
                <h1 class="text-secondary">Games</h1>
            </div>
            <div class="col-12">
                <GameSearchBar />
            </div>
            <div class="col-12 p-2">
                <GameFilterBar />
            </div>
            <div class="col-12 p-2 text-center">
                <button @click="changePage(-20)" class="btn btn-info border rounded-pill">Previous Page</button>
                <button @click="changePage(20)" class="btn btn-info border rounded-pill mx-2">Next Page</button>
            </div>
        </section>
        <!-- SECTION GAME CARDS -->
        <section class="row justify-content-center p-3">
            <div class="col-md-4 col-lg-3" v-for="g in games" :key="g.id">
                <GameCard :game="g" />
            </div>
            <div class="col-md-4">
                <h1 class="text-center" v-if="!games[0]">No results</h1>
            </div>
        </section>
        <!-- SECTION BOTTOM PAGINATION BUTTONS -->
        <section class="row">
            <div class="col-12 text-center p-3">
                <button @click="changePage(-20)" class="btn btn-info border rounded-pill mb-5">Previous Page</button>
                <button @click="changePage(20)" class="btn btn-info border rounded-pill mx-2 mb-5">Next Page</button>
            </div>
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
    setup() {

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
            gameSkip: computed(() => AppState.gameSkip),

            async clearAll() {
                try {
                    await gamesService.clearAll()
                } catch (error) {
                    logger.error(error.message)
                    Pop.error(error.message)
                }
            },

            async changePage(num) {
                try {
                    await gamesService.changePage(num)
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
.siteText {
    color: #008291;
}

// .cardContainer {
//     min-height: 40vh;
// }
</style>