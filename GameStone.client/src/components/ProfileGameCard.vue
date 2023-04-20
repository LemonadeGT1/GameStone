<template>
    <router-link :to="{ name: 'GameDetails', params: { gameId: game.gameId } }">
        <div class="elevation-3 rounded my-2 bg-white">
            <img class="img-fluid p-2 bg-white game-card" :src="game.gameImg" :alt="game.gameName">
            <h5 class="text-black bg-white p-1 mb-0">{{ game.gameName }}</h5>
        </div>
    </router-link>
</template>


<script>
import { AppState } from '../AppState';
import { computed, reactive, onMounted } from 'vue';
import { AccountGame } from '../models/AccountGame.js';
export default {

    props: {
        game: { type: AccountGame, required: true }
    },

    setup() {
        return {
            games: computed(() => AppState.profileGames)
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