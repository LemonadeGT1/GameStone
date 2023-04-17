<template>
    <router-link :to="{ name: 'GameDetails', params: { gameId: game.id } }">
        <div class="elevation-3 rounded my-2 bg-white">
            <img class="img-fluid p-2 bg-white game-card" :src="game.image_url" :alt="game.name">
            <h5 class="text-black bg-white p-1 mb-0">{{ game.name }}</h5>
            <div class="row mx-1 mb-0 text-secondary justify-content-center">

                <div class="col-4 p-2">
                    <i class="mdi mdi-account-group text-black"></i>
                    <span class="mx-1"
                        v-text="game.min_players == game.max_players ? game.max_players : game.min_players + '-' + game.max_players"></span>
                </div>
                <!-- <span> | </span>  -->
                <div class="col-4 p-2 text-center">
                    <i class="mdi mdi-clock-outline text-black"></i>
                    <span class="mx-1"
                        v-text="game.min_playtime == game.max_playtime ? game.max_playtime : game.min_playtime + '-' + game.max_playtime"></span>
                </div>
                <!-- <span> | </span> -->
                <div class="col-4 p-2 text-end">
                    <i class="mdi mdi-account-supervisor text-black mx-1"></i>{{ game.min_age }}+
                </div>

            </div>
        </div>
    </router-link>
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
.game-card {
    height: 50vh;
    width: 50vh;
}
</style>