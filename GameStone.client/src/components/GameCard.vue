<template>
    <div
        class="elevation-3 rounded bg-white cardContainer align-items-center justify-content-end d-flex flex-column my-2 h-card">
        <router-link :to="{ name: 'GameDetails', params: { gameId: game.id } }">
            <div class="my-3 text-center">
                <img class="img-fluid p-2 gameImg" :src="game.image_url" :alt="game.name">

                <div class="row w-100  d-flex flex-column justify-content-end align-items-center">
                    <div class="col-12">
                        <h5 class="text-black p-1 mb-0">{{ game.name }}</h5>
                    </div>
                    <div class="col-12 mx-1 mb-0 text-secondary d-flex flex-row">
                        <div class="col-4 p-2">
                            <i class="mdi mdi-account-group text-black" title="Number of players"></i>
                            <span class="mx-1"
                                v-text="game.min_players == game.max_players ? game.max_players : game.min_players + '-' + game.max_players"></span>
                        </div>
                        <!-- <span> | </span>  -->
                        <div class="col-4 p-2 text-center">
                            <i class="mdi mdi-clock-outline text-black" title="Play time"></i>
                            <span class="mx-1"
                                v-text="game.min_playtime == game.max_playtime ? game.max_playtime : game.min_playtime + '-' + game.max_playtime"></span>
                        </div>
                        <!-- <span> | </span> -->
                        <div class="col-4 p-2 text-end">
                            <i class="mdi mdi-account-supervisor text-black mx-1" title="Age"></i>{{ game.min_age }}+
                        </div>

                    </div>
                </div>
            </div>
        </router-link>
    </div>
</template>


<script>
import { AppState } from '../AppState';
import { computed, reactive, onMounted } from 'vue';
import { Game } from '../models/Game.js';
export default {

    props: {
        game: { type: Game, required: true }
    },

    setup() {
        return {
            games: computed(() => AppState.games)
        }
    }
};
</script>


<style lang="scss" scoped>
// .game-card {
//     height: auto;
//     width: 40vh;
// }

.gameImg {
    max-height: 33vh;
    width: 35vh;
}

.h-card {
    min-height: 46vh;
}

// @media screen and (min-width: 1450px) {
//     .h-card {
//         min-height: 46vh;
//     }
// }
// .cardContainer {
//     height: 65vh;
// }
</style>